import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Unsubscribe } from 'firebase/firestore';
import { parseISO } from 'date-fns';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import { subscribeSubjects } from '@/firebase/subjects';
import { subscribeStudents } from '@/firebase/students';
import { subscribeStudentAdaptations } from '@/firebase/studentAdaptations';
import { subscribeTimetable } from '@/firebase/timetable';
import { upsertWeeklyPlan, subscribeAllWeeklyPlans } from '@/firebase/weeklyPlans';
import { subscribeLearningSituations, createLearningSituation, updateLearningSituation } from '@/firebase/learningSituations';
import { subscribeProfiUnitDrafts, saveProfiUnitDraft, deleteProfiUnitDraft, type ProfiUnitDraft } from '@/firebase/profiDrafts';
import {
  getGradebookActivitiesOnce,
  getGradebookActivitiesForSubjectOnce,
  createGradebookActivity,
} from '@/firebase/gradebookActivities';
import { getRubricsOnce, createRubric, getGradeEntriesOnce } from '@/firebase/grades';
import { computeBlendedGrade } from '@/utils/grading';
import { getEffectiveTerms, termForDate } from '@/utils/terms';
import { getWeekStart, shiftWeek, isoDateForDayInWeek } from '@/utils/dates';
import { getCurriculumForSubject } from '@/data/curriculum';
import type { EtapaCurriculum } from '@/data/curriculum/types';
import { getEffectiveEtapas } from '@/types';
import { subjectDisplayName } from '@/utils/timetableDisplay';
import { buildExamDocx, downloadBlob, type ExamLetterStyle } from '@/utils/examDocx';
import {
  generateRubricFromCurriculum,
  generateExamStatement,
  planLearningUnit,
  generateSaObjectives,
  generateSaSabersCriteria,
  summarizeClassResults,
  suggestAdaptation,
  draftFamilyMessage,
  type FamilyMessageType,
} from '@/services/ai';
import type { PlanUnitCompetencyInput, PlannedUnitSession } from '@/services/ai';
import type { Subject, Student, StudentAdaptation, GradebookActivity, Rubric, TimetableSlot, WeeklyPlan, LearningSituation } from '@/types';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input, Textarea } from '@/components/ui/Input';
import TagMultiSelect from '@/components/ui/TagMultiSelect';
import { IconCheck, IconFileText, IconCalendar, IconMail, IconRefresh, IconChevronLeft, IconChevronRight } from '@/components/ui/icons';
import { IconCopy, IconGrades, IconUsers } from '@/components/ui/icons-extra';
import RubricCriteriaEditor from '@/components/rubric/RubricCriteriaEditor';

export type ProfiToolId = 'exam' | 'unit' | 'analyze' | 'adapt' | 'family';

export const PROFI_TOOL_IDS: ProfiToolId[] = ['exam', 'unit', 'analyze', 'adapt', 'family'];

export const PROFI_TOOL_ICONS: Record<ProfiToolId, typeof IconFileText> = {
  exam: IconFileText,
  unit: IconCalendar,
  analyze: IconGrades,
  adapt: IconUsers,
  family: IconMail,
};

// Convierte una suscripción onSnapshot en una lectura puntual: nos
// desuscribimos en cuanto llega el primer valor. Evita tener que duplicar
// "getOnce" en cada archivo de firebase/ solo para estas herramientas.
//
// Las funciones subscribeX que usamos aquí no exponen un callback de error
// de onSnapshot, así que un permiso de Firestore denegado (o cualquier otro
// fallo de la suscripción) se traducía antes en una promesa que nunca se
// resuelve ni se rechaza: el botón se quedaba en "Guardando..." para
// siempre, sin ningún error visible ("no avanza"). Con este timeout, si no
// llega ningún dato en un tiempo razonable, la promesa se rechaza con un
// mensaje claro que sí se muestra al docente.
function onceFromSubscribe<T>(subscribe: (cb: (data: T) => void) => Unsubscribe, timeoutMs = 15000): Promise<T> {
  return new Promise((resolve, reject) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      unsub();
      reject(new Error('No se han podido leer los datos a tiempo. Comprueba tu conexión e inténtalo de nuevo.'));
    }, timeoutMs);
    const unsub = subscribe((data) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      unsub();
      resolve(data);
    });
  });
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------
// Piezas compartidas por las 5 herramientas
// ---------------------------------------------------------------------

function useOwnerContext() {
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const { activeYear } = useSchoolYears();
  const language = profile?.language ?? 'es';
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    if (!user || !activeYear) return;
    return subscribeSubjects(user.uid, activeYear.id, setSubjects);
  }, [user, activeYear]);

  return {
    ownerId: user?.uid ?? '',
    schoolYearId: activeYear?.id ?? '',
    ready: !!user && !!activeYear,
    profile,
    language,
    subjects,
  };
}

function CopyButton({ text }: { text: string }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="ghost"
      size="sm"
      icon={copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
      onClick={async () => {
        const ok = await copyToClipboard(text);
        if (ok) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      }}
    >
      {copied ? t('profi.tools.copied') : t('profi.tools.copy')}
    </Button>
  );
}

function ResultBox({ text }: { text: string }) {
  return (
    <div
      className="rounded-xl px-3 py-2.5 text-sm whitespace-pre-wrap leading-relaxed"
      style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
    >
      {text}
    </div>
  );
}

function ErrorText({ message }: { message: string }) {
  return (
    <p className="text-xs rounded-xl px-3 py-2" style={{ background: 'rgba(248,113,113,0.12)', color: 'var(--danger-text)' }}>
      {message}
    </p>
  );
}

function SubjectSelect({
  subjects, value, onChange, label,
}: {
  subjects: Subject[];
  value: string;
  onChange: (id: string) => void;
  label: string;
}) {
  return (
    <Select label={label} value={value} onChange={(e) => onChange(e.target.value)}>
      {subjects.map((s) => (
        <option key={s.id} value={s.id}>{subjectDisplayName(s)}</option>
      ))}
    </Select>
  );
}

// ---------------------------------------------------------------------
// 1) Generar examen completo
// ---------------------------------------------------------------------

const EXAM_QUESTION_TYPE_IDS = ['multipleChoice', 'trueFalse', 'shortAnswer', 'essay', 'fillBlank', 'matching'] as const;
type ExamQuestionTypeId = typeof EXAM_QUESTION_TYPE_IDS[number];

interface ExamQuestionTypeRow {
  id: ExamQuestionTypeId;
  enabled: boolean;
  count: number;
  pointsEach: number;
}

const DEFAULT_QUESTION_ROWS: ExamQuestionTypeRow[] = [
  { id: 'multipleChoice', enabled: true, count: 4, pointsEach: 1 },
  { id: 'shortAnswer', enabled: true, count: 3, pointsEach: 2 },
  { id: 'trueFalse', enabled: false, count: 4, pointsEach: 0.5 },
  { id: 'essay', enabled: false, count: 1, pointsEach: 4 },
  { id: 'fillBlank', enabled: false, count: 4, pointsEach: 0.5 },
  { id: 'matching', enabled: false, count: 4, pointsEach: 0.5 },
];

const EXAM_LETTER_STYLES: ExamLetterStyle[] = ['normal', 'uppercase', 'cursive', 'print'];

const MAX_CONTEXT_PDF_BYTES = 8 * 1024 * 1024; // 8 MB

async function fileToBase64(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
  return dataUrl.split(',')[1] ?? '';
}

