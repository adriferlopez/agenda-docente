import { httpsCallable } from 'firebase/functions';
import { functions } from '@/firebase/config';

/**
 * Todas las llamadas a Gemini pasan por Cloud Functions ("callable functions").
 * El cliente nunca ve la API key del usuario: la función la recupera cifrada
 * de Firestore, la descifra en el servidor con el secreto GEMINI_ENCRYPTION_KEY
 * y hace la petición a la API de Gemini desde el backend.
 */

interface GenerateSuggestionsInput {
  subjectName: string;
  courseLevel?: string;
  activityTitle: string;
  description: string;
  postClassEvaluation: string;
  language: string;
}

export async function generateWeeklySuggestions(input: GenerateSuggestionsInput): Promise<string> {
  const fn = httpsCallable<GenerateSuggestionsInput, { suggestions: string }>(
    functions,
    'generateWeeklySuggestions'
  );
  const res = await fn(input);
  return res.data.suggestions;
}

interface GenerateObjectivesInput {
  subjectName: string;
  courseLevel?: string;
  activityTitle: string;
  description: string;
  language: string;
}

export async function generateActivityObjectives(input: GenerateObjectivesInput): Promise<string> {
  const fn = httpsCallable<GenerateObjectivesInput, { objectives: string }>(
    functions,
    'generateActivityObjectives'
  );
  const res = await fn(input);
  return res.data.objectives;
}

interface MatchCurriculumInput {
  subjectName: string;
  courseLevel?: string;
  activityTitle: string;
  description: string;
  curriculumItems: { id: string; code: string; description: string }[];
  language: string;
}

export async function matchCurriculumItems(input: MatchCurriculumInput): Promise<string[]> {
  const fn = httpsCallable<MatchCurriculumInput, { curriculumItemIds: string[] }>(
    functions,
    'matchCurriculumItems'
  );
  const res = await fn(input);
  return res.data.curriculumItemIds;
}

interface SpellcheckInput {
  text: string;
  language: string;
}

export async function spellcheckText(input: SpellcheckInput): Promise<{ corrected: string; hasErrors: boolean }> {
  const fn = httpsCallable<SpellcheckInput, { corrected: string; hasErrors: boolean }>(functions, 'spellcheckText');
  const res = await fn(input);
  return res.data;
}

// --- Gestión de la clave de Gemini del usuario ---

export async function saveGeminiApiKey(apiKey: string): Promise<void> {
  const fn = httpsCallable<{ apiKey: string }, { ok: boolean }>(functions, 'saveGeminiApiKey');
  await fn({ apiKey });
}

export async function removeGeminiApiKey(): Promise<void> {
  const fn = httpsCallable<Record<string, never>, { ok: boolean }>(functions, 'removeGeminiApiKey');
  await fn({});
}

// --- Resumen de reuniones ---

interface SummarizeMeetingInput {
  title: string;
  notes: string;
  summarySourceText: string;
  language: string;
}

export async function summarizeMeeting(input: SummarizeMeetingInput): Promise<string> {
  const fn = httpsCallable<SummarizeMeetingInput, { summary: string }>(functions, 'summarizeMeeting');
  const res = await fn(input);
  return res.data.summary;
}
