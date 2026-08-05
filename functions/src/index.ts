import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { encryptApiKey } from './crypto.js';
import { generateText, languageName, subjectLabel } from './gemini.js';

initializeApp();

const REGION = 'europe-west1';

// Secreto de Cloud Functions: clave maestra para cifrar/descifrar las claves
// de Gemini de cada usuario. Se configura una vez con:
//   firebase functions:secrets:set GEMINI_ENCRYPTION_KEY
const geminiEncryptionKey = defineSecret('GEMINI_ENCRYPTION_KEY');

function requireAuth(uid: string | undefined): string {
  if (!uid) {
    throw new HttpsError('unauthenticated', 'Debes iniciar sesión.');
  }
  return uid;
}

// ---------------------------------------------------------------------
// Gestión de la clave de Gemini del usuario
// ---------------------------------------------------------------------

export const saveGeminiApiKey = onCall(
  { region: REGION, secrets: [geminiEncryptionKey] },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const apiKey = String(request.data?.apiKey ?? '').trim();

    if (!apiKey) {
      throw new HttpsError('invalid-argument', 'La clave de la API no puede estar vacía.');
    }

    const encrypted = encryptApiKey(apiKey);
    const db = getFirestore();
    await db.collection('users').doc(uid).set(
      {
        geminiApiKeyEncrypted: encrypted,
        hasGeminiKey: true,
      },
      { merge: true }
    );

    return { ok: true };
  }
);

export const removeGeminiApiKey = onCall({ region: REGION }, async (request) => {
  const uid = requireAuth(request.auth?.uid);
  const db = getFirestore();
  await db.collection('users').doc(uid).set(
    {
      geminiApiKeyEncrypted: null,
      hasGeminiKey: false,
    },
    { merge: true }
  );
  return { ok: true };
});

// ---------------------------------------------------------------------
// Sugerencias de mejora para la programación semanal
// ---------------------------------------------------------------------

interface GenerateWeeklySuggestionsInput {
  subjectName: string;
  courseLevel?: string;
  activityTitle: string;
  description: string;
  postClassEvaluation: string;
  language: string;
}

export const generateWeeklySuggestions = onCall(
  { region: REGION, secrets: [geminiEncryptionKey] },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as GenerateWeeklySuggestionsInput;

    const prompt = `Eres un asesor pedagógico experto que ayuda a un docente a reflexionar sobre una sesión de clase ya impartida.

Asignatura: ${subjectLabel(input.subjectName, input.courseLevel)}
Actividad: ${input.activityTitle}
Descripción de la actividad: ${input.description}
Evaluación posterior del docente: ${input.postClassEvaluation}

Responde en ${languageName(input.language)}, en un tono cercano y profesional.
Da entre 2 y 4 sugerencias concretas y breves (en formato de lista, sin numerar) para mejorar esta actividad de cara al próximo curso, teniendo en cuenta la evaluación del docente. No repitas la información ya dada, céntrate en propuestas de mejora accionables.`;

    const suggestions = await generateText(uid, prompt);
    return { suggestions };
  }
);

// ---------------------------------------------------------------------
// Generación de objetivos de aprendizaje para la programación anual
// ---------------------------------------------------------------------

interface GenerateObjectivesInput {
  subjectName: string;
  courseLevel?: string;
  activityTitle: string;
  description: string;
  language: string;
}

export const generateActivityObjectives = onCall(
  { region: REGION, secrets: [geminiEncryptionKey] },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as GenerateObjectivesInput;

    const prompt = `Eres un experto en diseño curricular educativo.

Asignatura: ${subjectLabel(input.subjectName, input.courseLevel)}
Actividad: ${input.activityTitle}
Descripción: ${input.description}

Responde en ${languageName(input.language)}.
Redacta entre 2 y 3 objetivos de aprendizaje claros y concisos para esta actividad, adecuados al nivel educativo indicado. Sepáralos con saltos de línea, sin numerar ni usar viñetas, usando un lenguaje propio de una programación didáctica.`;

    const objectives = await generateText(uid, prompt);
    return { objectives };
  }
);

// ---------------------------------------------------------------------
// Asignación de saberes del currículum a una actividad
// ---------------------------------------------------------------------