function GenerateExamTool({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const { ownerId, schoolYearId, ready, profile, language, subjects } = useOwnerContext();
  const [subjectId, setSubjectId] = useState('');
  const [topic, setTopic] = useState('');
  const [saId, setSaId] = useState('');
  const [saOptions, setSaOptions] = useState<LearningSituation[]>([]);
  const [subjectPlans, setSubjectPlans] = useState<WeeklyPlan[]>([]);
  const [contextPdf, setContextPdf] = useState<{ name: string; base64: string } | null>(null);
  const [pdfError, setPdfError] = useState('');
  const [questionRows, setQuestionRows] = useState<ExamQuestionTypeRow[]>(DEFAULT_QUESTION_ROWS);
  const [includeImages, setIncludeImages] = useState(false);
  const [letterStyle, setLetterStyle] = useState<ExamLetterStyle>('normal');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ examTitle: string; statement: string; rubricName: string; criteria: Awaited<ReturnType<typeof generateRubricFromCurriculum>>['criteria'] } | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!subjectId && subjects.length > 0) setSubjectId(subjects[0].id);
  }, [subjects, subjectId]);

  const subject = subjects.find((s) => s.id === subjectId);

  // Situaciones de Aprendizaje ya planificadas para esta asignatura, para
  // poder generar el examen a partir de las CE realmente trabajadas en vez
  // de un tema escrito a mano.
  useEffect(() => {
    setSaId('');
    if (!subject || !ready) { setSaOptions([]); setSubjectPlans([]); return; }
    let cancelled = false;
    Promise.all([
      onceFromSubscribe<WeeklyPlan[]>((cb) => subscribeAllWeeklyPlans(ownerId, schoolYearId, cb)),
      onceFromSubscribe<LearningSituation[]>((cb) => subscribeLearningSituations(ownerId, schoolYearId, subject.id, cb)),
    ]).then(([all, situations]) => {
      if (cancelled) return;
      setSubjectPlans(all.filter((p) => p.subjectId === subject.id));
      setSaOptions(situations);
    });
    return () => { cancelled = true; };
  }, [subject?.id, ready]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const name = saOptions.find((s) => s.id === saId)?.name;
    if (name && !topic.trim()) setTopic(name);
  }, [saId]); // eslint-disable-line react-hooks/exhaustive-deps

  const activeRows = questionRows.filter((r) => r.enabled && r.count > 0);
  const totalPoints = activeRows.reduce((sum, r) => sum + r.count * r.pointsEach, 0);
  const hasAnyType = activeRows.length > 0;

  function updateRow(id: ExamQuestionTypeId, patch: Partial<ExamQuestionTypeRow>) {
    setQuestionRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function handlePdfChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setPdfError('');
    if (file.type !== 'application/pdf') {
      setPdfError(t('profi.tools.exam.pdfInvalidType'));
      return;
    }
    if (file.size > MAX_CONTEXT_PDF_BYTES) {
      setPdfError(t('profi.tools.exam.pdfTooBig'));
      return;
    }
    const base64 = await fileToBase64(file);
    setContextPdf({ name: file.name, base64 });
  }

  async function handleGenerate() {
    if (!subject || !topic.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    setSaved(false);
    try {
      const etapas = getEffectiveEtapas(profile);
      const comunitat = profile?.comunitat ?? 'catalunya';
      // Currículum de la etapa real de esta asignatura (según su curso), no
      // uno combinado de todas las etapas del docente: evita mezclar CE de
      // otra etapa cuando un àrea se llama igual en las dos (p.ej.
      // "Matemàtiques" en ESO y Batxillerat).
      const curriculum = getCurriculumForSubject(comunitat, subject.courseLevel, etapas);
      const catalogCePool: { id: string; title: string; description: string; criteris: string[] }[] = [];
      for (const area of subject.curriculumAreas ?? []) {
        const areaData = curriculum?.competencies?.[area];
        if (!areaData) continue;
        for (const ce of areaData.competencies) {
          const criteris = Array.isArray(ce.criteris) ? ce.criteris : Object.values(ce.criteris ?? {}).flat();
          catalogCePool.push({ id: ce.id, title: ce.title, description: ce.description, criteris });
        }
      }

      // Si el docente ha elegido una SA ya planificada, restringimos las CE
      // disponibles a las que de verdad se trabajaron en esa SA (según las
      // rúbricas usadas en sus sesiones), en vez del catálogo completo de la
      // asignatura — así el examen refleja lo que se ha enseñado de verdad.
      let cePool = catalogCePool;
      if (saId) {
        const rubricIds = [...new Set(subjectPlans.filter((p) => p.saId === saId && p.rubricId).map((p) => p.rubricId!))];
        if (rubricIds.length > 0) {
          const rubrics = await getRubricsOnce(ownerId, schoolYearId);
          const ceMap = new Map<string, { id: string; title: string; description: string; criteris: string[] }>();
          for (const rubric of rubrics.filter((r) => rubricIds.includes(r.id))) {
            for (const c of rubric.criteria) {
              if (!c.ceId || ceMap.has(c.ceId)) continue;
              ceMap.set(c.ceId, { id: c.ceId, title: c.ceName ?? c.ceId, description: c.ceReference ?? '', criteris: [] });
            }
          }
          if (ceMap.size > 0) cePool = [...ceMap.values()];
        }
      }

      const rubric = await generateRubricFromCurriculum({
        subjectName: subject.name,
        courseLevel: subject.courseLevel,
        activityDescription: topic,
        competencies: cePool.length > 0 ? cePool : undefined,
        language,
      });
      const exam = await generateExamStatement({
        subjectName: subject.name,
        courseLevel: subject.courseLevel,
        topic,
        criteria: rubric.criteria.map((c) => ({ name: c.name, description: c.description })),
        questionSpec: hasAnyType
          ? activeRows.map((r) => ({ label: t(`profi.tools.exam.type.${r.id}`), count: r.count, pointsEach: r.pointsEach }))
          : undefined,
        includeImages,
        contextPdfBase64: contextPdf?.base64,
        language,
      });
      const examTitle = letterStyle === 'uppercase' ? exam.examTitle.toUpperCase() : exam.examTitle;
      const statement = letterStyle === 'uppercase' ? exam.statement.toUpperCase() : exam.statement;
      setResult({ examTitle, statement, rubricName: rubric.rubricName, criteria: rubric.criteria });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload() {
    if (!result) return;
    setDownloading(true);
    try {
      const blob = await buildExamDocx({ title: result.examTitle, statement: result.statement, letterStyle });
      downloadBlob(blob, `${result.examTitle.slice(0, 60).trim() || 'examen'}.docx`);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <ToolLayout
      title={t('profi.tools.exam.title')}
      onClose={onClose}
      loading={loading}
      subjectsEmpty={subjects.length === 0}
    >
      <SubjectSelect subjects={subjects} value={subjectId} onChange={setSubjectId} label={t('profi.tools.subject')} />

      {saOptions.length > 0 && (
        <Select label={t('profi.tools.exam.saLabel')} value={saId} onChange={(e) => setSaId(e.target.value)}>
          <option value="">{t('profi.tools.exam.saNone')}</option>
          {saOptions.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </Select>
      )}
      {saId && (
        <p className="text-xs -mt-1.5" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.exam.saHint')}</p>
      )}

      <Input
        label={t('profi.tools.exam.topic')}
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder={t('profi.tools.exam.topicPlaceholder')}
      />

      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.exam.contextPdf')}</p>
        <label
          className="flex items-center justify-center gap-2 text-xs font-medium rounded-xl px-3 py-2.5 cursor-pointer transition hover:opacity-80"
          style={{ background: 'var(--bg-input)', border: '1px dashed var(--border-input)', color: 'var(--text-secondary)' }}
        >
          {contextPdf ? contextPdf.name : t('profi.tools.exam.contextPdfPlaceholder')}
          <input type="file" accept="application/pdf" className="hidden" onChange={handlePdfChange} />
        </label>
        {contextPdf && (
          <Button variant="ghost" size="sm" onClick={() => setContextPdf(null)} className="self-start">
            {t('profi.tools.exam.contextPdfRemove')}
          </Button>
        )}
        {pdfError && <ErrorText message={pdfError} />}
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.exam.questionTypes')}</p>
        <div className="flex flex-col gap-1.5">
          {questionRows.map((row) => (
            <div
              key={row.id}
              className="flex items-center gap-2 rounded-xl px-2.5 py-1.5"
              style={{ background: row.enabled ? 'var(--bg-input)' : 'transparent', border: '1px solid var(--border)' }}
            >
              <input
                type="checkbox"
                checked={row.enabled}
                onChange={(e) => updateRow(row.id, { enabled: e.target.checked })}
              />
              <span className="text-xs flex-1" style={{ color: 'var(--text-primary)' }}>{t(`profi.tools.exam.type.${row.id}`)}</span>
              <input
                type="number"
                min={0}
                max={20}
                disabled={!row.enabled}
                value={row.count}
                onChange={(e) => updateRow(row.id, { count: Math.max(0, Number(e.target.value) || 0) })}
                className="w-14 text-xs rounded-lg px-1.5 py-1 text-center"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-input)', color: 'var(--text-primary)' }}
                title={t('profi.tools.exam.count')}
              />
              <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>×</span>
              <input
                type="number"
                min={0}
                step={0.5}
                disabled={!row.enabled}
                value={row.pointsEach}
                onChange={(e) => updateRow(row.id, { pointsEach: Math.max(0, Number(e.target.value) || 0) })}
                className="w-14 text-xs rounded-lg px-1.5 py-1 text-center"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-input)', color: 'var(--text-primary)' }}
                title={t('profi.tools.exam.pointsEach')}
              />
              <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.exam.pts')}</span>
            </div>
          ))}
        </div>
        <p className="text-xs font-medium self-end" style={{ color: 'var(--text-secondary)' }}>
          {t('profi.tools.exam.totalPoints')}: {totalPoints}
        </p>
      </div>

      <label className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-primary)' }}>
        <input type="checkbox" checked={includeImages} onChange={(e) => setIncludeImages(e.target.checked)} />
        {t('profi.tools.exam.includeImages')}
      </label>

      <Select label={t('profi.tools.exam.letterStyle')} value={letterStyle} onChange={(e) => setLetterStyle(e.target.value as ExamLetterStyle)}>
        {EXAM_LETTER_STYLES.map((style) => (
          <option key={style} value={style}>{t(`profi.tools.exam.letter.${style}`)}</option>
        ))}
      </Select>
      {(letterStyle === 'cursive' || letterStyle === 'print') && (
        <p className="text-xs -mt-1.5" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.exam.letterHint')}</p>
      )}

      <Button onClick={handleGenerate} disabled={loading || !topic.trim() || !subject || (!hasAnyType && activeRows.length === 0)} className="self-start">
        {loading ? t('profi.tools.generating') : t('profi.tools.generate')}
      </Button>

      {error && <ErrorText message={error} />}

      {result && (
        <>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{result.examTitle}</p>
            <div className="flex items-center gap-1.5">
              <CopyButton text={result.statement} />
              <Button variant="ghost" size="sm" onClick={handleDownload} disabled={downloading}>
                {downloading ? t('profi.tools.exam.saving') : t('profi.tools.exam.downloadWord')}
              </Button>
            </div>
          </div>
          <ResultBox text={result.statement} />
          <p className="text-xs font-medium mt-1" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.exam.rubricPreview')}: {result.rubricName}</p>
          <ul className="text-xs flex flex-col gap-1" style={{ color: 'var(--text-secondary)' }}>
            {result.criteria.map((c, i) => <li key={i}>· {c.name}</li>)}
          </ul>
          {saved ? (
            <p className="text-xs font-medium" style={{ color: 'var(--accent-text)' }}>{t('profi.tools.exam.saved')}</p>
          ) : (
            <ExamSaveButton
              ownerId={ownerId}
              schoolYearId={schoolYearId}
              subject={subject!}
              result={result}
              saving={saving}
              setSaving={setSaving}
              setSaved={setSaved}
              setError={setError}
            />
          )}
        </>
      )}
    </ToolLayout>
  );
}

// Separado en su propio componente para poder usar el hook useSchoolYears
// (activeYear con sus terms ya resueltos) sin duplicar la suscripción.
function ExamSaveButton({
  ownerId, schoolYearId, subject, result, saving, setSaving, setSaved, setError,
}: {
  ownerId: string;
  schoolYearId: string;
  subject: Subject;
  result: { examTitle: string; rubricName: string; criteria: Awaited<ReturnType<typeof generateRubricFromCurriculum>>['criteria'] };
  saving: boolean;
  setSaving: (v: boolean) => void;
  setSaved: (v: boolean) => void;
  setError: (v: string) => void;
}) {
  const { t } = useTranslation();
  const { activeYear } = useSchoolYears();

  async function handleSave() {
    if (!activeYear) return;
    setSaving(true);
    setError('');
    try {
      const terms = getEffectiveTerms(activeYear);
      const term = termForDate(terms, todayIso()) ?? terms[0];
      if (!term) {
        setError(t('profi.tools.exam.noTerm'));
        return;
      }
      const rubricId = await createRubric(ownerId, schoolYearId, {
        name: result.rubricName,
        subjectId: subject.id,
        criteria: result.criteria.map((c, i) => ({
          id: `exam-${Date.now()}-${i}`,
          name: c.name,
          description: c.description,
          weight: c.weight,
          indicators: c.indicators,
          ...(c.ceId ? { ceId: c.ceId } : {}),
        })),
      });
      await createGradebookActivity(ownerId, schoolYearId, {
        subjectId: subject.id,
        termId: term.id,
        name: result.examTitle,
        rubricId,
        weight: 100,
        scoreType: 'numeric',
      });
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Button onClick={handleSave} disabled={saving || !activeYear} className="self-start">
      {saving ? t('profi.tools.exam.saving') : t('profi.tools.exam.save')}
    </Button>
  );
}

// ---------------------------------------------------------------------
// 2) Planificar unidad completa (Situación de Aprendizaje)
// ---------------------------------------------------------------------

const UNIT_METHODOLOGY_IDS = [
  'abp',
  'flippedClassroom',
  'cooperativeLearning',
  'gamification',
  'designThinking',
  'stationRotation',
  'debate',
  'projectPresentation',
  'peerAssessment',
  'inquiryBased',
] as const;

const MAX_METHODOLOGIES = 3;

const UNIT_MATERIAL_IDS = [
  'fichas',
  'recursosInteractivos',
  'manualidades',
  'videos',
  'presentaciones',
  'juegosDinamicas',
  'lecturas',
  'materialManipulativo',
  'tic',
  'muralesPosters',
] as const;

const MAX_MATERIALS = 5;

type UnitCePoolItem = { id: string; title: string; description: string; criteris: string[] };

/** Saberes/contenidos oficiales de las àrees de la asignatura (a partir de
 * data/curriculum), para que la IA elija y adapte de ahí en vez de
 * inventar contenidos al sugerir los saberes trabajados en una SA. Misma
 * lógica que AnnualPlanningPage usa para el emparejamiento de saberes. */
function getSubjectSaberCatalog(subject: Subject, curriculum: EtapaCurriculum | null): { code: string; description: string }[] {
  if (!curriculum) return [];
  const items: { code: string; description: string }[] = [];
  for (const areaName of subject.curriculumAreas ?? []) {
    const area = curriculum.areas[areaName];
    if (!area) continue;
    for (const [bloc, byCourse] of Object.entries(area.blocs)) {
      for (const [courseKey, sabers] of Object.entries(byCourse)) {
        const courseLabel = area.courseLabels[courseKey] ?? courseKey;
        for (const text of sabers) {
          items.push({ code: `${bloc} · ${courseLabel}`, description: text });
        }
      }
    }
  }
  return items;
}

interface RubricGenState {
  generating: boolean;
  error: string;
  rubricName: string;
  criteria: Awaited<ReturnType<typeof generateRubricFromCurriculum>>['criteria'] | null;
  approving: boolean;
  approved: boolean;
}

function emptyRubricState(): RubricGenState {
  return { generating: false, error: '', rubricName: '', criteria: null, approving: false, approved: false };
}

function PlanUnitTool({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const { ownerId, schoolYearId, ready, profile, language, subjects } = useOwnerContext();
  const [subjectId, setSubjectId] = useState('');
  const [saId, setSaId] = useState('');
  const [saOptions, setSaOptions] = useState<LearningSituation[]>([]);
  const [sessionCount, setSessionCount] = useState(4);
  const [ceIds, setCeIds] = useState<Set<string>>(new Set());
  const [howToWorkByCe, setHowToWorkByCe] = useState<Record<string, string>>({});
  const [contentsToWorkOn, setContentsToWorkOn] = useState('');
  const [threadIdea, setThreadIdea] = useState('');
  const [selectedMethodologyIds, setSelectedMethodologyIds] = useState<Set<string>>(new Set());
  const [customMethodology, setCustomMethodology] = useState('');
  const [selectedMaterialIds, setSelectedMaterialIds] = useState<Set<string>>(new Set());
  const [customMaterial, setCustomMaterial] = useState('');
  const [finalProduct, setFinalProduct] = useState('');
  const [hasExam, setHasExam] = useState(true);
  const [groupNotes, setGroupNotes] = useState('');
  const [startDate, setStartDate] = useState(() => todayIso());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unitLabel, setUnitLabel] = useState('');
  const [sessions, setSessions] = useState<PlannedUnitSession[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedCount, setSavedCount] = useState<number | null>(null);
  const [savedTargets, setSavedTargets] = useState<{ weekStart: string; slot: TimetableSlot }[] | null>(null);
  const [savedSaId, setSavedSaId] = useState<string | null>(null);
  const [generatingObjectives, setGeneratingObjectives] = useState(false);
  const [objectives, setObjectives] = useState('');
  const [generatingSabers, setGeneratingSabers] = useState(false);
  const [sabers, setSabers] = useState('');
  const [criteriaText, setCriteriaText] = useState('');
  // Metodología/recursos: a diferencia de objetivos/saberes/criterios (que
  // Profi genera con IA bajo demanda), estos se construyen directamente de
  // lo que el docente ya marcó en el formulario (metodologías/materiales
  // elegidos + texto libre) — sin otra llamada a Gemini — y se ofrecen aquí
  // para revisar/editar antes de guardarlos en la SA, igual que el resto de
  // campos. Si la SA es una ya existente y ya tenía texto propio en algún
  // campo, no se prerellena ese campo (para no pisar lo que el docente ya
  // había escrito a mano).
  const [methodologyText, setMethodologyText] = useState('');
  const [resourcesText, setResourcesText] = useState('');
  const [savingSaFields, setSavingSaFields] = useState(false);
  const [saFieldsSaved, setSaFieldsSaved] = useState(false);
  const [saError, setSaError] = useState('');

  // Rúbricas por sesión evaluable: el estado vive aquí (no dentro de cada
  // SessionRubricPanel) para poder generarlas todas en bloque y navegarlas
  // en un carrusel, en vez de que cada panel sea una isla independiente.
  const { activeYear } = useSchoolYears();
  const [rubricStates, setRubricStates] = useState<Record<number, RubricGenState>>({});
  const [bulkGenerating, setBulkGenerating] = useState(false);
  const [bulkProgress, setBulkProgress] = useState<{ done: number; total: number } | null>(null);
  const [rubricCarouselIndex, setRubricCarouselIndex] = useState(0);

  // Borradores: la planificación se guarda sola (con un pequeño retraso)
  // mientras el docente la revisa/edita, para poder cerrar Profi a medias y
  // retomarla más tarde antes de incorporarla a la programación semanal.
  const [drafts, setDrafts] = useState<ProfiUnitDraft[]>([]);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [draftsOpen, setDraftsOpen] = useState(false);
  const [draftsError, setDraftsError] = useState('');
  const hasAutoOpenedDrafts = useRef(false);

  useEffect(() => {
    if (!subjectId && subjects.length > 0) setSubjectId(subjects[0].id);
  }, [subjects, subjectId]);

  useEffect(() => {
    if (!ready) { setDrafts([]); return; }
    return subscribeProfiUnitDrafts(
      ownerId,
      schoolYearId,
      (list) => { setDrafts(list); setDraftsError(''); },
      (err) => setDraftsError(err.message)
    );
  }, [ownerId, schoolYearId, ready]);

  // La primera vez que se abre la herramienta, si hay borradores pendientes
  // y todavía no se ha generado nada en esta sesión, se muestra el panel
  // solo/a para que sean fáciles de encontrar. A partir de ahí el docente
  // controla la visibilidad con el botón "Historial".
  useEffect(() => {
    if (hasAutoOpenedDrafts.current || sessions) return;
    if (drafts.length > 0) {
      setDraftsOpen(true);
      hasAutoOpenedDrafts.current = true;
    }
  }, [drafts.length, sessions]);

  useEffect(() => {
    if (!sessions || !subject || !ready || savedCount !== null) return;
    const handle = setTimeout(() => {
      saveProfiUnitDraft(ownerId, schoolYearId, draftId, {
        subjectId: subject.id,
        saId,
        unitLabel,
        sessions,
        sessionCount,
        ceIds: [...ceIds],
        howToWorkByCe,
        contentsToWorkOn,
        threadIdea,
        methodologyIds: [...selectedMethodologyIds],
        customMethodology,
        materialIds: [...selectedMaterialIds],
        customMaterial,
        finalProduct,
        hasExam,
        groupNotes,
        startDate,
      })
        .then((id) => { setDraftId((prev) => prev ?? id); setDraftsError(''); })
        .catch((err) => setDraftsError(err instanceof Error ? err.message : String(err)));
    }, 1500);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions, unitLabel, saId, sessionCount, ceIds, howToWorkByCe, contentsToWorkOn, threadIdea, selectedMethodologyIds, customMethodology, selectedMaterialIds, customMaterial, finalProduct, hasExam, groupNotes, startDate]);

  function resumeDraft(d: ProfiUnitDraft) {
    setSubjectId(d.subjectId);
    setSaId(d.saId ?? '');
    setUnitLabel(d.unitLabel);
    setSessions(d.sessions);
    setRubricStates({});
    setRubricCarouselIndex(0);
    setSessionCount(d.sessionCount);
    setCeIds(new Set(d.ceIds));
    setHowToWorkByCe(d.howToWorkByCe ?? {});
    setContentsToWorkOn(d.contentsToWorkOn ?? '');
    setThreadIdea(d.threadIdea ?? '');
    setSelectedMethodologyIds(new Set(d.methodologyIds ?? []));
    setCustomMethodology(d.customMethodology ?? '');
    setSelectedMaterialIds(new Set(d.materialIds ?? []));
    setCustomMaterial(d.customMaterial ?? '');
    setFinalProduct(d.finalProduct);
    setHasExam(d.hasExam);
    setGroupNotes(d.groupNotes ?? '');
    setStartDate(d.startDate && d.startDate >= todayIso() ? d.startDate : todayIso());
    setDraftId(d.id);
    setSavedCount(null);
    setSavedTargets(null);
    setSavedSaId(null);
    setError('');
    setDraftsOpen(false);
  }

  function discardDraft(id: string) {
    deleteProfiUnitDraft(id).catch(() => {});
    if (draftId === id) setDraftId(null);
  }

  const subject = subjects.find((s) => s.id === subjectId);

  // Índices (dentro de `sessions`) de las sesiones evaluables: son las que
  // tienen panel de rúbrica propio, tanto en la lista normal como en el
  // carrusel cuando hay más de una.
  const evaluatedIndices = useMemo(
    () => (sessions ? sessions.map((s, i) => (s.isEvaluated ? i : -1)).filter((i) => i >= 0) : []),
    [sessions]
  );

  function getRubricState(i: number): RubricGenState {
    return rubricStates[i] ?? emptyRubricState();
  }

  async function generateSessionRubric(i: number) {
    if (!subject || !sessions) return;
    const session = sessions[i];
    setRubricStates((prev) => ({ ...prev, [i]: { ...getRubricState(i), generating: true, error: '' } }));
    try {
      const relevantCe = cePool.filter((ce) => session.ceIds.includes(ce.id));
      const result = await generateRubricFromCurriculum({
        subjectName: subject.name,
        courseLevel: subject.courseLevel,
        activityDescription: [session.evaluationName, session.title, session.description].filter(Boolean).join(' — '),
        competencies: relevantCe.length > 0 ? relevantCe : undefined,
        language,
      });
      setRubricStates((prev) => ({
        ...prev,
        [i]: { ...getRubricState(i), generating: false, rubricName: result.rubricName, criteria: result.criteria },
      }));
    } catch (err) {
      setRubricStates((prev) => ({
        ...prev,
        [i]: { ...getRubricState(i), generating: false, error: err instanceof Error ? err.message : String(err) },
      }));
    }
  }

  function updateRubricCriteria(i: number, criteria: RubricGenState['criteria']) {
    setRubricStates((prev) => ({ ...prev, [i]: { ...getRubricState(i), criteria } }));
  }

  async function approveSessionRubric(i: number) {
    if (!subject || !sessions) return;
    const state = getRubricState(i);
    if (!state.criteria) return;
    const session = sessions[i];
    const target = savedTargets?.[i];
    setRubricStates((prev) => ({ ...prev, [i]: { ...getRubricState(i), approving: true, error: '' } }));
    try {
      if (!activeYear) {
        setRubricStates((prev) => ({ ...prev, [i]: { ...getRubricState(i), approving: false, error: t('profi.tools.exam.noTerm') } }));
        return;
      }
      const terms = getEffectiveTerms(activeYear);
      const dateIso = target ? isoDateForDayInWeek(target.weekStart, target.slot.day) : todayIso();
      const term = termForDate(terms, dateIso) ?? terms[0];
      if (!term) {
        setRubricStates((prev) => ({ ...prev, [i]: { ...getRubricState(i), approving: false, error: t('profi.tools.exam.noTerm') } }));
        return;
      }
      const rubricId = await createRubric(ownerId, schoolYearId, {
        name: state.rubricName || session.evaluationName || session.title,
        subjectId: subject.id,
        criteria: state.criteria.map((c, idx) => ({
          id: `unit-${Date.now()}-${idx}`,
          name: c.name,
          description: c.description,
          weight: c.weight,
          indicators: c.indicators,
          ...(c.ceId ? { ceId: c.ceId } : {}),
        })),
      });
      await createGradebookActivity(ownerId, schoolYearId, {
        subjectId: subject.id,
        termId: term.id,
        name: session.evaluationName || session.title,
        rubricId,
        weight: 100,
        scoreType: 'numeric',
      });
      if (target) {
        await upsertWeeklyPlan(ownerId, schoolYearId, target.slot.id, subject.id, target.weekStart, { rubricId, evaluate: true });
      }
      setRubricStates((prev) => ({ ...prev, [i]: { ...getRubricState(i), approving: false, approved: true } }));
    } catch (err) {
      setRubricStates((prev) => ({
        ...prev,
        [i]: { ...getRubricState(i), approving: false, error: err instanceof Error ? err.message : String(err) },
      }));
    }
  }

  // Genera las rúbricas de todas las sesiones evaluables que aún no tengan
  // una (ni estén ya aprobadas), UNA A UNA en orden — nunca en paralelo, para
  // no lanzar varias peticiones a la vez contra la API de Gemini con la
  // misma clave del docente (podría saturarla o toparse con límites de
  // cuota). Por eso puede tardar varios minutos con muchas sesiones; el
  // aviso previo y el contador de progreso dejan claro que es normal.
  async function generateAllRubrics() {
    if (!sessions) return;
    const pending = evaluatedIndices.filter((i) => {
      const s = getRubricState(i);
      return !s.criteria && !s.approved;
    });
    if (pending.length === 0) return;
    const ok = window.confirm(t('profi.tools.unit.generateAllConfirm', { count: pending.length }));
    if (!ok) return;
    setBulkGenerating(true);
    setBulkProgress({ done: 0, total: pending.length });
    for (const i of pending) {
      // eslint-disable-next-line no-await-in-loop
      await generateSessionRubric(i);
      setBulkProgress((prev) => (prev ? { done: prev.done + 1, total: prev.total } : prev));
    }
    setBulkGenerating(false);
    setBulkProgress(null);
  }

  // Situaciones de Aprendizaje ya existentes de esta asignatura: el docente
  // puede elegir que las sesiones generadas se añadan a una SA existente en
  // vez de crear una nueva, para mantener la programación anual ordenada.
  useEffect(() => {
    setSaId('');
    if (!subject || !ready) { setSaOptions([]); return; }
    return subscribeLearningSituations(ownerId, schoolYearId, subject.id, setSaOptions);
  }, [subject?.id, ready]); // eslint-disable-line react-hooks/exhaustive-deps

  // Catálogo de CE disponibles para esta asignatura, igual que en el
  // generador de exámenes: se resuelve la etapa real de la asignatura (según
  // su curso), no todas las etapas del docente. Se calcula una sola vez el
  // currículum de la etapa para reutilizarlo también en el catálogo de
  // saberes (más abajo, al sugerir saberes/criterios de la SA).
  const curriculum: EtapaCurriculum | null = subject
    ? getCurriculumForSubject(profile?.comunitat ?? 'catalunya', subject.courseLevel, getEffectiveEtapas(profile))
    : null;
  const cePool: UnitCePoolItem[] = [];
  if (subject) {
    for (const area of subject.curriculumAreas ?? []) {
      const areaData = curriculum?.competencies?.[area];
      if (!areaData) continue;
      for (const ce of areaData.competencies) {
        const criteris = Array.isArray(ce.criteris) ? ce.criteris : Object.values(ce.criteris ?? {}).flat();
        cePool.push({ id: ce.id, title: ce.title, description: ce.description, criteris });
      }
    }
  }
  const selectedCe = cePool.filter((ce) => ceIds.has(ce.id));

  const methodologyCount = selectedMethodologyIds.size + (customMethodology.trim() ? 1 : 0);

  function toggleMethodology(id: string) {
    setSelectedMethodologyIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (methodologyCount < MAX_METHODOLOGIES) next.add(id);
      return next;
    });
  }

  const materialCount = selectedMaterialIds.size + (customMaterial.trim() ? 1 : 0);

  function toggleMaterial(id: string) {
    setSelectedMaterialIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (materialCount < MAX_MATERIALS) next.add(id);
      return next;
    });
  }

  async function handleGenerate() {
    if (!subject || !finalProduct.trim()) return;
    setLoading(true);
    setError('');
    setUnitLabel('');
    setSessions(null);
    setSavedCount(null);
    setSavedTargets(null);
    setSavedSaId(null);
    setObjectives('');
    setSabers('');
    setCriteriaText('');
    setMethodologyText('');
    setResourcesText('');
    setSaFieldsSaved(false);
    try {
      const competencies: PlanUnitCompetencyInput[] = selectedCe.map((ce) => ({
        id: ce.id,
        title: ce.title,
        description: ce.description,
        ...(howToWorkByCe[ce.id]?.trim() ? { howToWork: howToWorkByCe[ce.id].trim() } : {}),
      }));
      const methodologies = [...selectedMethodologyIds].map((id) => t(`profi.tools.unit.methodology.${id}`));
      if (customMethodology.trim()) methodologies.push(customMethodology.trim());
      const materialTypes = [...selectedMaterialIds].map((id) => t(`profi.tools.unit.material.${id}`));
      if (customMaterial.trim()) materialTypes.push(customMaterial.trim());
      const result = await planLearningUnit({
        subjectName: subject.name,
        courseLevel: subject.courseLevel,
        sessionCount,
        competencies,
        contentsToWorkOn: contentsToWorkOn.trim() || undefined,
        threadIdea: threadIdea.trim() || undefined,
        methodologies: methodologies.slice(0, MAX_METHODOLOGIES),
        materialTypes: materialTypes.slice(0, MAX_MATERIALS),
        finalProduct: finalProduct.trim(),
        hasExam,
        groupNotes: groupNotes.trim() || undefined,
        language,
      });
      // Si el docente ha elegido una SA existente, las sesiones se etiquetan
      // con su nombre real (no con el título que Profi acaba de inventar),
      // para que la programación anual quede coherente con esa SA.
      const existingSaName = saId ? saOptions.find((s) => s.id === saId)?.name : undefined;
      setUnitLabel(existingSaName ?? result.unitLabel);
      setSessions(result.sessions);
      setRubricStates({});
      setRubricCarouselIndex(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!subject || !sessions || !ready) return;
    setSaving(true);
    setError('');
    try {
      const allSlots = await onceFromSubscribe<TimetableSlot[]>((cb) => subscribeTimetable(ownerId, schoolYearId, cb));
      const subjectSlots = allSlots
        .filter((s) => s.subjectId === subject.id)
        .sort((a, b) => (a.day - b.day) || a.startTime.localeCompare(b.startTime));
      if (subjectSlots.length === 0) {
        setError(t('profi.tools.unit.noSlots'));
        return;
      }
      // A partir de qué fecha se reparten las sesiones: por defecto hoy,
      // pero el docente puede elegir una fecha futura (p.ej. si esta SA no
      // le viene bien empezarla ahora mismo). Si por lo que sea la fecha
      // guardada quedó en el pasado (borrador antiguo, etc.), no se aplican
      // sesiones a días que ya han pasado.
      const today = todayIso();
      const effectiveStart = startDate && startDate > today ? startDate : today;
      const targets: { weekStart: string; slot: TimetableSlot }[] = [];
      let weekStart = getWeekStart(parseISO(effectiveStart));
      let guard = 0;
      while (targets.length < sessions.length && guard < 30) {
        for (const slot of subjectSlots) {
          if (targets.length >= sessions.length) break;
          const iso = isoDateForDayInWeek(weekStart, slot.day);
          if (iso >= effectiveStart) targets.push({ weekStart, slot });
        }
        weekStart = shiftWeek(weekStart, 1);
        guard += 1;
      }
      // Las sesiones generadas se agrupan como una Situación de Aprendizaje
      // real (no solo una etiqueta de texto), para que aparezcan agrupadas
      // en Programación anual con sus objetivos/metodología/recursos propios.
      // Si el docente eligió una SA existente, se reutiliza (y se renombra
      // si ha editado el título); si no, se crea una SA nueva.
      let targetSaId: string;
      if (saId) {
        targetSaId = saId;
        const existingName = saOptions.find((s) => s.id === saId)?.name;
        if (unitLabel.trim() && existingName !== unitLabel.trim()) {
          await updateLearningSituation(saId, { name: unitLabel.trim() });
        }
      } else {
        targetSaId = await createLearningSituation(ownerId, schoolYearId, subject.id, unitLabel);
      }
      await Promise.all(
        targets.map(({ weekStart: ws, slot }, i) =>
          upsertWeeklyPlan(ownerId, schoolYearId, slot.id, subject.id, ws, {
            title: sessions[i].title,
            description: sessions[i].description,
            driveAttachments: [],
            rubric: [],
            evaluate: false,
            status: 'planned',
            saId: targetSaId,
          })
        )
      );
      setSavedTargets(targets);
      setSavedCount(targets.length);
      setSavedSaId(targetSaId);

      // Prerellenar metodología/recursos con lo ya marcado en el formulario,
      // salvo que sea una SA existente que ya tuviera su propio texto en ese
      // campo (entonces se deja vacío para no pisarlo sin querer).
      const existingSituation = saId ? saOptions.find((s) => s.id === saId) : undefined;
      const methodologies = [...selectedMethodologyIds].map((id) => t(`profi.tools.unit.methodology.${id}`));
      if (customMethodology.trim()) methodologies.push(customMethodology.trim());
      const materialTypes = [...selectedMaterialIds].map((id) => t(`profi.tools.unit.material.${id}`));
      if (customMaterial.trim()) materialTypes.push(customMaterial.trim());
      if (!existingSituation?.methodology?.trim() && methodologies.length > 0) {
        setMethodologyText(methodologies.join('\n'));
      }
      if (!existingSituation?.resources?.trim() && materialTypes.length > 0) {
        setResourcesText(materialTypes.join('\n'));
      }
      // Ya está incorporada a la programación semanal como SA real: el
      // borrador ha cumplido su función y se elimina para no dejarlo
      // colgando en la lista de "pendientes".
      if (draftId) {
        deleteProfiUnitDraft(draftId).catch(() => {});
        setDraftId(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  }

  function updateSession(i: number, patch: Partial<PlannedUnitSession>) {
    setSessions((prev) => (prev ? prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)) : prev));
  }

  // Objetivos, saberes y criterios de evaluación sugeridos DESPUÉS de guardar
  // la SA: se basan en las sesiones finales (incluyendo cualquier edición
  // que haya hecho el docente sobre lo generado por Profi), nunca se
  // escriben solos — el docente los revisa/edita aquí y decide si guardarlos
  // en la Situación de Aprendizaje.
  async function handleGenerateObjectives() {
    if (!subject || !sessions) return;
    setGeneratingObjectives(true);
    setSaError('');
    try {
      const result = await generateSaObjectives({
        subjectName: subject.name,
        courseLevel: subject.courseLevel,
        saName: unitLabel,
        sessions: sessions.map((s) => ({ title: s.title, description: s.description })),
        pgaObjectives: subject.pgaObjectives,
        language,
      });
      setObjectives(result);
    } catch (err) {
      setSaError(err instanceof Error ? err.message : String(err));
    } finally {
      setGeneratingObjectives(false);
    }
  }

  async function handleGenerateSabersCriteria() {
    if (!subject || !sessions) return;
    setGeneratingSabers(true);
    setSaError('');
    try {
      const sabersCatalog = getSubjectSaberCatalog(subject, curriculum);
      const result = await generateSaSabersCriteria({
        subjectName: subject.name,
        courseLevel: subject.courseLevel,
        saName: unitLabel,
        sessions: sessions.map((s) => ({ title: s.title, description: s.description })),
        competencies: selectedCe.map((ce) => ({ id: ce.id, title: ce.title, description: ce.description, criteris: ce.criteris })),
        sabersCatalog: sabersCatalog.length > 0 ? sabersCatalog : undefined,
        language,
      });
      setSabers(result.sabers);
      setCriteriaText(result.criteria);
    } catch (err) {
      setSaError(err instanceof Error ? err.message : String(err));
    } finally {
      setGeneratingSabers(false);
    }
  }

  async function handleSaveSaFields() {
    if (!savedSaId) return;
    setSavingSaFields(true);
    setSaError('');
    try {
      const patch: { objectives?: string; sabers?: string; evaluationCriteria?: string; methodology?: string; resources?: string } = {};
      if (objectives.trim()) patch.objectives = objectives.trim();
      if (sabers.trim()) patch.sabers = sabers.trim();
      if (criteriaText.trim()) patch.evaluationCriteria = criteriaText.trim();
      if (methodologyText.trim()) patch.methodology = methodologyText.trim();
      if (resourcesText.trim()) patch.resources = resourcesText.trim();
      if (Object.keys(patch).length === 0) return;
      await updateLearningSituation(savedSaId, patch);
      setSaFieldsSaved(true);
    } catch (err) {
      setSaError(err instanceof Error ? err.message : String(err));
    } finally {
      setSavingSaFields(false);
    }
  }

  return (
    <ToolLayout title={t('profi.tools.unit.title')} onClose={onClose} loading={loading} subjectsEmpty={subjects.length === 0} wide>
      {drafts.length > 0 && (
        <Button variant="ghost" size="sm" onClick={() => setDraftsOpen((v) => !v)} className="self-start">
          {t('profi.tools.unit.draftsButton', { count: drafts.length })}
        </Button>
      )}

      {draftsError && <ErrorText message={draftsError} />}

      {draftsOpen && drafts.length > 0 && (
        <div className="flex flex-col gap-1.5 rounded-xl p-2.5" style={{ background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
          <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{t('profi.tools.unit.draftsTitle')}</p>
          {drafts.map((d) => {
            const draftSubject = subjects.find((s) => s.id === d.subjectId);
            return (
              <div key={d.id} className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div className="min-w-0 flex flex-col">
                  <span className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{d.unitLabel || t('profi.tools.unit.draftUntitled')}</span>
                  {draftSubject && <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{subjectDisplayName(draftSubject)}</span>}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => resumeDraft(d)}>{t('profi.tools.unit.draftResume')}</Button>
                  <Button variant="ghost" size="sm" onClick={() => discardDraft(d.id)}>{t('profi.tools.unit.draftDiscard')}</Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <SubjectSelect subjects={subjects} value={subjectId} onChange={setSubjectId} label={t('profi.tools.subject')} />

      {saOptions.length > 0 && (
        <Select label={t('profi.tools.unit.saLabel')} value={saId} onChange={(e) => setSaId(e.target.value)}>
          <option value="">{t('profi.tools.unit.saNew')}</option>
          {saOptions.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </Select>
      )}
      {saId && (
        <p className="text-xs -mt-1.5" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.unit.saHint')}</p>
      )}

      <Input
        label={t('profi.tools.unit.sessionCount')}
        type="number"
        min={1}
        max={20}
        value={sessionCount}
        onChange={(e) => setSessionCount(Math.min(20, Math.max(1, Number(e.target.value) || 1)))}
      />
      <p className="text-xs -mt-1.5" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.unit.sessionCountHint')}</p>

      <TagMultiSelect
        label={t('profi.tools.unit.ceLabel')}
        options={cePool.map((ce) => ({ key: ce.id, label: `${ce.id}. ${ce.title}`, hint: ce.description }))}
        selected={ceIds}
        onChange={setCeIds}
        placeholder={t('profi.tools.unit.cePlaceholder')}
      />

      {selectedCe.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.unit.howToWorkLabel')}</p>
          {selectedCe.map((ce) => (
            <div key={ce.id} className="rounded-xl p-2" style={{ background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{ce.id}. {ce.title}</p>
              <Textarea
                value={howToWorkByCe[ce.id] ?? ''}
                onChange={(e) => setHowToWorkByCe((prev) => ({ ...prev, [ce.id]: e.target.value }))}
                placeholder={t('profi.tools.unit.howToWorkPlaceholder')}
                rows={2}
              />
            </div>
          ))}
        </div>
      )}

      <Textarea
        label={t('profi.tools.unit.contentsToWorkOn')}
        value={contentsToWorkOn}
        onChange={(e) => setContentsToWorkOn(e.target.value)}
        placeholder={t('profi.tools.unit.contentsToWorkOnPlaceholder')}
        rows={2}
      />
      <p className="text-xs -mt-1.5" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.unit.contentsToWorkOnHint')}</p>

      <Textarea
        label={t('profi.tools.unit.threadIdea')}
        value={threadIdea}
        onChange={(e) => setThreadIdea(e.target.value)}
        placeholder={t('profi.tools.unit.threadIdeaPlaceholder')}
        rows={2}
      />

      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
          {t('profi.tools.unit.methodologyLabel')} ({methodologyCount}/{MAX_METHODOLOGIES})
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {UNIT_METHODOLOGY_IDS.map((id) => {
            const checked = selectedMethodologyIds.has(id);
            const disabled = !checked && methodologyCount >= MAX_METHODOLOGIES;
            return (
              <label
                key={id}
                className="flex items-center gap-2 text-xs rounded-lg px-2 py-1.5 cursor-pointer"
                style={{
                  opacity: disabled ? 0.5 : 1,
                  background: checked ? 'var(--bg-input)' : 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
              >
                <input type="checkbox" checked={checked} disabled={disabled} onChange={() => toggleMethodology(id)} />
                {t(`profi.tools.unit.methodology.${id}`)}
              </label>
            );
          })}
        </div>
        <Input
          label={t('profi.tools.unit.methodologyOther')}
          value={customMethodology}
          onChange={(e) => setCustomMethodology(e.target.value)}
          placeholder={t('profi.tools.unit.methodologyOtherPlaceholder')}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
          {t('profi.tools.unit.materialTypesLabel')} ({materialCount}/{MAX_MATERIALS})
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {UNIT_MATERIAL_IDS.map((id) => {
            const checked = selectedMaterialIds.has(id);
            const disabled = !checked && materialCount >= MAX_MATERIALS;
            return (
              <label
                key={id}
                className="flex items-center gap-2 text-xs rounded-lg px-2 py-1.5 cursor-pointer"
                style={{
                  opacity: disabled ? 0.5 : 1,
                  background: checked ? 'var(--bg-input)' : 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
              >
                <input type="checkbox" checked={checked} disabled={disabled} onChange={() => toggleMaterial(id)} />
                {t(`profi.tools.unit.material.${id}`)}
              </label>
            );
          })}
        </div>
        <Input
          label={t('profi.tools.unit.materialOther')}
          value={customMaterial}
          onChange={(e) => setCustomMaterial(e.target.value)}
          placeholder={t('profi.tools.unit.materialOtherPlaceholder')}
        />
      </div>

      <Input
        label={t('profi.tools.unit.finalProduct')}
        value={finalProduct}
        onChange={(e) => setFinalProduct(e.target.value)}
        placeholder={t('profi.tools.unit.finalProductPlaceholder')}
      />

      <label className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-primary)' }}>
        <input type="checkbox" checked={hasExam} onChange={(e) => setHasExam(e.target.checked)} />
        {t('profi.tools.unit.hasExam')}
      </label>

      <Textarea
        label={t('profi.tools.unit.groupNotes')}
        value={groupNotes}
        onChange={(e) => setGroupNotes(e.target.value)}
        placeholder={t('profi.tools.unit.groupNotesPlaceholder')}
        rows={2}
      />
      <p className="text-xs -mt-1.5" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.unit.groupNotesHint')}</p>

      <Button onClick={handleGenerate} disabled={loading || !finalProduct.trim() || !subject} className="self-start">
        {loading ? t('profi.tools.generating') : t('profi.tools.generate')}
      </Button>

      {error && <ErrorText message={error} />}

      {sessions && (
        <>
          <Input value={unitLabel} onChange={(e) => setUnitLabel(e.target.value)} className="font-semibold" />
          <div className="flex flex-col gap-2">
            {sessions.map((s, i) => (
              <div key={i} className="rounded-xl p-2.5 flex flex-col gap-1.5" style={{ background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="text-[10px] font-semibold uppercase rounded-full px-2 py-0.5 bg-accent-light text-accent"
                  >
                    {t(`profi.tools.unit.phase.${s.phase}`)}
                  </span>
                  {s.ceIds.length > 0 && (
                    <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{s.ceIds.join(', ')}</span>
                  )}
                </div>
                <Input value={s.title} onChange={(e) => updateSession(i, { title: e.target.value })} />
                <Textarea value={s.description} onChange={(e) => updateSession(i, { description: e.target.value })} rows={2} />
                <label className="flex items-center gap-2 text-xs mt-0.5" style={{ color: 'var(--text-primary)' }}>
                  <input
                    type="checkbox"
                    checked={s.isEvaluated}
                    onChange={(e) => updateSession(i, { isEvaluated: e.target.checked })}
                  />
                  {t('profi.tools.unit.isEvaluated')}
                </label>
                {s.isEvaluated && (
                  <Input
                    value={s.evaluationName ?? ''}
                    onChange={(e) => updateSession(i, { evaluationName: e.target.value })}
                    placeholder={t('profi.tools.unit.evaluationNamePlaceholder')}
                  />
                )}
              </div>
            ))}
          </div>

          {savedCount !== null ? (
            <p className="text-xs font-medium" style={{ color: 'var(--accent-text)' }}>{t('profi.tools.unit.saved', { count: savedCount })}</p>
          ) : (
            <>
              <Input
                type="date"
                label={t('profi.tools.unit.startDate')}
                value={startDate}
                min={todayIso()}
                onChange={(e) => { if (e.target.value) setStartDate(e.target.value); }}
              />
              <p className="text-xs -mt-1.5" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.unit.startDateHint')}</p>
              <Button onClick={handleSave} disabled={saving} className="self-start">
                {saving ? t('profi.tools.exam.saving') : t('profi.tools.unit.save')}
              </Button>
            </>
          )}

          {savedCount !== null && savedTargets && evaluatedIndices.length > 0 && (
            <div className="flex flex-col gap-2 mt-1">
              <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{t('profi.tools.unit.rubricsSectionTitle')}</p>
              <p className="text-xs -mt-1" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.unit.rubricsSectionHint')}</p>

              {evaluatedIndices.length > 1 && (
                <div className="flex flex-col gap-1.5">
                  <Button variant="ghost" size="sm" onClick={generateAllRubrics} disabled={bulkGenerating} className="self-start">
                    {bulkGenerating
                      ? t('profi.tools.unit.generatingAllProgress', { done: bulkProgress?.done ?? 0, total: bulkProgress?.total ?? 0 })
                      : t('profi.tools.unit.generateAllRubrics')}
                  </Button>
                  {bulkGenerating && (
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <IconRefresh size={13} className="animate-spin" />
                      {t('profi.tools.unit.generatingAllHint')}
                    </div>
                  )}
                </div>
              )}

              {evaluatedIndices.length > 1 ? (
                (() => {
                  const clampedIndex = Math.min(rubricCarouselIndex, evaluatedIndices.length - 1);
                  const i = evaluatedIndices[clampedIndex];
                  return (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setRubricCarouselIndex((idx) => Math.max(0, idx - 1))}
                          disabled={clampedIndex === 0}
                          className="p-1.5 rounded-full disabled:opacity-30"
                          style={{ background: 'var(--bg-input)', border: '1px solid var(--border)' }}
                          aria-label={t('profi.tools.unit.rubricPrev')}
                        >
                          <IconChevronLeft size={16} />
                        </button>
                        <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                          {t('profi.tools.unit.rubricOfTotal', { current: clampedIndex + 1, total: evaluatedIndices.length })}
                        </p>
                        <button
                          type="button"
                          onClick={() => setRubricCarouselIndex((idx) => Math.min(evaluatedIndices.length - 1, idx + 1))}
                          disabled={clampedIndex === evaluatedIndices.length - 1}
                          className="p-1.5 rounded-full disabled:opacity-30"
                          style={{ background: 'var(--bg-input)', border: '1px solid var(--border)' }}
                          aria-label={t('profi.tools.unit.rubricNext')}
                        >
                          <IconChevronRight size={16} />
                        </button>
                      </div>
                      <SessionRubricPanel
                        session={sessions![i]}
                        state={getRubricState(i)}
                        onGenerate={() => generateSessionRubric(i)}
                        onChangeCriteria={(criteria) => updateRubricCriteria(i, criteria)}
                        onApprove={() => approveSessionRubric(i)}
                      />
                    </div>
                  );
                })()
              ) : (
                <SessionRubricPanel
                  session={sessions![evaluatedIndices[0]]}
                  state={getRubricState(evaluatedIndices[0])}
                  onGenerate={() => generateSessionRubric(evaluatedIndices[0])}
                  onChangeCriteria={(criteria) => updateRubricCriteria(evaluatedIndices[0], criteria)}
                  onApprove={() => approveSessionRubric(evaluatedIndices[0])}
                />
              )}
            </div>
          )}

          {savedCount !== null && savedSaId && (
            <div className="flex flex-col gap-2 mt-1">
              <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{t('profi.tools.unit.saFieldsTitle')}</p>
              <p className="text-xs -mt-1" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.unit.saFieldsHint')}</p>

              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.unit.objectivesLabel')}</p>
                <Button variant="ghost" size="sm" onClick={handleGenerateObjectives} disabled={generatingObjectives}>
                  {generatingObjectives ? t('profi.tools.generating') : t('profi.tools.unit.generateObjectives')}
                </Button>
              </div>
              {objectives && <Textarea value={objectives} onChange={(e) => setObjectives(e.target.value)} rows={3} />}

              {(methodologyText || resourcesText) && (
                <>
                  <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.unit.methodologyResourcesLabel')}</p>
                  {methodologyText && (
                    <Textarea label={t('profi.tools.unit.methodologyLabel')} value={methodologyText} onChange={(e) => setMethodologyText(e.target.value)} rows={3} />
                  )}
                  {resourcesText && (
                    <Textarea label={t('profi.tools.unit.resourcesLabel')} value={resourcesText} onChange={(e) => setResourcesText(e.target.value)} rows={3} />
                  )}
                </>
              )}

              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.unit.sabersCriteriaLabel')}</p>
                <Button variant="ghost" size="sm" onClick={handleGenerateSabersCriteria} disabled={generatingSabers}>
                  {generatingSabers ? t('profi.tools.generating') : t('profi.tools.unit.generateSabersCriteria')}
                </Button>
              </div>
              {sabers && <Textarea label={t('profi.tools.unit.sabersLabel')} value={sabers} onChange={(e) => setSabers(e.target.value)} rows={3} />}
              {criteriaText && (
                <Textarea label={t('profi.tools.unit.criteriaLabel')} value={criteriaText} onChange={(e) => setCriteriaText(e.target.value)} rows={3} />
              )}

              {saError && <ErrorText message={saError} />}

              {(objectives || sabers || criteriaText || methodologyText || resourcesText) && (
                saFieldsSaved ? (
                  <p className="text-xs font-medium" style={{ color: 'var(--accent-text)' }}>{t('profi.tools.unit.saFieldsSaved')}</p>
                ) : (
                  <Button onClick={handleSaveSaFields} disabled={savingSaFields} className="self-start">
                    {savingSaFields ? t('profi.tools.exam.saving') : t('profi.tools.unit.saveSaFields')}
                  </Button>
                )
              )}
            </div>
          )}
        </>
      )}
    </ToolLayout>
  );
}

// Panel de rúbrica por sesión evaluable: genera la propuesta con "nuestro
// método" (misma Cloud Function que el resto de la app), la deja editable, y
// solo la persiste (rúbrica + columna en Notas + enlace en la programación
// semanal) cuando el docente aprueba explícitamente — nunca antes.
/**
 * Puramente presentacional: todo el estado (criterios, generando,
 * aprobado...) vive en PlanUnitTool (ver `rubricStates`), para poder
 * generar todas las rúbricas en bloque y navegarlas en un carrusel sin que
 * cada panel sea una isla de estado independiente.
 */
function SessionRubricPanel({
  session, state, onGenerate, onChangeCriteria, onApprove,
}: {
  session: PlannedUnitSession;
  state: RubricGenState;
  onGenerate: () => void;
  onChangeCriteria: (criteria: NonNullable<RubricGenState['criteria']>) => void;
  onApprove: () => void;
}) {
  const { t } = useTranslation();
  const { generating, error, criteria, approving, approved } = state;

  return (
    <div className="rounded-xl p-2.5 flex flex-col gap-2" style={{ background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{session.evaluationName || session.title}</p>

      {!criteria && !approved && (
        <div className="flex flex-col gap-1.5">
          <Button variant="ghost" size="sm" onClick={onGenerate} disabled={generating} className="self-start">
            {generating ? t('profi.tools.generating') : t('profi.tools.unit.generateRubric')}
          </Button>
          {generating && (
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <IconRefresh size={13} className="animate-spin" />
              {t('profi.tools.unit.generatingHint')}
            </div>
          )}
        </div>
      )}

      {error && <ErrorText message={error} />}

      {criteria && !approved && (
        <>
          <RubricCriteriaEditor
            criteria={criteria}
            onChange={onChangeCriteria}
            newCriterion={() => ({ name: '', description: '', weight: 0, indicators: ['', '', '', ''] as [string, string, string, string] })}
          />
          <Button size="sm" onClick={onApprove} disabled={approving} className="self-start">
            {approving ? t('profi.tools.exam.saving') : t('profi.tools.unit.approveRubric')}
          </Button>
        </>
      )}

      {approved && (
        <p className="text-xs font-medium" style={{ color: 'var(--accent-text)' }}>{t('profi.tools.unit.rubricSaved')}</p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// 3) Analizar resultados de una clase
// ---------------------------------------------------------------------

function AnalyzeClassTool({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const { ownerId, schoolYearId, ready, language, subjects } = useOwnerContext();
  const { activeYear } = useSchoolYears();
  const [subjectId, setSubjectId] = useState('');
  const [termId, setTermId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState('');
  const [ceRows, setCeRows] = useState<{ ceName: string; average: number }[]>([]);
  const [noData, setNoData] = useState(false);

  const terms = useMemo(() => (activeYear ? getEffectiveTerms(activeYear) : []), [activeYear]);

  useEffect(() => {
    if (!subjectId && subjects.length > 0) setSubjectId(subjects[0].id);
  }, [subjects, subjectId]);

  useEffect(() => {
    if (terms.length === 0) return;
    if (!terms.some((term) => term.id === termId)) {
      setTermId((termForDate(terms, todayIso()) ?? terms[0]).id);
    }
  }, [terms, termId]);

  const subject = subjects.find((s) => s.id === subjectId);

  async function handleAnalyze() {
    if (!subject || !termId || !ready) return;
    setLoading(true);
    setError('');
    setSummary('');
    setCeRows([]);
    setNoData(false);
    try {
      const [activities, rubrics, entries, allStudents] = await Promise.all([
        getGradebookActivitiesOnce(ownerId, schoolYearId, subject.id, termId),
        getRubricsOnce(ownerId, schoolYearId),
        getGradeEntriesOnce(ownerId, schoolYearId, subject.id, termId),
        onceFromSubscribe<Student[]>((cb) => subscribeStudents(ownerId, schoolYearId, cb)),
      ]);
      if (activities.length === 0 || entries.length === 0) {
        setNoData(true);
        return;
      }
      const rubricsById = new Map<string, Rubric>(rubrics.map((r) => [r.id, r]));
      const students = allStudents.filter((s) => s.groupId === subject.studentGroupId);
      const studentsById = new Map(students.map((s) => [s.id, s]));

      // Agrupa actividades por CE, igual que en Notas: solo cuenta como
      // "columna de CE" si TODOS los criterios evaluados de esa actividad
      // comparten la misma ceId.
      type ColGroup = { ceName: string; activities: { activityId: string; weight: number; scoreType: GradebookActivity['scoreType'] }[] };
      const groups = new Map<string, ColGroup>();
      for (const activity of activities) {
        const rubric = rubricsById.get(activity.rubricId);
        if (!rubric) continue;
        const criteria = activity.criterionIds && activity.criterionIds.length > 0
          ? rubric.criteria.filter((c) => activity.criterionIds!.includes(c.id))
          : rubric.criteria;
        if (criteria.length === 0) continue;
        const firstCe = criteria[0].ceId;
        const sameCe = firstCe && criteria.every((c) => c.ceId === firstCe);
        if (!sameCe) continue;
        const ceName = criteria[0].ceName ?? firstCe!;
        const key = `ce:${firstCe}`;
        if (!groups.has(key)) groups.set(key, { ceName, activities: [] });
        groups.get(key)!.activities.push({ activityId: activity.id, weight: activity.weight, scoreType: activity.scoreType });
      }

      const entriesByStudentActivity = new Map<string, typeof entries[number]>();
      for (const entry of entries) {
        if (entry.activityId) entriesByStudentActivity.set(`${entry.studentId}:${entry.activityId}`, entry);
      }

      const ceStats: { ceName: string; average: number; strugglingCount: number; totalCount: number }[] = [];
      const weakByStudent = new Map<string, string[]>();
      const allValues: number[] = [];

      for (const group of groups.values()) {
        const values: { studentId: string; value: number }[] = [];
        for (const student of students) {
          const items = group.activities
            .map((a) => {
              const entry = entriesByStudentActivity.get(`${student.id}:${a.activityId}`);
              if (!entry) return null;
              return { finalScore: entry.finalScore, qualitativeLevel: entry.qualitativeLevel, weight: a.weight, scoreType: a.scoreType };
            })
            .filter((x): x is NonNullable<typeof x> => x !== null);
          if (items.length === 0) continue;
          const blended = computeBlendedGrade(items);
          if (!blended) continue;
          const value = blended.type === 'numeric' ? blended.value : { NA: 2.5, AS: 6, AN: 8, AE: 9.5 }[blended.value];
          values.push({ studentId: student.id, value });
          allValues.push(value);
          if (value < 5) {
            const list = weakByStudent.get(student.id) ?? [];
            list.push(group.ceName);
            weakByStudent.set(student.id, list);
          }
        }
        if (values.length === 0) continue;
        const average = values.reduce((s, v) => s + v.value, 0) / values.length;
        ceStats.push({
          ceName: group.ceName,
          average,
          strugglingCount: values.filter((v) => v.value < 5).length,
          totalCount: values.length,
        });
      }

      if (ceStats.length === 0) {
        setNoData(true);
        return;
      }

      const overallAverage = allValues.length > 0 ? allValues.reduce((s, v) => s + v, 0) / allValues.length : undefined;
      const strugglingStudents = [...weakByStudent.entries()]
        .slice(0, 8)
        .map(([studentId, weakCe]) => {
          const student = studentsById.get(studentId);
          return { name: student ? `${student.firstName} ${student.lastName.charAt(0)}.` : '?', weakCe };
        });

      const text = await summarizeClassResults({
        subjectName: subject.name,
        courseLevel: subject.courseLevel,
        groupName: subject.group,
        overallAverage,
        ceStats: ceStats.map(({ ceName, average, strugglingCount, totalCount }) => ({ ceName, average, strugglingCount, totalCount })),
        strugglingStudents,
        language,
      });
      setSummary(text);
      setCeRows(ceStats.map((c) => ({ ceName: c.ceName, average: c.average })));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolLayout title={t('profi.tools.analyze.title')} onClose={onClose} loading={loading} subjectsEmpty={subjects.length === 0}>
      <SubjectSelect subjects={subjects} value={subjectId} onChange={setSubjectId} label={t('profi.tools.subject')} />
      <Select label={t('profi.tools.analyze.term')} value={termId} onChange={(e) => setTermId(e.target.value)}>
        {terms.map((term) => <option key={term.id} value={term.id}>{term.name}</option>)}
      </Select>
      <Button onClick={handleAnalyze} disabled={loading || !subject || !termId} className="self-start">
        {loading ? t('profi.tools.generating') : t('profi.tools.generate')}
      </Button>

      {error && <ErrorText message={error} />}
      {noData && <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.analyze.noData')}</p>}

      {summary && (
        <>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.analyze.ceStats')}</p>
            <CopyButton text={summary} />
          </div>
          <ul className="text-xs flex flex-col gap-1 mb-1" style={{ color: 'var(--text-secondary)' }}>
            {ceRows.map((r, i) => <li key={i}>· {r.ceName}: {r.average.toFixed(1)}/10</li>)}
          </ul>
          <ResultBox text={summary} />
        </>
      )}
    </ToolLayout>
  );
}

// ---------------------------------------------------------------------
// 4) Sugerir adaptaciones para un alumno
// ---------------------------------------------------------------------

function SuggestAdaptationTool({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const { ownerId, schoolYearId, ready, language, subjects } = useOwnerContext();
  const [subjectId, setSubjectId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [activityId, setActivityId] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [adaptedStudents, setAdaptedStudents] = useState<{ student: Student; adaptation: StudentAdaptation }[]>([]);
  const [activities, setActivities] = useState<GradebookActivity[]>([]);

  useEffect(() => {
    if (!subjectId && subjects.length > 0) setSubjectId(subjects[0].id);
  }, [subjects, subjectId]);

  const subject = subjects.find((s) => s.id === subjectId);

  useEffect(() => {
    if (!subject || !ready) return;
    setLoadingOptions(true);
    setSuggestions('');
    setError('');
    (async () => {
      const [adaptations, allStudents, acts] = await Promise.all([
        onceFromSubscribe<StudentAdaptation[]>((cb) => subscribeStudentAdaptations(ownerId, subject.id, cb)),
        onceFromSubscribe<Student[]>((cb) => subscribeStudents(ownerId, schoolYearId, cb)),
        getGradebookActivitiesForSubjectOnce(ownerId, schoolYearId, subject.id),
      ]);
      const studentsById = new Map(allStudents.filter((s) => s.groupId === subject.studentGroupId).map((s) => [s.id, s]));
      const pairs = adaptations
        .filter((a) => a.hasAdaptation && studentsById.has(a.studentId))
        .map((a) => ({ student: studentsById.get(a.studentId)!, adaptation: a }));
      setAdaptedStudents(pairs);
      setActivities(acts);
      setStudentId(pairs[0]?.student.id ?? '');
      setActivityId(acts[0]?.id ?? '');
      setLoadingOptions(false);
    })();
  }, [subject?.id, ready]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSuggest() {
    if (!subject || !studentId || !activityId) return;
    setLoading(true);
    setError('');
    setSuggestions('');
    try {
      const activity = activities.find((a) => a.id === activityId);
      const pair = adaptedStudents.find((p) => p.student.id === studentId);
      if (!activity || !pair) return;
      const rubrics = await getRubricsOnce(ownerId, schoolYearId);
      const generalRubric = rubrics.find((r) => r.id === activity.rubricId);
      const generalCriteria = generalRubric
        ? (activity.criterionIds && activity.criterionIds.length > 0
          ? generalRubric.criteria.filter((c) => activity.criterionIds!.includes(c.id))
          : generalRubric.criteria)
        : [];
      const adaptedRubric = pair.adaptation.adaptedRubricId
        ? rubrics.find((r) => r.id === pair.adaptation.adaptedRubricId)
        : undefined;
      const text = await suggestAdaptation({
        subjectName: subject.name,
        courseLevel: subject.courseLevel,
        studentFirstName: pair.student.firstName,
        activityName: activity.name,
        generalCriteria: generalCriteria.map((c) => ({ name: c.name, description: c.description, indicators: c.indicators })),
        adaptedCriteria: adaptedRubric?.criteria.map((c) => ({ name: c.name, description: c.description, indicators: c.indicators })),
        language,
      });
      setSuggestions(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolLayout title={t('profi.tools.adapt.title')} onClose={onClose} loading={loading || loadingOptions} subjectsEmpty={subjects.length === 0}>
      <SubjectSelect subjects={subjects} value={subjectId} onChange={setSubjectId} label={t('profi.tools.subject')} />

      {!loadingOptions && adaptedStudents.length === 0 && (
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.adapt.noStudents')}</p>
      )}
      {!loadingOptions && adaptedStudents.length > 0 && activities.length === 0 && (
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.adapt.noActivities')}</p>
      )}

      {!loadingOptions && adaptedStudents.length > 0 && activities.length > 0 && (
        <>
          <Select label={t('profi.tools.adapt.student')} value={studentId} onChange={(e) => setStudentId(e.target.value)}>
            {adaptedStudents.map(({ student }) => (
              <option key={student.id} value={student.id}>{student.firstName} {student.lastName}</option>
            ))}
          </Select>
          <Select label={t('profi.tools.adapt.activity')} value={activityId} onChange={(e) => setActivityId(e.target.value)}>
            {activities.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
          </Select>
          <Button onClick={handleSuggest} disabled={loading} className="self-start">
            {loading ? t('profi.tools.generating') : t('profi.tools.generate')}
          </Button>
        </>
      )}

      {error && <ErrorText message={error} />}

      {suggestions && (
        <>
          <div className="flex justify-end"><CopyButton text={suggestions} /></div>
          <ResultBox text={suggestions} />
        </>
      )}
    </ToolLayout>
  );
}

// ---------------------------------------------------------------------
// 5) Redactar comunicados a familias
// ---------------------------------------------------------------------

function DraftFamilyMessageTool({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const { language, subjects } = useOwnerContext();
  const [messageType, setMessageType] = useState<FamilyMessageType>('circular');
  const [subjectId, setSubjectId] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [draft, setDraft] = useState('');

  const subject = subjects.find((s) => s.id === subjectId);

  async function handleGenerate() {
    if (!keyPoints.trim()) return;
    setLoading(true);
    setError('');
    setDraft('');
    try {
      const text = await draftFamilyMessage({
        messageType,
        subjectName: subject?.name,
        groupName: subject?.group,
        keyPoints,
        language,
      });
      setDraft(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolLayout title={t('profi.tools.family.title')} onClose={onClose} loading={loading} subjectsEmpty={false}>
      <Select label={t('profi.tools.family.type')} value={messageType} onChange={(e) => setMessageType(e.target.value as FamilyMessageType)}>
        <option value="meeting">{t('profi.tools.family.typeMeeting')}</option>
        <option value="circular">{t('profi.tools.family.typeCircular')}</option>
        <option value="notice">{t('profi.tools.family.typeNotice')}</option>
      </Select>
      <Select label={t('profi.tools.family.optionalSubject')} value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
        <option value="">{t('profi.tools.family.none')}</option>
        {subjects.map((s) => <option key={s.id} value={s.id}>{subjectDisplayName(s)}</option>)}
      </Select>
      <Textarea
        label={t('profi.tools.family.keyPoints')}
        value={keyPoints}
        onChange={(e) => setKeyPoints(e.target.value)}
        placeholder={t('profi.tools.family.keyPointsPlaceholder')}
        rows={4}
      />
      <Button onClick={handleGenerate} disabled={loading || !keyPoints.trim()} className="self-start">
        {loading ? t('profi.tools.generating') : t('profi.tools.generate')}
      </Button>

      {error && <ErrorText message={error} />}

      {draft && (
        <>
          <div className="flex justify-end"><CopyButton text={draft} /></div>
          <ResultBox text={draft} />
        </>
      )}
    </ToolLayout>
  );
}

// ---------------------------------------------------------------------
// Layout compartido
// ---------------------------------------------------------------------

function ToolLayout({
  title, onClose, loading, subjectsEmpty, wide, children,
}: {
  title: string;
  onClose: () => void;
  loading: boolean;
  subjectsEmpty: boolean;
  wide?: boolean;
  children: React.ReactNode;
}) {
  const { t } = useTranslation();
  void loading;
  return (
    <Modal open onClose={onClose} title={title} widthClass={wide ? 'max-w-2xl' : 'max-w-lg'}>
      {subjectsEmpty ? (
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('profi.tools.noSubjects')}</p>
      ) : (
        <div className="flex flex-col gap-3">{children}</div>
      )}
    </Modal>
  );
}

// ---------------------------------------------------------------------
// Dispatcher: componente único que ProfiChat monta según la herramienta
// elegida en el grid de "Herramientas de Profi".
// ---------------------------------------------------------------------

export default function ProfiToolModal({ tool, onClose }: { tool: ProfiToolId; onClose: () => void }) {
  switch (tool) {
    case 'exam': return <GenerateExamTool onClose={onClose} />;
    case 'unit': return <PlanUnitTool onClose={onClose} />;
    case 'analyze': return <AnalyzeClassTool onClose={onClose} />;
    case 'adapt': return <SuggestAdaptationTool onClose={onClose} />;
    case 'family': return <DraftFamilyMessageTool onClose={onClose} />;
    default: return null;
  }
}
