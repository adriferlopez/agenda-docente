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

// --- Situaciones de Aprendizaje: objetivos generales y metodología/recursos ---

export interface SaSessionInput {
  title: string;
  description: string;
}

interface GenerateSaObjectivesArgs {
  subjectName: string;
  courseLevel?: string;
  saName: string;
  sessions: SaSessionInput[];
  pgaObjectives?: string;
  language: string;
}

export async function generateSaObjectives(args: GenerateSaObjectivesArgs): Promise<string> {
  const fn = httpsCallable<GenerateSaObjectivesArgs, { objectives: string }>(functions, 'generateSaObjectives');
  const res = await fn(args);
  return res.data.objectives;
}

interface GenerateSaMethodologyResourcesArgs {
  subjectName: string;
  courseLevel?: string;
  saName: string;
  sessions: SaSessionInput[];
  language: string;
}

export async function generateSaMethodologyResources(
  args: GenerateSaMethodologyResourcesArgs
): Promise<{ methodology: string; resources: string }> {
  const fn = httpsCallable<GenerateSaMethodologyResourcesArgs, { methodology: string; resources: string }>(
    functions,
    'generateSaMethodologyResources'
  );
  const res = await fn(args);
  return res.data;
}

export interface SaCompetencyInput {
  id: string;
  title: string;
  description: string;
  criteris: string[];
}

export interface SaberCatalogItem {
  code: string;
  description: string;
}

interface GenerateSaSabersCriteriaArgs {
  subjectName: string;
  courseLevel?: string;
  saName: string;
  sessions: SaSessionInput[];
  competencies: SaCompetencyInput[];
  sabersCatalog?: SaberCatalogItem[];
  language: string;
}

export async function generateSaSabersCriteria(
  args: GenerateSaSabersCriteriaArgs
): Promise<{ sabers: string; criteria: string }> {
  const fn = httpsCallable<GenerateSaSabersCriteriaArgs, { sabers: string; criteria: string }>(
    functions,
    'generateSaSabersCriteria'
  );
  const res = await fn(args);
  return res.data;
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

// --- Reporte de incidencias/sugerencias ---
// Se envía por correo desde el servidor (Cloud Function `reportIssue`); el
// cliente nunca conoce la dirección de destino, que vive únicamente como
// secreto de Cloud Functions.

export type ReportIssueType = 'suggestion' | 'malfunction' | 'bug';

interface ReportIssueInput {
  type: ReportIssueType;
  message: string;
}

export async function reportIssue(input: ReportIssueInput): Promise<void> {
  const fn = httpsCallable<ReportIssueInput, { ok: boolean }>(functions, 'reportIssue');
  await fn(input);
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

// --- Parseo de horario desde Word ---

export type ParsedSpecialType = 'patio' | 'refuerzo' | 'guardia' | 'tutoria' | 'otro';

export interface TimetableSlotParsed {
  day: number; // 0=Lunes...4=Viernes
  startTime: string; // "08:30"
  endTime: string; // "09:25"
  subjectName: string;
  group: string;
  room?: string;
  // Presente cuando la celda es un evento (patio, guardia, reunión...) y no
  // una asignatura real: hay que crear una franja "especial", no una Subject.
  specialType?: ParsedSpecialType;
  specialLabel?: string;
}

export async function parseTimetableFromText(
  text: string,
  language: string
): Promise<TimetableSlotParsed[]> {
  const fn = httpsCallable<
    { text: string; language: string },
    { slots: TimetableSlotParsed[] }
  >(functions, 'parseTimetableFromText');
  const res = await fn({ text, language });
  return res.data.slots;
}

/** Nueva función: parsea Word/Excel directamente en el servidor (sin Gemini) */
export async function parseTimetableFile(
  file: File
): Promise<TimetableSlotParsed[]> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  const validTypes = ['docx', 'xlsx', 'xls', 'csv'];
  if (!validTypes.includes(ext)) {
    throw new Error(`Formato no soportado. Usa .docx, .xlsx, .xls o .csv`);
  }

  // Convertir a base64
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1] ?? '');
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

  const fn = httpsCallable<
    { fileBase64: string; fileType: string },
    { slots: TimetableSlotParsed[] }
  >(functions, 'parseTimetableFile');
  const res = await fn({ fileBase64: base64, fileType: ext });
  return res.data.slots;
}

// --- Profi: asistente docente ---

