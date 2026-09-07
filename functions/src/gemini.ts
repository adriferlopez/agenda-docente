import { getFirestore } from 'firebase-admin/firestore';
import { HttpsError } from 'firebase-functions/v2/https';
import { GoogleGenAI, ApiError, type GenerateContentConfig } from '@google/genai';
import { decryptApiKey } from './crypto.js';

// gemini-2.5-flash dejó de estar disponible para claves de API nuevas
// (Google lo retiró de "nuevos usuarios" antes de su fecha de apagado
// oficial). gemini-3.6-flash es el modelo GA recomendado y sigue siendo
// gratuito en el nivel gratuito (free tier) de la API.
const GEMINI_MODEL = 'gemini-3.6-flash';

// Límites de defensa en profundidad: ninguna función de la app debería
// necesitar prompts ni PDFs tan grandes en uso normal. Sin este límite, un
// cliente autenticado (con sus propias credenciales, no hace falta vulnerar
// nada) podría mandar payloads enormes en cada llamada y disparar el coste
// o el tiempo de cómputo de Gemini, o agotar la memoria de la función.
const MAX_PROMPT_CHARS = 60_000; // ~15k tokens, generoso para cualquier uso legítimo
const MAX_PDF_BASE64_CHARS = 20 * 1024 * 1024; // ~15 MB de PDF decodificado

/**
 * Recupera y descifra la clave de Gemini del usuario autenticado.
 * Lanza un error 'failed-precondition' si el usuario no ha configurado
 * ninguna clave en Ajustes.
 *
 * Nota: usamos el SDK unificado `@google/genai` (el antiguo
 * `@google/generative-ai` dejó de recibir soporte el 31/08/2025 y sus
 * llamadas ya no funcionan de forma fiable contra la API actual).
 */
export async function getUserGeminiClient(uid: string): Promise<GoogleGenAI> {
  const db = getFirestore();
  const snap = await db.collection('users').doc(uid).get();
  const data = snap.data();
  const encryptedKey: string | undefined = data?.geminiApiKeyEncrypted;

  if (!encryptedKey) {
    throw new HttpsError(
      'failed-precondition',
      'No has configurado tu clave de la API de Gemini en Ajustes.'
    );
  }

  let apiKey: string;
  try {
    apiKey = decryptApiKey(encryptedKey);
  } catch {
    throw new HttpsError('internal', 'No se ha podido descifrar la clave de Gemini.');
  }

  return new GoogleGenAI({ apiKey });
}

/**
 * Detecta los errores transitorios de sobrecarga de la API de Gemini (503
 * "the model is overloaded" / 429 de cuota puntual), que son habituales en
 * los modelos gratuitos en horas de mucho uso y casi siempre desaparecen
 * reintentando a los pocos segundos — a diferencia de un error real de
 * configuración (clave inválida, prompt demasiado largo, etc.).
 */
function isOverloadedError(err: unknown): boolean {
  if (err instanceof ApiError) {
    return err.status === 503 || err.status === 429;
  }
  const msg = err instanceof Error ? err.message.toLowerCase() : '';
  return /overloaded|unavailable|resource_exhausted|alta demanda|high demand|\b429\b|\b503\b/.test(msg);
}

/** Reintenta una llamada a Gemini un par de veces (con espera creciente) si el error es de sobrecarga transitoria; cualquier otro error se propaga de inmediato. */
async function withOverloadRetry<T>(fn: () => Promise<T>): Promise<T> {
  const delaysMs = [1000, 3000];
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= delaysMs.length || !isOverloadedError(err)) throw err;
      await new Promise((resolve) => setTimeout(resolve, delaysMs[attempt]));
    }
  }
}

/** Mensaje amigable (evita reenviar al docente el texto crudo en inglés de la API) cuando la sobrecarga persiste tras los reintentos. */
const OVERLOAD_MESSAGE =
  'El modelo de IA está saturado ahora mismo por mucha demanda. Espera unos segundos y vuelve a intentarlo.';

/**
 * `config` es opcional y no cambia el comportamiento por defecto de ninguna
 * llamada existente: se usa solo cuando el llamante quiere acotar
 * explícitamente el "thinking" o la longitud de salida (p.ej. el chat
 * conversacional de Profi, donde no hace falta razonamiento profundo y la
 * latencia importa más que en generaciones puntuales como rúbricas o
 * exámenes).
 */
export async function generateText(uid: string, prompt: string, config?: GenerateContentConfig): Promise<string> {
  if (prompt.length > MAX_PROMPT_CHARS) {
    throw new HttpsError('invalid-argument', 'El texto es demasiado largo para procesarlo.');
  }
  const ai = await getUserGeminiClient(uid);

  try {
    const response = await withOverloadRetry(() =>
      ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        ...(config ? { config } : {}),
      })
    );
    return (response.text ?? '').trim();
  } catch (err) {
    if (isOverloadedError(err)) throw new HttpsError('unavailable', OVERLOAD_MESSAGE);
    const message = err instanceof Error ? err.message : 'Error desconocido';
    throw new HttpsError('internal', `Error al llamar a la API de Gemini: ${message}`);
  }
}

/**
 * Igual que generateText, pero adjunta un PDF como parte del contenido
 * (Gemini 2.5 Flash acepta PDFs directamente como entrada multimodal, sin
 * necesidad de extraer el texto nosotros mismos primero — así también
 * "ve" tablas, esquemas o imágenes del documento).
 */
export async function generateTextWithPdf(uid: string, prompt: string, pdfBase64: string): Promise<string> {
  if (prompt.length > MAX_PROMPT_CHARS) {
    throw new HttpsError('invalid-argument', 'El texto es demasiado largo para procesarlo.');
  }
  if (pdfBase64.length > MAX_PDF_BASE64_CHARS) {
    throw new HttpsError('invalid-argument', 'El PDF es demasiado grande (máximo ~15 MB).');
  }
  const ai = await getUserGeminiClient(uid);

  try {
    const response = await withOverloadRetry(() =>
      ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: [
          { text: prompt },
          { inlineData: { mimeType: 'application/pdf', data: pdfBase64 } },
        ],
      })
    );
    return (response.text ?? '').trim();
  } catch (err) {
    if (isOverloadedError(err)) throw new HttpsError('unavailable', OVERLOAD_MESSAGE);
    const message = err instanceof Error ? err.message : 'Error desconocido';
    throw new HttpsError('internal', `Error al llamar a la API de Gemini: ${message}`);
  }
}

const LANGUAGE_NAMES: Record<string, string> = {
  es: 'español',
  ca: 'catalán',
  en: 'inglés',
  eu: 'euskera',
  gl: 'gallego',
};

export function languageName(code: string): string {
  return LANGUAGE_NAMES[code] ?? 'español';
}

/** Formatea "Asignatura (Curso)" o solo "Asignatura" si no hay curso definido. */
export function subjectLabel(name: string, courseLevel?: string): string {
  return courseLevel ? `${name} (${courseLevel})` : name;
}
