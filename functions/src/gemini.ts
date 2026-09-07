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
 * Distingue dos causas de error MUY distintas que la API de Gemini devuelve
 * ambas como 429, y que antes se trataban como si fueran la misma cosa
 * ("el modelo está saturado"):
 *  - 'overloaded' (503, o 429 con motivo genérico de disponibilidad): el
 *    modelo está sobrecargado para todo el mundo en ese momento. Reintentar
 *    a los pocos segundos casi siempre funciona.
 *  - 'quota': la CLAVE PROPIA del docente (la que configuró en Ajustes) ha
 *    agotado su cuota gratuita de la API (límite por minuto o por día del
 *    nivel gratuito de Gemini). Esto es independiente de usar Gemini desde
 *    su web/app de chat (esa es una cuota de producto totalmente distinta),
 *    y reintentar en el momento no sirve de nada si es el límite diario.
 * Cualquier otro error (clave inválida, prompt demasiado largo, etc.) no
 * entra en ninguna de las dos categorías y se propaga tal cual.
 */
function classifyTransientError(err: unknown): 'overloaded' | 'quota' | null {
  const status = err instanceof ApiError ? err.status : undefined;
  const msg = err instanceof Error ? err.message.toLowerCase() : '';
  if (status === 429 || /resource_exhausted|quota|rate limit/.test(msg)) return 'quota';
  if (status === 503 || /overloaded|unavailable|alta demanda|high demand|\b503\b/.test(msg)) return 'overloaded';
  return null;
}

/** Reintenta una llamada a Gemini un par de veces (con espera creciente) si el error es transitorio (sobrecarga o cuota); cualquier otro error se propaga de inmediato. */
async function withOverloadRetry<T>(fn: () => Promise<T>): Promise<T> {
  const delaysMs = [1000, 3000];
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= delaysMs.length || !classifyTransientError(err)) throw err;
      await new Promise((resolve) => setTimeout(resolve, delaysMs[attempt]));
    }
  }
}

/** Mensajes amigables (evitan reenviar al docente el texto crudo en inglés de la API) cuando el error transitorio persiste tras los reintentos. */
const OVERLOAD_MESSAGE =
  'El modelo de IA está saturado ahora mismo por mucha demanda. Espera unos segundos y vuelve a intentarlo.';
const QUOTA_MESSAGE =
  'Tu clave de la API de Gemini ha alcanzado su límite de uso gratuito (por minuto o por día). Esto es independiente de usar Gemini desde su web o app normal, que tiene una cuota distinta. Espera unos minutos (o hasta mañana si es el límite diario) y vuelve a intentarlo, o revisa tu cuota en https://aistudio.google.com/apikey.';

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
    const kind = classifyTransientError(err);
    if (kind === 'quota') throw new HttpsError('resource-exhausted', QUOTA_MESSAGE);
    if (kind === 'overloaded') throw new HttpsError('unavailable', OVERLOAD_MESSAGE);
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
    const kind = classifyTransientError(err);
    if (kind === 'quota') throw new HttpsError('resource-exhausted', QUOTA_MESSAGE);
    if (kind === 'overloaded') throw new HttpsError('unavailable', OVERLOAD_MESSAGE);
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