export interface ProfiMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function profiChat(
  messages: ProfiMessage[],
  language: string
): Promise<string> {
  // Por defecto el SDK de Functions corta la llamada a los 70s si no se le
  // indica lo contrario, pero la función en el servidor tiene margen hasta
  // 100s (ver functions/src/index.ts, profiChat): sin este `timeout`
  // explícito, una respuesta que tardase entre 70s y 100s hacía que el
  // cliente diera el aviso de "ha ocurrido un error" (deadline-exceeded)
  // mientras el servidor seguía calculando y acababa tirando el resultado
  // — el docente tenía que refrescar y reintentar para que "funcionara".
  const fn = httpsCallable<
    { messages: ProfiMessage[]; language: string },
    { reply: string }
  >(functions, 'profiChat', { timeout: 110_000 });
  const res = await fn({ messages, language });
  return res.data.reply;
}

// --- Generar rúbrica desde saberes curriculares ---

export interface GeneratedCriterion {
  name: string;
  description: string;
  weight: number;
  indicators: [string, string, string, string];
  ceId?: string;
  ref?: number;
}

export interface GeneratedRubric {
  rubricName: string;
  criteria: GeneratedCriterion[];
}

export interface CompetencyInput {
  id: string;
  title: string;
  description: string;
  criteris: string[];
}

interface GenerateRubricArgs {
  subjectName: string;
  courseLevel?: string;
  activityDescription: string;
  curriculumItems?: string[];
  competencies?: CompetencyInput[];
  language: string;
}

export async function generateRubricFromCurriculum(args: GenerateRubricArgs): Promise<GeneratedRubric> {
  const fn = httpsCallable<GenerateRubricArgs, GeneratedRubric>(functions, 'generateRubricFromCurriculum');
  const res = await fn({ ...args, curriculumItems: args.curriculumItems ?? [] });
  return res.data;
}

// --- Comentario de nota personalizado con Profi ---

export interface PriorityCe {
  id: string;
  title: string;
  description: string;
}

interface GenerateGradeCommentArgs {
  studentName: string;
  subjectName: string;
  courseLevel?: string;
  gradeDescription: string;
  priorityCe?: PriorityCe[];
  extraDetails?: string;
  language: string;
}

export async function generateGradeComment(args: GenerateGradeCommentArgs): Promise<string> {
  const fn = httpsCallable<GenerateGradeCommentArgs, { comment: string }>(functions, 'generateGradeComment');
  const res = await fn(args);
  return res.data.comment;
}

// --- Banco de frases por rango/nivel de nota (Comentarios), con Profi ---

export interface GradeBandInput {
  min?: number;
  max?: number;
  level?: string;
}

export type CommentLength = 'short' | 'medium' | 'long';

interface GenerateGradeBandPhrasesArgs {
  subjectName: string;
  courseLevel?: string;
  mode: 'range' | 'qualitative';
  bands: GradeBandInput[];
  priorityCe?: PriorityCe[];
  length?: CommentLength;
  language: string;
}

export async function generateGradeBandPhrases(args: GenerateGradeBandPhrasesArgs): Promise<string[]> {
  const fn = httpsCallable<GenerateGradeBandPhrasesArgs, { texts: string[] }>(functions, 'generateGradeBandPhrases');
  const res = await fn(args);
  return res.data.texts;
}

// --- Detectar de qué Competència Específica viene cada criterio de rúbrica ---

export interface MatchCriteriaCompetency {
  id: string;
  title: string;
  description: string;
}

export interface MatchCriteriaCriterion {
  index: number;
  name: string;
  description?: string;
}

export interface CriterionCeMatch {
  index: number;
  ceId: string | null;
}

interface MatchCriteriaToCompetenciesArgs {
  subjectName: string;
  courseLevel?: string;
  competencies: MatchCriteriaCompetency[];
  criteria: MatchCriteriaCriterion[];
  language: string;
}

export async function matchCriteriaToCompetencies(args: MatchCriteriaToCompetenciesArgs): Promise<CriterionCeMatch[]> {
  const fn = httpsCallable<MatchCriteriaToCompetenciesArgs, { matches: CriterionCeMatch[] }>(
    functions,
    'matchCriteriaToCompetencies'
  );
  const res = await fn(args);
  return res.data.matches;
}

// --- Herramientas de Profi ---

// 1) Generar el enunciado de un examen (la rúbrica se genera aparte con
// generateRubricFromCurriculum, ya existente arriba).

export interface ExamQuestionSpec {
  label: string;
  count: number;
  pointsEach: number;
}

