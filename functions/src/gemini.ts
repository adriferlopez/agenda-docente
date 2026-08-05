import { getFirestore } from 'firebase-admin/firestore';
import { HttpsError } from 'firebase-functions/v2/https';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { decryptApiKey } from './crypto.js';

const GEMINI_MODEL = 'gemini-2.0-flash';

/**
 * Recupera y descifra la clave de Gemini del usuario autenticado.
 * Lanza un error 'failed-precondition' si el usuario no ha configurado
 * ninguna clave en Ajustes.
 */
export async function getUserGeminiClient(uid: string): Promise<GoogleGenerativeAI> {
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

  return new GoogleGenerativeAI(apiKey);
}

export async function generateText(uid: string, prompt: string): Promise<string> {
  const client = await getUserGeminiClient(uid);
  const model = client.getGenerativeModel({ model: GEMINI_MODEL });

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (err) {
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