interface MatchCurriculumInput {
  subjectName: string;
  courseLevel?: string;
  activityTitle: string;
  description: string;
  curriculumItems: { id: string; code: string; description: string }[];
  language: string;
}

export const matchCurriculumItems = onCall(
  { region: REGION, secrets: [geminiEncryptionKey] },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as MatchCurriculumInput;

    if (!input.curriculumItems?.length) {
      return { curriculumItemIds: [] };
    }

    const itemsList = input.curriculumItems
      .map((item, i) => `${i + 1}. [id=${item.id}] ${item.code ? item.code + ' — ' : ''}${item.description}`)
      .join('\n');

    const prompt = `Eres un experto en diseño curricular educativo.

Asignatura: ${subjectLabel(input.subjectName, input.courseLevel)}
Actividad: ${input.activityTitle}
Descripción de la actividad: ${input.description}

Lista de saberes/contenidos del currículum disponibles:
${itemsList}

Identifica cuáles de estos saberes (entre 1 y 4 como máximo) están más relacionados con la actividad descrita.
Responde ÚNICAMENTE con un JSON válido de la forma {"ids": ["id1", "id2"]}, usando exactamente los valores "id" indicados entre corchetes en la lista. No incluyas explicaciones ni texto adicional, ni bloques de código markdown.`;

    const raw = await generateText(uid, prompt);

    let ids: string[] = [];
    try {
      const cleaned = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed.ids)) {
        const validIds = new Set(input.curriculumItems.map((i) => i.id));
        ids = parsed.ids.filter((id: unknown): id is string => typeof id === 'string' && validIds.has(id));
      }
    } catch {
      ids = [];
    }

    return { curriculumItemIds: ids };
  }
);

// ---------------------------------------------------------------------
// Corrector ortográfico
// ---------------------------------------------------------------------

interface SpellcheckInput {
  text: string;
  language: string;
}

export const spellcheckText = onCall(
  { region: REGION, secrets: [geminiEncryptionKey] },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as SpellcheckInput;

    if (!input.text?.trim()) {
      return { corrected: input.text ?? '', hasErrors: false };
    }

    const prompt = `Corrige únicamente la ortografía y la gramática del siguiente texto en ${languageName(input.language)}, sin cambiar el estilo, el tono ni el significado, y sin añadir comentarios.

Texto:
"""
${input.text}
"""

Responde ÚNICAMENTE con un JSON válido de la forma {"corrected": "...", "hasErrors": true|false}, sin bloques de código markdown ni texto adicional.`;

    const raw = await generateText(uid, prompt);

    try {
      const cleaned = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return {
        corrected: typeof parsed.corrected === 'string' ? parsed.corrected : input.text,
        hasErrors: Boolean(parsed.hasErrors),
      };
    } catch {
      return { corrected: input.text, hasErrors: false };
    }
  }
);

// ---------------------------------------------------------------------
// Resumen de reuniones con IA
// ---------------------------------------------------------------------

interface SummarizeMeetingInput {
  title: string;
  notes: string;
  // Texto pegado por el docente (transcripción, contenido de un documento...)
  summarySourceText: string;
  language: string;
}

export const summarizeMeeting = onCall(
  { region: REGION, secrets: [geminiEncryptionKey] },
  async (request) => {
    const uid = requireAuth(request.auth?.uid);
    const input = request.data as SummarizeMeetingInput;

    const prompt = `Eres un asistente que ayuda a un docente a organizar las notas de una reunión de centro educativo.

Título de la reunión: ${input.title}

Notas del docente:
"""
${input.notes || '(sin notas escritas)'}
"""

Texto adicional proporcionado por el docente (transcripción, documento, etc.):
"""
${input.summarySourceText || '(sin texto adicional)'}
"""

Responde en ${languageName(input.language)}.
Redacta un resumen claro y conciso de los puntos más importantes tratados en la reunión, organizado en una lista breve (sin numerar, usando saltos de línea). Si hay tareas o acuerdos pendientes, destácalos al final bajo un apartado corto. No inventes información que no esté en las notas o el texto proporcionado.`;

    const summary = await generateText(uid, prompt);
    return { summary };
  }
);