interface GenerateExamStatementArgs {
  subjectName: string;
  courseLevel?: string;
  topic: string;
  criteria: { name: string; description?: string }[];
  questionSpec?: ExamQuestionSpec[];
  includeImages?: boolean;
  contextPdfBase64?: string;
  language: string;
}

export interface GeneratedExamStatement {
  examTitle: string;
  statement: string;
}

export async function generateExamStatement(args: GenerateExamStatementArgs): Promise<GeneratedExamStatement> {
  const fn = httpsCallable<GenerateExamStatementArgs, GeneratedExamStatement>(functions, 'generateExamStatement');
  const res = await fn(args);
  return res.data;
}

// 2) Planificar una Situación de Aprendizaje completa en N sesiones,
// estructuradas en 3 fases (inicio/desarrollo/síntesis).

export type UnitSessionPhase = 'inicio' | 'desarrollo' | 'sintesis';

export interface PlanUnitCompetencyInput {
  id: string;
  title: string;
  description: string;
  howToWork?: string;
}

interface PlanLearningUnitArgs {
  subjectName: string;
  courseLevel?: string;
  sessionCount: number;
  competencies: PlanUnitCompetencyInput[];
  contentsToWorkOn?: string;
  threadIdea?: string;
  methodologies: string[];
  materialTypes: string[];
  finalProduct: string;
  hasExam: boolean;
  groupNotes?: string;
  language: string;
}

export interface PlannedUnitSession {
  phase: UnitSessionPhase;
  title: string;
  description: string;
  ceIds: string[];
  isEvaluated: boolean;
  evaluationName?: string;
}

export interface PlannedLearningUnit {
  unitLabel: string;
  sessions: PlannedUnitSession[];
}

export async function planLearningUnit(args: PlanLearningUnitArgs): Promise<PlannedLearningUnit> {
  // Es la generación más pesada de toda la app (hasta 20 sesiones completas),
  // así que necesita más margen que el resto de
  // llamadas a Profi: el timeout del cliente debe ser mayor que el
  // `timeoutSeconds` del servidor (ver functions/src/index.ts) para que sea
  // siempre el servidor quien corte primero con un error legible, en vez de
  // que Cloud Run mate la conexión a medio respuesta (lo que el navegador
  // reporta erróneamente como un bloqueo de CORS).
  const fn = httpsCallable<PlanLearningUnitArgs, PlannedLearningUnit>(functions, 'planLearningUnit', { timeout: 260_000 });
  const res = await fn(args);
  return res.data;
}

// 3) Resumir resultados reales de una clase (las medias se calculan en el
// cliente; el servidor solo redacta el resumen).

export interface ClassCeStat {
  ceName: string;
  average: number;
  strugglingCount: number;
  totalCount: number;
}

export interface StrugglingStudent {
  name: string;
  weakCe: string[];
}

interface SummarizeClassResultsArgs {
  subjectName: string;
  courseLevel?: string;
  groupName?: string;
  overallAverage?: number;
  ceStats: ClassCeStat[];
  strugglingStudents: StrugglingStudent[];
  language: string;
}

export async function summarizeClassResults(args: SummarizeClassResultsArgs): Promise<string> {
  const fn = httpsCallable<SummarizeClassResultsArgs, { summary: string }>(functions, 'summarizeClassResults');
  const res = await fn(args);
  return res.data.summary;
}

// 4) Sugerir adaptaciones para un alumno con adaptación curricular

export interface AdaptationCriterionInput {
  name: string;
  description?: string;
  indicators?: string[];
}

interface SuggestAdaptationArgs {
  subjectName: string;
  courseLevel?: string;
  studentFirstName: string;
  activityName: string;
  generalCriteria: AdaptationCriterionInput[];
  adaptedCriteria?: AdaptationCriterionInput[];
  language: string;
}

export async function suggestAdaptation(args: SuggestAdaptationArgs): Promise<string> {
  const fn = httpsCallable<SuggestAdaptationArgs, { suggestions: string }>(functions, 'suggestAdaptation');
  const res = await fn(args);
  return res.data.suggestions;
}

// 5) Redactar comunicados a familias

export type FamilyMessageType = 'meeting' | 'circular' | 'notice';

interface DraftFamilyMessageArgs {
  messageType: FamilyMessageType;
  subjectName?: string;
  groupName?: string;
  keyPoints: string;
  language: string;
}

export async function draftFamilyMessage(args: DraftFamilyMessageArgs): Promise<string> {
  const fn = httpsCallable<DraftFamilyMessageArgs, { draft: string }>(functions, 'draftFamilyMessage');
  const res = await fn(args);
  return res.data.draft;
}
