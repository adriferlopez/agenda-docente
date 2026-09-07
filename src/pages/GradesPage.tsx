import { Fragment, useEffect, useMemo, useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import { subscribeSubjects } from '@/firebase/subjects';
import { subscribeStudents, updateStudentsOrder } from '@/firebase/students';
import { formatStudentName, sortStudents } from '@/utils/students';
import { subscribeStudentAdaptations } from '@/firebase/studentAdaptations';
import { subscribeStudentNotes } from '@/firebase/studentNotes';
import {
  subscribeGradebookActivities,
  createGradebookActivity,
  updateGradebookActivity,
  deleteGradebookActivity,
  getGradebookActivitiesOnce,
} from '@/firebase/gradebookActivities';
import {
  subscribeTermFinalGrades,
  setTermFinalGradeOverride,
  clearTermFinalGradeOverride,
  getTermFinalGradeOverrideOnce,
  setTermFinalGradeComment,
  clearTermFinalGradeComment,
} from '@/firebase/termFinalGrades';
import { getGradeCommentTemplateOnce, setGradeCommentTemplate } from '@/firebase/gradeCommentTemplates';
import { generateGradeComment, type PriorityCe } from '@/services/ai';
import {
  subscribeRubrics,
  subscribeGradeEntries,
  createRubric,
  updateRubric,
  deleteRubric,
  upsertGradeEntry,
  calculateFinalScore,
  getGradeEntriesOnce,
} from '@/firebase/grades';
import { downloadRubricTemplate, parseRubricFile } from '@/utils/rubricExcel';
import { getCurriculumForSubject } from '@/data/curriculum';
import { allCriteris, extractCriteriCodes, guessAreaName } from '@/data/curriculum/types';
import type { Etapa, Comunitat, CompetenciaEspecifica } from '@/data/curriculum/types';
import { getEffectiveTerms } from '@/utils/terms';
import { getEffectiveEtapas } from '@/types';
import { QUALITATIVE_VALUES, valueToQualitative, aggregateQualitative, computeBlendedGrade, type BlendedGrade } from '@/utils/grading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import TagMultiSelect from '@/components/ui/TagMultiSelect';
import SubjectStudentsModal from '@/components/subjects/SubjectStudentsModal';
import RubricCriteriaEditor from '@/components/rubric/RubricCriteriaEditor';
import { subjectColorClasses } from '@/components/ui/subjectColors';
import { subjectDisplayName } from '@/utils/timetableDisplay';
import { IconPlus, IconTrash, IconDownload, IconUpload, IconCheck, IconEdit, IconSparkles } from '@/components/ui/icons';
import { IconCopy, IconMessage } from '@/components/ui/icons-extra';
import type {
  Subject, Student, Rubric, GradeEntry, StudentAdaptation, GradingCriterion, Term,
  GradebookActivity, TermFinalGradeOverride, GradeCommentTemplate, ScoreType, QualitativeLevel,
  StudentNameFormat, StudentSortMode, GradeEntryStatus, StudentNote,
} from '@/types';
import { QUALITATIVE_LEVELS, QUALITATIVE_LEVEL_LABELS, GRADE_ENTRY_STATUSES } from '@/types';
import { db } from '@/firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

/** Una columna de la libreta: una actividad creada por el docente a partir
 * de una rúbrica (entera o solo un subconjunto de sus criterios). */
interface GradebookColumn {
  activity: GradebookActivity;
  rubric: Rubric;
  criteria: GradingCriterion[];
}

function suggestedDefaultWeight(existing: GradebookActivity[]): number {
  if (existing.length === 0) return 100;
  return Math.round(100 / (existing.length + 1));
}

// -----------------------------------------------------------------------
// Agrupación de columnas por Competència Específica: una actividad
// pertenece a un grupo de CE solo si TODOS sus criterios evaluados derivan
// de esa misma CE (si mezcla varias, o no tiene ninguna vinculada, queda
// como columna suelta, igual que antes). Las actividades de un mismo grupo
// se renderizan siempre contiguas, con una cabecera común arriba y una
// columna extra con la media ponderada al final del grupo.
// -----------------------------------------------------------------------
interface ColumnGroup {
  key: string;
  ceId?: string;
  ceName?: string;
  columns: GradebookColumn[];
}

/** Colores pastel cíclicos para distinguir grupos de CE entre sí (reutiliza
 * la misma paleta precompilada que los colores de asignatura). */
const CE_GROUP_COLORS = ['mint', 'sky', 'peach', 'lav', 'butter', 'rose'] as const;

function ceGroupColor(index: number) {
  return subjectColorClasses[CE_GROUP_COLORS[index % CE_GROUP_COLORS.length]];
}

// Falta justificada / no justificada / no hizo la actividad: badge corto +
// clave i18n para el texto completo (tooltip y selector).
const STATUS_BADGE: Record<GradeEntryStatus, { label: string; className: string }> = {
  justifiedAbsence: { label: 'J', className: 'bg-sky-50 text-sky-600' },
  unjustifiedAbsence: { label: 'NJ', className: 'bg-rose-50 text-rose-600' },
  notDone: { label: '0', className: 'bg-ink-soft/15 text-ink-soft' },
};
const STATUS_LABEL_KEY: Record<GradeEntryStatus, string> = {
  justifiedAbsence: 'grades.statusJustifiedAbsence',
  unjustifiedAbsence: 'grades.statusUnjustifiedAbsence',
  notDone: 'grades.statusNotDone',
};
// Las faltas (justificadas o no) no cuentan en la media del trimestre; "no
// hizo la actividad" sí cuenta (puntúa como el mínimo).
function statusExcludedFromAverage(status?: GradeEntryStatus): boolean {
  return status === 'justifiedAbsence' || status === 'unjustifiedAbsence';
}

/** La CE única de una actividad, o undefined si no tiene ningún criterio,
 * ningún criterio con CE vinculada, o mezcla criterios de varias CE. */
function singleCeIdForColumn(col: GradebookColumn): string | undefined {
  if (col.criteria.length === 0) return undefined;
  const first = col.criteria[0].ceId;
  if (!first) return undefined;
  return col.criteria.every((c) => c.ceId === first) ? first : undefined;
}

function groupGradebookColumns(columns: GradebookColumn[]): ColumnGroup[] {
  const order: string[] = [];
  const groups = new Map<string, ColumnGroup>();
  for (const col of columns) {
    const ceId = singleCeIdForColumn(col);
    const key = ceId ? `ce:${ceId}` : `solo:${col.activity.id}`;
    if (!groups.has(key)) {
      order.push(key);
      const ceName = ceId ? col.criteria.find((c) => c.ceId === ceId)?.ceName ?? ceId : undefined;
      groups.set(key, { key, ceId, ceName, columns: [] });
    }
    groups.get(key)!.columns.push(col);
  }
  return order.map((k) => groups.get(k)!);
}

export default function GradesPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const { activeYear } = useSchoolYears();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [myRubrics, setMyRubrics] = useState<Rubric[]>([]);
  const [activities, setActivities] = useState<GradebookActivity[]>([]);
  const [adaptations, setAdaptations] = useState<StudentAdaptation[]>([]);
  const [gradeEntries, setGradeEntries] = useState<GradeEntry[]>([]);
  const [overrides, setOverrides] = useState<TermFinalGradeOverride[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedTermId, setSelectedTermId] = useState('');
  const [showRubricsPanel, setShowRubricsPanel] = useState(false);
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  const [activityModal, setActivityModal] = useState<{ mode: 'create' } | { mode: 'edit'; activity: GradebookActivity } | null>(null);
  const [gradingColumn, setGradingColumn] = useState<GradebookColumn | null>(null);
  const [commentingStudent, setCommentingStudent] = useState<Student | null>(null);
  const [manualOrder, setManualOrder] = useState<Student[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const nameFormat: StudentNameFormat = profile?.gradesStudentDisplay?.nameFormat ?? 'lastFirst';
  const studentSortMode: StudentSortMode = profile?.gradesStudentDisplay?.sortMode ?? 'alpha';

  async function saveStudentDisplayPref(next: Partial<{ nameFormat: StudentNameFormat; sortMode: StudentSortMode }>) {
    if (!user) return;
    const value = { nameFormat, sortMode: studentSortMode, ...next };
    await updateDoc(doc(db, 'users', user.uid), { gradesStudentDisplay: value });
    if (profile) setProfile({ ...profile, gradesStudentDisplay: value });
  }

  useEffect(() => {
    if (!user || !activeYear) return;
    const u1 = subscribeSubjects(user.uid, activeYear.id, setSubjects);
    const u2 = subscribeStudents(user.uid, activeYear.id, setStudents);
    const u3 = subscribeRubrics(user.uid, activeYear.id, setMyRubrics);
    return () => { u1(); u2(); u3(); };
  }, [user, activeYear]);

  const effectiveSubjectId = selectedSubjectId || subjects[0]?.id || '';
  const selectedSubject = subjects.find((s) => s.id === effectiveSubjectId);

  useEffect(() => {
    if (!user || !effectiveSubjectId) { setAdaptations([]); return; }
    return subscribeStudentAdaptations(user.uid, effectiveSubjectId, setAdaptations);
  }, [user, effectiveSubjectId]);

  const terms = useMemo(() => (activeYear ? getEffectiveTerms(activeYear) : []), [activeYear]);
  const effectiveTermId = terms.some((term) => term.id === selectedTermId) ? selectedTermId : terms[0]?.id ?? '';
  const selectedTerm = terms.find((term) => term.id === effectiveTermId);

  const allRubrics: Rubric[] = myRubrics;
  const rubricsById = useMemo(() => {
    const map = new Map<string, Rubric>();
    allRubrics.forEach((r) => map.set(r.id, r));
    return map;
  }, [allRubrics]);

  useEffect(() => {
    if (!user || !activeYear || !effectiveSubjectId || !effectiveTermId) { setActivities([]); return; }
    return subscribeGradebookActivities(user.uid, activeYear.id, effectiveSubjectId, effectiveTermId, setActivities);
  }, [user, activeYear, effectiveSubjectId, effectiveTermId]);

  useEffect(() => {
    if (!user || !activeYear || !effectiveSubjectId || !effectiveTermId) { setGradeEntries([]); return; }
    return subscribeGradeEntries(user.uid, activeYear.id, effectiveSubjectId, effectiveTermId, setGradeEntries);
  }, [user, activeYear, effectiveSubjectId, effectiveTermId]);

  useEffect(() => {
    if (!user || !effectiveSubjectId || !effectiveTermId) { setOverrides([]); return; }
    return subscribeTermFinalGrades(user.uid, effectiveSubjectId, effectiveTermId, setOverrides);
  }, [user, effectiveSubjectId, effectiveTermId]);

  const subjectStudents = useMemo(
    () => students.filter((s) => s.groupId === selectedSubject?.studentGroupId),
    [students, selectedSubject]
  );

  // Orden manual: copia local para poder arrastrar con feedback inmediato
  // antes de que llegue la confirmación de Firestore (mismo patrón que en
  // Asignaturas).
  useEffect(() => {
    setManualOrder(sortStudents(subjectStudents, 'manual'));
  }, [subjectStudents]);

  const displayStudents = useMemo(
    () => (studentSortMode === 'manual' ? manualOrder : sortStudents(subjectStudents, 'alpha')),
    [studentSortMode, subjectStudents, manualOrder]
  );

  function handleStudentDragStart(index: number) {
    setDragIndex(index);
  }
  function handleStudentDragOver(e: DragEvent<HTMLTableRowElement>, overIndex: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === overIndex) return;
    setManualOrder((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(overIndex, 0, moved);
      return next;
    });
    setDragIndex(overIndex);
  }
  function handleStudentDragEnd() {
    setDragIndex(null);
    updateStudentsOrder(manualOrder.map((s) => s.id));
  }

  const adaptationByStudent = useMemo(() => {
    const map = new Map<string, StudentAdaptation>();
    adaptations.forEach((a) => map.set(a.studentId, a));
    return map;
  }, [adaptations]);

  const columns: GradebookColumn[] = useMemo(() => {
    const list: GradebookColumn[] = [];
    for (const activity of activities) {
      const rubric = rubricsById.get(activity.rubricId);
      if (!rubric) continue;
      const criteria = activity.criterionIds && activity.criterionIds.length > 0
        ? rubric.criteria.filter((c) => activity.criterionIds!.includes(c.id))
        : rubric.criteria;
      list.push({ activity, rubric, criteria });
    }
    return list;
  }, [activities, rubricsById]);

  function blendedForStudent(studentId: string): BlendedGrade | undefined {
    const items = columns
      .map((col) => {
        const entry = gradeEntries.find((e) => e.studentId === studentId && e.activityId === col.activity.id);
        if (!entry || statusExcludedFromAverage(entry.status)) return null;
        return {
          finalScore: entry.finalScore,
          qualitativeLevel: entry.qualitativeLevel,
          weight: col.activity.weight,
          scoreType: col.activity.scoreType,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
    return computeBlendedGrade(items);
  }

  function overrideForStudent(studentId: string): TermFinalGradeOverride | undefined {
    return overrides.find((o) => o.studentId === studentId);
  }

  async function handleDeleteActivity(activity: GradebookActivity) {
    if (!confirm(t('grades.removeColumnConfirm'))) return;
    // Si la actividad usaba una rúbrica sintética "de nota manual" (creada
    // solo para esta actividad, no visible en el listado de rúbricas del
    // docente), se elimina también para no dejarla huérfana.
    const rubric = rubricsById.get(activity.rubricId);
    await deleteGradebookActivity(activity.id);
    if (rubric?.isManual) await deleteRubric(rubric.id);
  }

  async function handleSetOverride(studentId: string, value: { overrideValue?: number; overrideLevel?: QualitativeLevel }) {
    if (!user || !activeYear || !selectedSubject || !selectedTerm) return;
    await setTermFinalGradeOverride(user.uid, activeYear.id, selectedSubject.id, studentId, selectedTerm.id, value);
  }

  async function handleClearOverride(studentId: string) {
    if (!selectedSubject || !selectedTerm) return;
    await clearTermFinalGradeOverride(selectedSubject.id, studentId, selectedTerm.id);
  }

  if (!activeYear) return <p className="text-sm text-ink-soft">{t('schoolYear.noYears')}</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl text-accent mb-1">{t('grades.title')}</h1>
          <p className="text-sm text-ink-soft">{t('grades.subtitle')}</p>
        </div>
        <Button variant="secondary" onClick={() => setShowRubricsPanel(true)}>
          {t('grades.rubrics')}
        </Button>
      </div>

      {subjects.length === 0 ? (
        <Card className="text-sm text-ink-soft">{t('grades.noSubjects')}</Card>
      ) : (
        <>
          <div className="flex items-end gap-2 flex-wrap">
            <Select
              label={t('grades.selectSubject')}
              value={effectiveSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="max-w-xs"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{subjectDisplayName(s)}</option>
              ))}
            </Select>
            {selectedSubject && (
              <Button variant="secondary" onClick={() => setShowStudentsModal(true)}>
                {t('subjects.manageStudents')}
              </Button>
            )}
          </div>

          {terms.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {terms.map((term) => (
                <button
                  key={term.id}
                  onClick={() => setSelectedTermId(term.id)}
                  className={`text-xs font-semibold rounded-full px-3 py-1.5 transition ${
                    term.id === effectiveTermId ? 'bg-accent text-white' : 'bg-accent-light text-accent hover:opacity-80'
                  }`}
                >
                  {term.name}
                </button>
              ))}
            </div>
          )}

          {selectedSubject && selectedTerm && (
            <Button
              variant="secondary"
              icon={<IconPlus size={16} />}
              className="self-start"
              onClick={() => setActivityModal({ mode: 'create' })}
            >
              {t('grades.addActivity')}
            </Button>
          )}

          {!selectedSubject ? null : subjectStudents.length === 0 ? (
            <Card className="text-sm text-ink-soft">{t('grades.noStudents')}</Card>
          ) : (
            <>
              {subjectStudents.length > 1 && (
                <div className="flex items-end gap-2 flex-wrap">
                  <Select
                    label={t('grades.nameFormat')}
                    value={nameFormat}
                    onChange={(e) => saveStudentDisplayPref({ nameFormat: e.target.value as StudentNameFormat })}
                    className="max-w-[200px]"
                  >
                    <option value="lastFirst">{t('grades.nameFormatLastFirst')}</option>
                    <option value="firstLast">{t('grades.nameFormatFirstLast')}</option>
                    <option value="firstOnly">{t('grades.nameFormatFirstOnly')}</option>
                  </Select>
                  <Select
                    label={t('grades.studentSort')}
                    value={studentSortMode}
                    onChange={(e) => saveStudentDisplayPref({ sortMode: e.target.value as StudentSortMode })}
                    className="max-w-[200px]"
                  >
                    <option value="alpha">{t('grades.studentSortAlpha')}</option>
                    <option value="manual">{t('grades.studentSortManual')}</option>
                  </Select>
                  {studentSortMode === 'manual' && (
                    <span className="text-[11px] text-ink-soft">{t('grades.studentSortManualHelp')}</span>
                  )}
                </div>
              )}
              <Gradebook
              students={displayStudents}
              nameFormat={nameFormat}
              draggable={studentSortMode === 'manual'}
              dragIndex={dragIndex}
              onStudentDragStart={handleStudentDragStart}
              onStudentDragOver={handleStudentDragOver}
              onStudentDragEnd={handleStudentDragEnd}
              columns={columns}
              adaptationByStudent={adaptationByStudent}
              gradeEntries={gradeEntries}
              blendedForStudent={blendedForStudent}
              overrideForStudent={overrideForStudent}
              onOpenColumn={setGradingColumn}
              onEditColumn={(activity) => setActivityModal({ mode: 'edit', activity })}
              onRemoveColumn={handleDeleteActivity}
              onSetOverride={handleSetOverride}
              onClearOverride={handleClearOverride}
              onOpenComment={setCommentingStudent}
              />
            </>
          )}
        </>
      )}

      {activityModal && selectedSubject && selectedTerm && user && activeYear && (
        <ActivityModal
          mode={activityModal.mode}
          activity={activityModal.mode === 'edit' ? activityModal.activity : undefined}
          subject={selectedSubject}
          term={selectedTerm}
          ownerId={user.uid}
          schoolYearId={activeYear.id}
          allRubrics={allRubrics}
          existingActivities={activities}
          onClose={() => setActivityModal(null)}
        />
      )}

      {gradingColumn && selectedSubject && selectedTerm && user && activeYear && (
        <GradeActivityModal
          column={gradingColumn}
          students={displayStudents}
          nameFormat={nameFormat}
          adaptationByStudent={adaptationByStudent}
          gradeEntries={gradeEntries}
          rubricsById={rubricsById}
          ownerId={user.uid}
          schoolYearId={activeYear.id}
          subjectId={selectedSubject.id}
          term={selectedTerm}
          onClose={() => setGradingColumn(null)}
        />
      )}

      {commentingStudent && selectedSubject && selectedTerm && user && activeYear && (
        <CommentModal
          student={commentingStudent}
          nameFormat={nameFormat}
          defaultSubjectId={selectedSubject.id}
          defaultBlended={overrideForStudent(commentingStudent.id) ? undefined : blendedForStudent(commentingStudent.id)}
          defaultOverride={overrideForStudent(commentingStudent.id)}
          subjects={subjects}
          ownerId={user.uid}
          schoolYearId={activeYear.id}
          termId={selectedTerm.id}
          etapas={getEffectiveEtapas(profile)}
          comunitat={profile?.comunitat ?? 'catalunya'}
          hasGeminiKey={profile?.hasGeminiKey ?? false}
          onClose={() => setCommentingStudent(null)}
        />
      )}

      {showStudentsModal && selectedSubject && user && activeYear && (
        <SubjectStudentsModal
          subject={selectedSubject}
          ownerId={user.uid}
          schoolYearId={activeYear.id}
          onClose={() => setShowStudentsModal(false)}
        />
      )}

      {showRubricsPanel && user && activeYear && (
        <RubricsPanel
          ownerId={user.uid}
          schoolYearId={activeYear.id}
          myRubrics={myRubrics}
          subjects={subjects}
          etapas={getEffectiveEtapas(profile)}
          comunitat={profile?.comunitat ?? 'catalunya'}
          onClose={() => setShowRubricsPanel(false)}
        />
      )}
    </div>
  );
}

// -----------------------------------------------------------------------
// Libreta de notas: filas = alumnos, columnas = actividades + nota final
// -----------------------------------------------------------------------
function Gradebook({
  students, nameFormat, draggable, dragIndex, onStudentDragStart, onStudentDragOver, onStudentDragEnd,
  columns, adaptationByStudent, gradeEntries, blendedForStudent, overrideForStudent,
  onOpenColumn, onEditColumn, onRemoveColumn, onSetOverride, onClearOverride, onOpenComment,
}: {
  students: Student[];
  nameFormat: StudentNameFormat;
  draggable: boolean;
  dragIndex: number | null;
  onStudentDragStart: (index: number) => void;
  onStudentDragOver: (e: DragEvent<HTMLTableRowElement>, index: number) => void;
  onStudentDragEnd: () => void;
  columns: GradebookColumn[];
  adaptationByStudent: Map<string, StudentAdaptation>;
  gradeEntries: GradeEntry[];
  blendedForStudent: (studentId: string) => BlendedGrade | undefined;
  overrideForStudent: (studentId: string) => TermFinalGradeOverride | undefined;
  onOpenColumn: (col: GradebookColumn) => void;
  onEditColumn: (activity: GradebookActivity) => void;
  onRemoveColumn: (activity: GradebookActivity) => void;
  onSetOverride: (studentId: string, value: { overrideValue?: number; overrideLevel?: QualitativeLevel }) => Promise<void>;
  onClearOverride: (studentId: string) => Promise<void>;
  onOpenComment: (student: Student) => void;
}) {
  const { t } = useTranslation();

  function entryFor(studentId: string, activityId: string) {
    return gradeEntries.find((e) => e.studentId === studentId && e.activityId === activityId);
  }

  /** Media ponderada (por peso de actividad) de un grupo de CE para un
   * alumno, usando solo las actividades de ese grupo — no todas las de la
   * asignatura, para poder mostrar el resultado parcial de esa competencia. */
  function blendedForGroup(group: ColumnGroup, studentId: string): BlendedGrade | undefined {
    const items = group.columns
      .map((col) => {
        const entry = entryFor(studentId, col.activity.id);
        if (!entry || statusExcludedFromAverage(entry.status)) return null;
        return {
          finalScore: entry.finalScore,
          qualitativeLevel: entry.qualitativeLevel,
          weight: col.activity.weight,
          scoreType: col.activity.scoreType,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
    return computeBlendedGrade(items);
  }

  function ActivityHeaderCell({ col }: { col: GradebookColumn }) {
    return (
      <th className="text-center px-2 py-2 text-ink font-semibold text-xs align-top">
        <button onClick={() => onOpenColumn(col)} className="hover:underline">
          <div className="line-clamp-2 max-w-[110px]">{col.activity.name}</div>
        </button>
        <div className="text-ink-soft font-normal mt-0.5">{col.activity.weight}%</div>
        <div className="flex items-center justify-center gap-2 mt-0.5">
          <button onClick={() => onEditColumn(col.activity)} className="text-[10px] text-ink-soft hover:text-accent" title={t('common.edit')}>
            <IconEdit size={11} />
          </button>
          <button onClick={() => onRemoveColumn(col.activity)} className="text-[10px] text-ink-soft hover:text-rose-600" title={t('grades.removeColumn')}>
            <IconTrash size={11} />
          </button>
        </div>
      </th>
    );
  }

  function ActivityCell({ col, studentId }: { col: GradebookColumn; studentId: string }) {
    const entry = entryFor(studentId, col.activity.id);
    if (entry?.status) {
      const badge = STATUS_BADGE[entry.status];
      return (
        <td className="px-2 py-1.5 text-center">
          <button
            onClick={() => onOpenColumn(col)}
            className={`w-14 h-8 rounded-xl text-xs font-bold flex items-center justify-center mx-auto ${badge.className}`}
            title={t(STATUS_LABEL_KEY[entry.status])}
          >
            {badge.label}
          </button>
        </td>
      );
    }
    const text = entry
      ? col.activity.scoreType === 'qualitative'
        ? entry.qualitativeLevel ?? valueToQualitative(entry.finalScore)
        : entry.finalScore.toFixed(1)
      : '—';
    return (
      <td className="px-2 py-1.5 text-center">
        <button
          onClick={() => onOpenColumn(col)}
          className="w-14 h-8 rounded-xl text-sm font-semibold flex items-center justify-center mx-auto text-ink"
          style={{ background: 'var(--bg-input)' }}
        >
          {text}
        </button>
      </td>
    );
  }

  const groups = groupGradebookColumns(columns);
  const hasCeGroups = groups.some((g) => g.ceId);

  return (
    <div className="flex flex-col gap-3">
      {columns.length === 0 && (
        <Card className="text-sm text-ink-soft">{t('grades.noActivities')}</Card>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-0 min-w-[300px]">
          <thead>
            <tr className="bg-accent-light">
              <th
                rowSpan={hasCeGroups ? 2 : undefined}
                className="text-left px-3 py-2 rounded-l-2xl text-ink font-semibold w-44 sticky left-0 bg-accent-light z-10"
              >
                {t('students.students')}
              </th>
              {groups.map((group, gi) => {
                if (group.ceId) {
                  const color = ceGroupColor(gi);
                  return (
                    <th
                      key={group.key}
                      colSpan={group.columns.length + 1}
                      className={`text-center px-2 py-1.5 text-xs font-semibold ${color.bg} ${color.text}`}
                      title={group.ceName}
                    >
                      <div className="line-clamp-1">{group.ceName}</div>
                    </th>
                  );
                }
                return group.columns.map((col) => (
                  <ActivityHeaderCell key={col.activity.id} col={col} />
                ));
              })}
              <th
                rowSpan={hasCeGroups ? 2 : undefined}
                className="text-center px-3 py-2 rounded-r-2xl text-accent font-semibold"
              >
                {t('grades.finalScore')}
              </th>
            </tr>
            {hasCeGroups && (
              <tr className="bg-accent-light">
                {groups.map((group, gi) => {
                  if (!group.ceId) return null;
                  const color = ceGroupColor(gi);
                  return (
                    <Fragment key={group.key}>
                      {group.columns.map((col) => (
                        <ActivityHeaderCell key={col.activity.id} col={col} />
                      ))}
                      <th className={`text-center px-2 py-2 text-xs font-semibold align-top ${color.bg} ${color.text}`}>
                        {t('grades.ceAverage')}
                      </th>
                    </Fragment>
                  );
                })}
              </tr>
            )}
          </thead>
          <tbody>
            {students.map((student, studentIndex) => {
              const adaptation = adaptationByStudent.get(student.id);
              const blended = blendedForStudent(student.id);
              const override = overrideForStudent(student.id);
              const display: BlendedGrade | undefined = override
                ? override.overrideValue !== undefined
                  ? { type: 'numeric', value: override.overrideValue }
                  : override.overrideLevel
                  ? { type: 'qualitative', value: override.overrideLevel }
                  : blended
                : blended;
              return (
                <tr
                  key={student.id}
                  className={`border-b border-lav-50 ${draggable ? 'cursor-grab active:cursor-grabbing' : ''} ${
                    dragIndex === studentIndex ? 'opacity-60' : ''
                  }`}
                  draggable={draggable}
                  onDragStart={() => draggable && onStudentDragStart(studentIndex)}
                  onDragOver={(e) => draggable && onStudentDragOver(e, studentIndex)}
                  onDragEnd={() => draggable && onStudentDragEnd()}
                >
                  <td className="px-3 py-2 font-medium text-ink sticky left-0 bg-theme-card z-10">
                    {formatStudentName(student, nameFormat)}
                    {adaptation?.hasAdaptation && (
                      <span className="ml-1.5 text-[9px] font-semibold text-accent bg-accent-light rounded-full px-1.5 py-0.5">
                        {t('students.hasAdaptation')}
                      </span>
                    )}
                  </td>
                  {groups.map((group, gi) => {
                    if (!group.ceId) {
                      return group.columns.map((col) => (
                        <ActivityCell key={col.activity.id} col={col} studentId={student.id} />
                      ));
                    }
                    const color = ceGroupColor(gi);
                    const groupBlended = blendedForGroup(group, student.id);
                    const avgText = groupBlended
                      ? groupBlended.type === 'numeric'
                        ? groupBlended.value.toFixed(1)
                        : groupBlended.value
                      : '—';
                    return (
                      <Fragment key={group.key}>
                        {group.columns.map((col) => (
                          <ActivityCell key={col.activity.id} col={col} studentId={student.id} />
                        ))}
                        <td className={`px-2 py-1.5 text-center ${color.bg}`}>
                          <span className={`inline-flex items-center justify-center w-14 h-8 rounded-xl text-sm font-semibold ${color.text}`}>
                            {avgText}
                          </span>
                        </td>
                      </Fragment>
                    );
                  })}
                  <td className="px-2 py-1.5 align-top">
                    <div className="flex flex-col items-center gap-1 min-w-[130px]">
                      <div className="flex items-center justify-center gap-1.5">
                        <FinalGradeCell
                          display={display}
                          hasOverride={!!override}
                          onSave={(v) => onSetOverride(student.id, v)}
                          onReset={() => onClearOverride(student.id)}
                        />
                        <button
                          onClick={() => onOpenComment(student)}
                          className="text-ink-soft hover:text-accent p-1"
                          aria-label={t('grades.comment')}
                          title={t('grades.comment')}
                        >
                          <IconMessage size={14} />
                        </button>
                      </div>
                      {override?.comment && (
                        <button
                          onClick={() => onOpenComment(student)}
                          className="text-[11px] text-ink-soft text-left leading-snug line-clamp-2 max-w-[150px] hover:text-accent"
                          title={override.comment}
                        >
                          {override.comment}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------
// Celda de nota final: muestra el cálculo automático o el override, y
// permite al docente sobrescribirla siempre que quiera.
// -----------------------------------------------------------------------
function FinalGradeCell({
  display, hasOverride, onSave, onReset,
}: {
  display: BlendedGrade | undefined;
  hasOverride: boolean;
  onSave: (v: { overrideValue?: number; overrideLevel?: QualitativeLevel }) => Promise<void>;
  onReset: () => Promise<void>;
}) {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [editType, setEditType] = useState<ScoreType>(display?.type === 'qualitative' ? 'qualitative' : 'numeric');
  const [numValue, setNumValue] = useState<string>(display?.type === 'numeric' ? String(display.value) : '');
  const [level, setLevel] = useState<QualitativeLevel>(display?.type === 'qualitative' ? display.value : 'AS');
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      if (editType === 'numeric') {
        const v = Math.min(10, Math.max(0, parseFloat(numValue.replace(',', '.')) || 0));
        await onSave({ overrideValue: v });
      } else {
        await onSave({ overrideLevel: level });
      }
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleReset() {
    setSaving(true);
    try {
      await onReset();
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  if (editing) {
    return (
      <div className="flex flex-col items-center gap-1 py-1">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setEditType('numeric')}
            className={`text-[10px] font-semibold rounded-full px-2 py-0.5 ${editType === 'numeric' ? 'bg-accent text-white' : 'bg-accent-light text-accent'}`}
          >
            0-10
          </button>
          <button
            type="button"
            onClick={() => setEditType('qualitative')}
            className={`text-[10px] font-semibold rounded-full px-2 py-0.5 ${editType === 'qualitative' ? 'bg-accent text-white' : 'bg-accent-light text-accent'}`}
          >
            NA-AE
          </button>
        </div>
        {editType === 'numeric' ? (
          <input
            type="number"
            min={0}
            max={10}
            step={0.1}
            value={numValue}
            onChange={(e) => setNumValue(e.target.value)}
            className="w-16 text-center border border-lav-200 rounded-xl px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        ) : (
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as QualitativeLevel)}
            className="border border-lav-200 rounded-xl px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {QUALITATIVE_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        )}
        <div className="flex gap-1">
          <Button size="sm" onClick={handleSave} disabled={saving}>{t('common.save')}</Button>
          <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>{t('common.cancel')}</Button>
        </div>
        {hasOverride && (
          <button type="button" onClick={handleReset} className="text-[10px] text-ink-soft hover:text-accent underline">
            {t('grades.useAutoGrade')}
          </button>
        )}
      </div>
    );
  }

  const text = display ? (display.type === 'numeric' ? display.value.toFixed(1) : display.value) : '—';
  return (
    <button
      onClick={() => setEditing(true)}
      className={`w-16 h-9 rounded-xl text-sm font-semibold flex items-center justify-center mx-auto ${hasOverride ? 'text-accent' : 'text-ink'}`}
      style={{ background: 'var(--bg-input)' }}
      title={hasOverride ? t('grades.overriddenGrade') : t('grades.autoGrade')}
    >
      {text}
    </button>
  );
}

// -----------------------------------------------------------------------
// Añadir/editar una actividad de la libreta a partir de una rúbrica.
// -----------------------------------------------------------------------
function ActivityModal({
  mode, activity, subject, term, ownerId, schoolYearId, allRubrics, existingActivities, onClose,
}: {
  mode: 'create' | 'edit';
  activity?: GradebookActivity;
  subject: Subject;
  term: Term;
  ownerId: string;
  schoolYearId: string;
  allRubrics: Rubric[];
  existingActivities: GradebookActivity[];
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const editingRubric = activity ? allRubrics.find((r) => r.id === activity.rubricId) : undefined;
  const pickableRubrics = useMemo(() => allRubrics.filter((r) => !r.isManual), [allRubrics]);
  const [manualMode, setManualMode] = useState(Boolean(editingRubric?.isManual));
  const [rubricId, setRubricId] = useState(activity?.rubricId ?? '');
  const rubric = allRubrics.find((r) => r.id === rubricId);
  const [name, setName] = useState(activity?.name ?? '');
  const [weight, setWeight] = useState<number>(activity?.weight ?? suggestedDefaultWeight(existingActivities));
  const [scoreType, setScoreType] = useState<ScoreType>(activity?.scoreType ?? 'numeric');
  const [criterionIds, setCriterionIds] = useState<Set<string>>(new Set(activity?.criterionIds ?? []));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (rubric && mode === 'create' && !name) setName(rubric.name);
  }, [rubric]); // eslint-disable-line react-hooks/exhaustive-deps

  function toggleCriterion(id: string) {
    if (!rubric) return;
    setCriterionIds((prev) => {
      const allIds = rubric.criteria.map((c) => c.id);
      const current = prev.size === 0 ? new Set(allIds) : new Set(prev);
      if (current.has(id)) current.delete(id); else current.add(id);
      if (current.size === allIds.length) return new Set();
      return current;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    if (!manualMode && !rubric) return;
    setSaving(true);
    try {
      if (manualMode) {
        // Actividad "de nota manual": no hay rúbrica real que elegir, así
        // que se crea (o reutiliza, si ya existía) una rúbrica sintética de
        // un único criterio a peso 100. Todo el resto del motor de notas
        // (cálculo de finalScore, tabla de introducción de notas, medias
        // ponderadas del trimestre...) sigue funcionando sin cambios porque
        // sigue viendo "una rúbrica con criterios" como siempre.
        const manualRubricId = editingRubric?.isManual
          ? editingRubric.id
          : await createRubric(ownerId, schoolYearId, {
              name: t('grades.manualGradeRubricName'),
              subjectId: subject.id,
              criteria: [
                {
                  id: crypto.randomUUID(),
                  name: t('grades.manualGradeCriterion'),
                  weight: 100,
                  indicators: ['', '', '', ''],
                },
              ],
              isManual: true,
            });
        if (mode === 'create') {
          await createGradebookActivity(ownerId, schoolYearId, {
            subjectId: subject.id,
            termId: term.id,
            name: name.trim(),
            rubricId: manualRubricId,
            criterionIds: undefined,
            weight,
            scoreType,
          });
        } else if (activity) {
          await updateGradebookActivity(activity.id, {
            name: name.trim(),
            rubricId: manualRubricId,
            criterionIds: [],
            weight,
            scoreType,
          });
        }
        onClose();
        return;
      }

      if (!rubric) return;
      const ids = criterionIds.size > 0 && criterionIds.size < rubric.criteria.length ? Array.from(criterionIds) : undefined;
      if (mode === 'create') {
        await createGradebookActivity(ownerId, schoolYearId, {
          subjectId: subject.id,
          termId: term.id,
          name: name.trim(),
          rubricId: rubric.id,
          criterionIds: ids,
          weight,
          scoreType,
        });
      } else if (activity) {
        await updateGradebookActivity(activity.id, {
          name: name.trim(),
          rubricId: rubric.id,
          criterionIds: ids ?? [],
          weight,
          scoreType,
        });
      }
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={mode === 'create' ? t('grades.addActivity') : t('grades.editActivity')} widthClass="max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === 'create' && (
          <div>
            <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              {t('grades.activityKind')}
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setManualMode(false)}
                className={`text-xs font-semibold rounded-full px-3 py-1.5 ${!manualMode ? 'bg-accent text-white' : 'bg-accent-light text-accent'}`}
              >
                {t('grades.activityKindRubric')}
              </button>
              <button
                type="button"
                onClick={() => setManualMode(true)}
                className={`text-xs font-semibold rounded-full px-3 py-1.5 ${manualMode ? 'bg-accent text-white' : 'bg-accent-light text-accent'}`}
              >
                {t('grades.activityKindManual')}
              </button>
            </div>
          </div>
        )}

        {!manualMode && (
          <Select label={t('grades.selectRubric')} value={rubricId} onChange={(e) => { setRubricId(e.target.value); setCriterionIds(new Set()); }} required>
            <option value="">{t('grades.chooseRubric')}</option>
            {pickableRubrics.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </Select>
        )}

        {manualMode && (
          <p className="text-xs text-ink-soft">{t('grades.activityKindManualHelp')}</p>
        )}

        {(manualMode || rubric) && (
          <>
            <Input label={t('grades.activityName')} value={name} onChange={(e) => setName(e.target.value)} required autoFocus />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  {t('grades.activityWeight')}
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={weight}
                    onChange={(e) => setWeight(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                    className="w-20 text-center border border-lav-200 rounded-xl px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <span className="text-sm text-ink-soft">%</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  {t('grades.scoreType')}
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setScoreType('numeric')}
                    className={`text-xs font-semibold rounded-full px-3 py-1.5 ${scoreType === 'numeric' ? 'bg-accent text-white' : 'bg-accent-light text-accent'}`}
                  >
                    0-10
                  </button>
                  <button
                    type="button"
                    onClick={() => setScoreType('qualitative')}
                    className={`text-xs font-semibold rounded-full px-3 py-1.5 ${scoreType === 'qualitative' ? 'bg-accent text-white' : 'bg-accent-light text-accent'}`}
                  >
                    NA-AS-AN-AE
                  </button>
                </div>
              </div>
            </div>

            {!manualMode && rubric && rubric.criteria.length > 1 && (
              <div>
                <p className="text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  {t('grades.criteriaSubsetHelp')}
                </p>
                <div className="flex flex-col gap-1 max-h-40 overflow-y-auto rounded-xl border border-lav-100 p-2">
                  {rubric.criteria.map((c) => (
                    <label key={c.id} className="flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        checked={criterionIds.size === 0 || criterionIds.has(c.id)}
                        onChange={() => toggleCriterion(c.id)}
                      />
                      {c.ceLabel ? `${c.ceLabel} — ${c.name}` : c.name || c.id}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className="flex gap-2">
          <Button type="submit" disabled={(!manualMode && !rubric) || !name.trim() || saving}>
            {t('common.save')}
          </Button>
          <Button type="button" variant="ghost" onClick={onClose}>
            {t('common.cancel')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// -----------------------------------------------------------------------
// Modal para introducir las notas de una actividad/columna concreta.
// Los alumnos con adaptación curricular completa se evalúan aparte con su
// propia rúbrica alternativa (agrupados por rúbrica adaptada).
// -----------------------------------------------------------------------
function GradeActivityModal({
  column, students, nameFormat, adaptationByStudent, gradeEntries, rubricsById,
  ownerId, schoolYearId, subjectId, term, onClose,
}: {
  column: GradebookColumn;
  students: Student[];
  nameFormat: StudentNameFormat;
  adaptationByStudent: Map<string, StudentAdaptation>;
  gradeEntries: GradeEntry[];
  rubricsById: Map<string, Rubric>;
  ownerId: string;
  schoolYearId: string;
  subjectId: string;
  term: Term;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const scoreType = column.activity.scoreType;

  const standardStudents = students.filter((s) => {
    const a = adaptationByStudent.get(s.id);
    return !(a?.hasAdaptation && a.adaptedRubricId);
  });

  const adaptedGroups = useMemo(() => {
    const map = new Map<string, Student[]>();
    students.forEach((s) => {
      const a = adaptationByStudent.get(s.id);
      if (a?.hasAdaptation && a.adaptedRubricId) {
        const list = map.get(a.adaptedRubricId) ?? [];
        list.push(s);
        map.set(a.adaptedRubricId, list);
      }
    });
    return map;
  }, [students, adaptationByStudent]);

  const entriesForColumn = useMemo(
    () => gradeEntries.filter((e) => e.activityId === column.activity.id),
    [gradeEntries, column.activity.id]
  );

  async function saveGroup(
    groupStudents: Student[],
    criteria: GradingCriterion[],
    rubricId: string,
    scoresMap: Record<string, Record<string, number>>,
    statusMap: Record<string, GradeEntryStatus | undefined>
  ) {
    await Promise.all(
      groupStudents.map((student) => {
        const status = statusMap[student.id];
        // Con un estado especial (falta o no hizo la actividad) no se
        // guardan puntuaciones por criterio: la nota final se fija al
        // mínimo (0 / NA) y las faltas además se excluyen de la media del
        // trimestre (ver statusExcludedFromAverage).
        const studentScores = status ? {} : scoresMap[student.id] ?? {};
        const finalScore = status ? 0 : calculateFinalScore(studentScores, criteria);
        const qualitativeLevel = scoreType === 'qualitative'
          ? status
            ? 'NA' as const
            : aggregateQualitative(criteria.map((c) => ({
                level: valueToQualitative(studentScores[c.id] ?? QUALITATIVE_VALUES.NA),
                weight: c.weight,
              })))
          : undefined;
        return upsertGradeEntry(ownerId, schoolYearId, {
          studentId: student.id,
          subjectId,
          rubricId,
          activityId: column.activity.id,
          evaluation: term.id,
          scores: studentScores,
          finalScore,
          ...(qualitativeLevel ? { qualitativeLevel } : {}),
          status,
        });
      })
    );
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={`${column.activity.name} · ${term.name}`}
      widthClass="max-w-3xl"
    >
      <div className="flex flex-col gap-6">
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {t('grades.activityWeight')}: {column.activity.weight}% · {scoreType === 'qualitative' ? 'NA-AS-AN-AE' : '0-10'}
        </p>

        {standardStudents.length > 0 && (
          <CriteriaGradeGroup
            students={standardStudents}
            nameFormat={nameFormat}
            criteria={column.criteria}
            entries={entriesForColumn}
            scoreType={scoreType}
            onSave={(scoresMap, statusMap) => saveGroup(standardStudents, column.criteria, column.rubric.id, scoresMap, statusMap)}
          />
        )}

        {[...adaptedGroups.entries()].map(([rubricId, groupStudents]) => {
          const adaptedRubric = rubricsById.get(rubricId);
          if (!adaptedRubric) return null;
          return (
            <div key={rubricId} className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-accent">
                {t('students.hasAdaptation')} · {adaptedRubric.name}
              </p>
              <CriteriaGradeGroup
                students={groupStudents}
                nameFormat={nameFormat}
                criteria={adaptedRubric.criteria}
                entries={entriesForColumn}
                scoreType={scoreType}
                onSave={(scoresMap, statusMap) => saveGroup(groupStudents, adaptedRubric.criteria, adaptedRubric.id, scoresMap, statusMap)}
              />
            </div>
          );
        })}

        <div className="flex justify-end">
          <Button variant="ghost" onClick={onClose}>{t('common.close')}</Button>
        </div>
      </div>
    </Modal>
  );
}

// -----------------------------------------------------------------------
// Tabla de notas por criterio para un grupo de alumnos (estándar o con una
// misma rúbrica adaptada). Guarda su propio grupo de forma independiente.
// -----------------------------------------------------------------------
function CriteriaGradeGroup({
  students, nameFormat, criteria, entries, scoreType, onSave,
}: {
  students: Student[];
  nameFormat: StudentNameFormat;
  criteria: GradingCriterion[];
  entries: GradeEntry[];
  scoreType: ScoreType;
  onSave: (
    scores: Record<string, Record<string, number>>,
    statuses: Record<string, GradeEntryStatus | undefined>
  ) => Promise<void>;
}) {
  const { t } = useTranslation();

  const initialScores = useMemo(() => {
    const map: Record<string, Record<string, number>> = {};
    entries.forEach((e) => { map[e.studentId] = { ...e.scores }; });
    return map;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const initialStatuses = useMemo(() => {
    const map: Record<string, GradeEntryStatus | undefined> = {};
    entries.forEach((e) => { if (e.status) map[e.studentId] = e.status; });
    return map;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [scores, setScores] = useState<Record<string, Record<string, number>>>(initialScores);
  const [statuses, setStatuses] = useState<Record<string, GradeEntryStatus | undefined>>(initialStatuses);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleChange(studentId: string, criterionId: string, value: number) {
    setScores((prev) => ({ ...prev, [studentId]: { ...(prev[studentId] ?? {}), [criterionId]: value } }));
  }

  function handleClear(studentId: string, criterionId: string) {
    setScores((prev) => {
      const next = { ...(prev[studentId] ?? {}) };
      delete next[criterionId];
      return { ...prev, [studentId]: next };
    });
  }

  function handleStatusChange(studentId: string, value: string) {
    setStatuses((prev) => ({ ...prev, [studentId]: (value || undefined) as GradeEntryStatus | undefined }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(scores, statuses);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-0 min-w-[500px]">
          <thead>
            <tr className="bg-accent-light">
              <th className="text-left px-3 py-2 rounded-l-2xl text-ink font-semibold w-44">
                {t('students.students')}
              </th>
              <th className="text-center px-2 py-2 text-ink font-semibold text-xs w-32">
                {t('grades.status')}
              </th>
              {criteria.map((c) => (
                <th key={c.id} className="text-center px-2 py-2 text-ink font-semibold text-xs">
                  <div>{c.name}</div>
                  <div className="text-ink-soft font-normal">({c.weight}%)</div>
                </th>
              ))}
              <th className="text-center px-3 py-2 rounded-r-2xl text-accent font-semibold">
                {t('grades.finalScore')}
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const studentScores = scores[student.id] ?? {};
              const status = statuses[student.id];
              const hasScores = Object.keys(studentScores).length > 0;
              const final = calculateFinalScore(studentScores, criteria);
              return (
                <tr key={student.id} className="border-b border-lav-50">
                  <td className="px-3 py-2 font-medium text-ink">
                    {formatStudentName(student, nameFormat)}
                  </td>
                  <td className="px-2 py-1.5 text-center">
                    <select
                      value={status ?? ''}
                      onChange={(e) => handleStatusChange(student.id, e.target.value)}
                      className="border border-lav-200 rounded-xl px-1.5 py-1 text-[11px] focus:outline-none focus:ring-2 focus:ring-accent max-w-[120px]"
                    >
                      <option value="">{t('grades.statusNone')}</option>
                      {GRADE_ENTRY_STATUSES.map((s) => (
                        <option key={s} value={s}>{t(STATUS_LABEL_KEY[s])}</option>
                      ))}
                    </select>
                  </td>
                  {status ? (
                    <td colSpan={criteria.length} className="px-2 py-1.5 text-center text-xs italic text-ink-soft">
                      {t(STATUS_LABEL_KEY[status])}
                    </td>
                  ) : (
                    criteria.map((c) => (
                      <td key={c.id} className="px-2 py-1.5 text-center">
                        {scoreType === 'qualitative' ? (
                          <select
                            value={studentScores[c.id] !== undefined ? valueToQualitative(studentScores[c.id]) : ''}
                            onChange={(e) => {
                              const v = e.target.value;
                              if (!v) handleClear(student.id, c.id);
                              else handleChange(student.id, c.id, QUALITATIVE_VALUES[v as QualitativeLevel]);
                            }}
                            className="border border-lav-200 rounded-xl px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-accent"
                          >
                            <option value="">—</option>
                            {QUALITATIVE_LEVELS.map((lvl) => <option key={lvl} value={lvl}>{lvl}</option>)}
                          </select>
                        ) : (
                          <input
                            type="number"
                            min={0}
                            max={10}
                            step={0.1}
                            value={studentScores[c.id] ?? ''}
                            onChange={(e) => {
                              const num = Math.min(10, Math.max(0, parseFloat(e.target.value.replace(',', '.')) || 0));
                              handleChange(student.id, c.id, num);
                            }}
                            className="w-16 text-center border border-lav-200 rounded-xl px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="—"
                          />
                        )}
                      </td>
                    ))
                  )}
                  <td className="px-3 py-2 text-center">
                    {status ? (
                      <span className={`inline-flex items-center justify-center w-9 h-7 rounded-lg text-xs font-bold ${STATUS_BADGE[status].className}`}>
                        {STATUS_BADGE[status].label}
                      </span>
                    ) : (
                      <span className={`font-bold text-base ${
                        final >= 9 ? 'text-mint-600' : final >= 7 ? 'text-accent' :
                        final >= 5 ? 'text-butter-600' : 'text-rose-500'
                      }`}>
                        {hasScores ? (scoreType === 'qualitative' ? valueToQualitative(final) : final.toFixed(1)) : '—'}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <Button size="sm" onClick={handleSave} disabled={saving} icon={saved ? <IconCheck size={16} /> : undefined}>
          {saved ? t('grades.gradesSaved') : t('grades.saveGrades')}
        </Button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------
// Comentario automático según la nota final, con plantilla por asignatura.
// -----------------------------------------------------------------------
function describeBlendedGrade(b: BlendedGrade | undefined): string {
  if (!b) return '';
  if (b.type === 'numeric') return `${b.value.toFixed(1)} sobre 10`;
  return `${b.value} (${QUALITATIVE_LEVEL_LABELS[b.value]})`;
}

function CommentModal({
  student, nameFormat, defaultSubjectId, defaultBlended, defaultOverride, subjects, ownerId, schoolYearId, termId,
  etapas, comunitat, hasGeminiKey, onClose,
}: {
  student: Student;
  nameFormat: StudentNameFormat;
  defaultSubjectId: string;
  defaultBlended: BlendedGrade | undefined;
  defaultOverride: TermFinalGradeOverride | undefined;
  subjects: Subject[];
  ownerId: string;
  schoolYearId: string;
  termId: string;
  etapas: Etapa[];
  comunitat: Comunitat;
  hasGeminiKey: boolean;
  onClose: () => void;
}) {
  const { t, i18n } = useTranslation();
  const [subjectId, setSubjectId] = useState(defaultSubjectId);
  const [loading, setLoading] = useState(false);
  const [blended, setBlended] = useState<BlendedGrade | undefined>(
    defaultOverride?.overrideValue !== undefined
      ? { type: 'numeric', value: defaultOverride.overrideValue }
      : defaultOverride?.overrideLevel
      ? { type: 'qualitative', value: defaultOverride.overrideLevel }
      : defaultBlended
  );
  const [template, setTemplate] = useState<GradeCommentTemplate | null>(null);
  const [copied, setCopied] = useState(false);

  // Comentario guardado (persistido en TermFinalGradeOverride), visible
  // directamente en la libreta de notas.
  const [savedComment, setSavedComment] = useState(defaultOverride?.comment ?? '');
  const [savingComment, setSavingComment] = useState(false);
  const [commentSaved, setCommentSaved] = useState(false);

  // "Banco de frases" (automático según la nota, configurado en Comentarios)
  // vs "Generar con Profi" (comentario personalizado con IA).
  const [subMode, setSubMode] = useState<'bank' | 'profi'>('bank');
  const [loadError, setLoadError] = useState('');
  const [profiCeIds, setProfiCeIds] = useState<Set<string>>(new Set());
  const [extraDetails, setExtraDetails] = useState('');
  const [profiText, setProfiText] = useState('');
  const [profiLoading, setProfiLoading] = useState(false);
  const [profiError, setProfiError] = useState('');
  const [profiCopied, setProfiCopied] = useState(false);

  // Anotaciones de seguimiento de tutoría del alumno (apartado Alumnat),
  // para poder incluir el contexto de las categorías que elija el docente
  // (actitud, comportamiento...) al generar el comentario con Profi.
  const [tutoringNotes, setTutoringNotes] = useState<StudentNote[]>([]);
  const [tutoringCategories, setTutoringCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    return subscribeStudentNotes(ownerId, student.id, setTutoringNotes);
  }, [ownerId, student.id]);

  const tutoringCategoryOptions = useMemo(() => {
    const cats = new Set(tutoringNotes.map((n) => n.category || t('grades.tutoringGeneral')));
    return Array.from(cats);
  }, [tutoringNotes, t]);

  function toggleTutoringCategory(category: string) {
    setTutoringCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category); else next.add(category);
      return next;
    });
  }

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setLoadError('');
      try {
        if (subjectId === defaultSubjectId) {
          setBlended(
            defaultOverride?.overrideValue !== undefined
              ? { type: 'numeric', value: defaultOverride.overrideValue }
              : defaultOverride?.overrideLevel
              ? { type: 'qualitative', value: defaultOverride.overrideLevel }
              : defaultBlended
          );
          setSavedComment(defaultOverride?.comment ?? '');
        } else {
          const [subjActivities, subjEntries, override] = await Promise.all([
            getGradebookActivitiesOnce(ownerId, schoolYearId, subjectId, termId),
            getGradeEntriesOnce(ownerId, schoolYearId, subjectId, termId),
            getTermFinalGradeOverrideOnce(subjectId, student.id, termId),
          ]);
          if (cancelled) return;
          if (override?.overrideValue !== undefined) {
            setBlended({ type: 'numeric', value: override.overrideValue });
          } else if (override?.overrideLevel) {
            setBlended({ type: 'qualitative', value: override.overrideLevel });
          } else {
            const items = subjActivities
              .map((a) => {
                const entry = subjEntries.find((e) => e.studentId === student.id && e.activityId === a.id);
                if (!entry) return null;
                return { finalScore: entry.finalScore, qualitativeLevel: entry.qualitativeLevel, weight: a.weight, scoreType: a.scoreType };
              })
              .filter((x): x is NonNullable<typeof x> => x !== null);
            setBlended(computeBlendedGrade(items));
          }
          setSavedComment(override?.comment ?? '');
        }
        const tpl = await getGradeCommentTemplateOnce(subjectId, termId);
        if (cancelled) return;
        setTemplate(tpl);
        setProfiCeIds(new Set(tpl?.profiCeIds ?? []));
        setProfiText('');
        setExtraDetails('');
        setProfiError('');
      } catch (err) {
        if (!cancelled) setLoadError(err instanceof Error ? err.message : String(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectId]);

  const band = useMemo(() => {
    if (!template || !blended) return null;
    if (template.mode === 'qualitative') {
      const level = blended.type === 'qualitative' ? blended.value : valueToQualitative(blended.value);
      return template.bands.find((b) => b.level === level) ?? null;
    }
    const value = blended.type === 'numeric' ? blended.value : QUALITATIVE_VALUES[blended.value];
    return template.bands.find((b) => value >= (b.min ?? 0) && value <= (b.max ?? 10)) ?? null;
  }, [template, blended]);

  const text = band ? band.text.replace(/\{nombre\}/gi, student.firstName) : '';
  const subject = subjects.find((s) => s.id === subjectId);

  // Currículum de la etapa real de esta asignatura (según su curso), no uno
  // combinado de todas las etapas del docente: evita mezclar CE de otra
  // etapa cuando un àrea se llama igual en las dos (p.ej. "Matemàtiques" en
  // ESO y Batxillerat).
  const curriculum = getCurriculumForSubject(comunitat, subject?.courseLevel, etapas);
  const subjectCe = useMemo(() => {
    const areas = subject?.curriculumAreas ?? [];
    const list: { key: string; ce: CompetenciaEspecifica }[] = [];
    for (const area of areas) {
      const areaData = curriculum?.competencies?.[area];
      if (!areaData) continue;
      for (const ce of areaData.competencies) {
        list.push({ key: `${area}::${ce.id}`, ce });
      }
    }
    return list;
  }, [subject, curriculum]);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSaveComment(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    setSavingComment(true);
    try {
      await setTermFinalGradeComment(ownerId, schoolYearId, subjectId, student.id, termId, trimmed);
      setSavedComment(trimmed);
      setCommentSaved(true);
      setTimeout(() => setCommentSaved(false), 2000);
    } finally {
      setSavingComment(false);
    }
  }

  async function handleClearComment() {
    setSavingComment(true);
    try {
      await clearTermFinalGradeComment(subjectId, student.id, termId);
      setSavedComment('');
    } finally {
      setSavingComment(false);
    }
  }

  async function handleToggleCe(next: Set<string>) {
    setProfiCeIds(next);
    try {
      await setGradeCommentTemplate(ownerId, subjectId, termId, { profiCeIds: Array.from(next) });
    } catch {
      // Preferencia opcional: si falla el guardado no bloqueamos la generación del comentario.
    }
  }

  async function handleGenerateProfi() {
    if (!blended) return;
    setProfiLoading(true);
    setProfiError('');
    try {
      const priorityCe: PriorityCe[] = subjectCe
        .filter((c) => profiCeIds.has(c.key))
        .map((c) => ({ id: c.ce.id, title: c.ce.title, description: c.ce.description }));
      const studentName = student.lastName ? `${student.firstName} ${student.lastName}` : student.firstName;
      const tutoringText = tutoringNotes
        .filter((n) => tutoringCategories.has(n.category || t('grades.tutoringGeneral')))
        .map((n) => `- ${n.text}`)
        .join('\n');
      const combinedExtra = [
        tutoringText ? `${t('grades.tutoringContextLabel')}:\n${tutoringText}` : '',
        extraDetails.trim(),
      ].filter(Boolean).join('\n\n');
      const comment = await generateGradeComment({
        studentName,
        subjectName: subject?.name ?? '',
        courseLevel: subject?.courseLevel,
        gradeDescription: describeBlendedGrade(blended),
        priorityCe: priorityCe.length > 0 ? priorityCe : undefined,
        extraDetails: combinedExtra || undefined,
        language: i18n.language,
      });
      setProfiText(comment);
    } catch (err) {
      setProfiError(err instanceof Error ? err.message : String(err));
    } finally {
      setProfiLoading(false);
    }
  }

  async function handleCopyProfi() {
    await navigator.clipboard.writeText(profiText);
    setProfiCopied(true);
    setTimeout(() => setProfiCopied(false), 2000);
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={`${t('grades.comment')} · ${formatStudentName(student, nameFormat)}`}
      widthClass="max-w-lg"
    >
      <div className="flex flex-col gap-4">
        <Select label={t('grades.selectSubject')} value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
          {subjects.map((s) => <option key={s.id} value={s.id}>{subjectDisplayName(s)}</option>)}
        </Select>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSubMode('bank')}
            className={`text-xs font-semibold rounded-full px-3 py-1.5 ${subMode === 'bank' ? 'bg-accent text-white' : 'bg-accent-light text-accent'}`}
          >
            {t('grades.commentModeBank')}
          </button>
          <button
            type="button"
            onClick={() => setSubMode('profi')}
            className={`text-xs font-semibold rounded-full px-3 py-1.5 inline-flex items-center gap-1 ${subMode === 'profi' ? 'bg-accent text-white' : 'bg-accent-light text-accent'}`}
          >
            <IconSparkles size={13} />
            {t('grades.commentModeProfi')}
          </button>
        </div>

        <div className="bg-accent-light rounded-2xl p-3.5 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-accent">{t('grades.savedComment')}</p>
            {commentSaved && <span className="text-[11px] font-medium text-emerald-600">{t('common.saved')}</span>}
          </div>
          <Textarea
            value={savedComment}
            onChange={(e) => setSavedComment(e.target.value)}
            placeholder={t('grades.savedCommentPlaceholder')}
            rows={3}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={() => handleSaveComment(savedComment)} disabled={savingComment || !savedComment.trim()}>
              {t('common.save')}
            </Button>
            {savedComment && (
              <Button size="sm" variant="secondary" onClick={handleClearComment} disabled={savingComment}>
                {t('common.delete')}
              </Button>
            )}
          </div>
        </div>

        {loadError && (
          <p className="text-xs text-rose-600 bg-rose-50 rounded-xl px-3 py-2">{t('common.error')}: {loadError}</p>
        )}

        {loading ? (
          <p className="text-sm text-ink-soft">{t('common.loading')}</p>
        ) : subMode === 'bank' ? (
          <>
            {!blended ? (
              <p className="text-sm text-ink-soft">{t('grades.noGradeYet')}</p>
            ) : !template ? (
              <p className="text-sm text-ink-soft">{t('grades.noCommentTemplate', { subject: subject ? subjectDisplayName(subject) : '' })}</p>
            ) : !band ? (
              <p className="text-sm text-ink-soft">{t('grades.noMatchingBand')}</p>
            ) : (
              <div className="bg-accent-light rounded-2xl p-3.5">
                <p className="text-sm text-ink whitespace-pre-wrap">{text}</p>
              </div>
            )}

            {text && (
              <div className="flex gap-2 flex-wrap">
                <Button onClick={handleCopy} icon={copied ? <IconCheck size={16} /> : <IconCopy size={16} />} className="self-start">
                  {copied ? t('comments.copied') : t('comments.copyComment')}
                </Button>
                <Button variant="secondary" onClick={() => handleSaveComment(text)} disabled={savingComment} className="self-start">
                  {t('grades.useAsComment')}
                </Button>
              </div>
            )}
          </>
        ) : !blended ? (
          <p className="text-sm text-ink-soft">{t('grades.noGradeYet')}</p>
        ) : (
          <>
            {!hasGeminiKey && (
              <p className="text-xs text-butter-600 bg-butter-50 rounded-xl px-3 py-2">{t('grades.needsGeminiKey')}</p>
            )}

            {subjectCe.length > 0 && (
              <TagMultiSelect
                label={t('grades.profiPriorityCe')}
                options={subjectCe.map(({ key, ce }) => ({ key, label: `${ce.id} — ${ce.title}`, chipLabel: ce.id, hint: ce.description }))}
                selected={profiCeIds}
                onChange={handleToggleCe}
                placeholder={t('grades.profiPriorityCePlaceholder')}
              />
            )}

            {tutoringCategoryOptions.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  {t('grades.tutoringSectionLabel')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tutoringCategoryOptions.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleTutoringCategory(cat)}
                      className={`text-xs font-semibold rounded-full px-3 py-1.5 ${tutoringCategories.has(cat) ? 'bg-accent text-white' : 'bg-accent-light text-accent'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Textarea
              label={t('grades.profiExtraDetails')}
              placeholder={t('grades.profiExtraDetailsPlaceholder')}
              value={extraDetails}
              onChange={(e) => setExtraDetails(e.target.value)}
              rows={2}
            />

            <Button
              variant="secondary"
              icon={<IconSparkles size={16} />}
              onClick={handleGenerateProfi}
              disabled={profiLoading}
              className="self-start"
            >
              {profiLoading ? t('grades.profiGenerating') : profiText ? t('grades.regenerate') : t('grades.generateWithProfi')}
            </Button>

            {profiError && (
              <p className="text-xs text-rose-600 bg-rose-50 rounded-xl px-3 py-2">{profiError}</p>
            )}

            {profiText && (
              <>
                <Textarea value={profiText} onChange={(e) => setProfiText(e.target.value)} rows={4} />
                <div className="flex gap-2 flex-wrap">
                  <Button
                    onClick={handleCopyProfi}
                    icon={profiCopied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                    className="self-start"
                  >
                    {profiCopied ? t('comments.copied') : t('comments.copyComment')}
                  </Button>
                  <Button variant="secondary" onClick={() => handleSaveComment(profiText)} disabled={savingComment} className="self-start">
                    {t('grades.useAsComment')}
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}

// -----------------------------------------------------------------------
// Panel de gestión de rúbricas
// -----------------------------------------------------------------------
function RubricsPanel({
  ownerId, schoolYearId, myRubrics, subjects, etapas, comunitat, onClose,
}: {
  ownerId: string;
  schoolYearId: string;
  myRubrics: Rubric[];
  subjects: Subject[];
  etapas: Etapa[];
  comunitat: Comunitat;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [showNewRubric, setShowNewRubric] = useState(false);
  const [showFromCompetencies, setShowFromCompetencies] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [newRubricName, setNewRubricName] = useState('');
  const [saving, setSaving] = useState(false);
  const [viewingRubric, setViewingRubric] = useState<Rubric | null>(null);
  // Las rúbricas sintéticas "de nota manual" (creadas automáticamente al
  // añadir una actividad sin rúbrica, ver ActivityModal) no son rúbricas
  // reales que el docente haya diseñado, así que no se muestran aquí.
  const visibleRubrics = useMemo(() => myRubrics.filter((r) => !r.isManual), [myRubrics]);

  async function handleImport(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    setImportErrors([]);
    try {
      const { criteria, errors } = await parseRubricFile(file);
      if (errors.length > 0) { setImportErrors(errors); return; }
      if (criteria.length > 0) {
        await createRubric(ownerId, schoolYearId, { name: file.name.replace(/\.[^.]+$/, ''), criteria });
      }
    } finally {
      setImporting(false);
    }
  }

  return (
    <>
      <Modal open onClose={onClose} title={t('grades.rubrics')} widthClass="max-w-2xl">
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
              <h3 className="font-display text-base text-ink">{t('grades.myRubrics')}</h3>
              <div className="flex gap-2 flex-wrap">
                <Button size="sm" variant="secondary" icon={<IconDownload size={14} />} onClick={downloadRubricTemplate}>
                  {t('grades.downloadTemplate')}
                </Button>
                <label className="cursor-pointer">
                  <span className="btn-pill inline-flex items-center gap-1.5 font-semibold px-4 py-2 text-sm bg-theme-card text-ink border border-theme hover:bg-accent-light rounded-full">
                    <IconUpload size={14} />
                    {importing ? '...' : t('grades.importExcel')}
                  </span>
                  <input type="file" accept=".xlsx,.xls" className="hidden" onChange={handleImport} disabled={importing} />
                </label>
                <Button size="sm" variant="secondary" icon={<IconPlus size={14} />} onClick={() => setShowFromCompetencies(true)}>
                  Crear desde competencias
                </Button>
                <Button size="sm" icon={<IconPlus size={14} />} onClick={() => setShowNewRubric(true)}>
                  {t('grades.newRubric')}
                </Button>
              </div>
            </div>

            {importErrors.length > 0 && (
              <div className="bg-rose-50 rounded-2xl p-3 mb-3">
                <p className="text-sm font-semibold text-rose-600 mb-1">{t('grades.importErrors')}</p>
                {importErrors.map((e, i) => <p key={i} className="text-xs text-rose-500">{e}</p>)}
              </div>
            )}

            {visibleRubrics.length === 0 ? (
              <p className="text-sm text-ink-soft">{t('grades.noRubrics')}</p>
            ) : (
              <div className="flex flex-col gap-2">
                {visibleRubrics.map((r) => (
                  <div key={r.id} className="flex items-center justify-between bg-mint-50 rounded-2xl px-3 py-2">
                    <div>
                      <p className="text-sm font-semibold text-ink">{r.name}</p>
                      <p className="text-xs text-ink-soft">{t('weekly.criteriaCount', { count: r.criteria.length })}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => setViewingRubric(r)}>
                        {t('grades.viewEdit')}
                      </Button>
                      <button onClick={() => deleteRubric(r.id)} className="text-ink-soft hover:text-rose-600" aria-label={t('grades.deleteRubric')}>
                        <IconTrash size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {showNewRubric && (
          <Modal open onClose={() => setShowNewRubric(false)} title={t('grades.newRubric')} widthClass="max-w-sm">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-ink-soft">
                {t('grades.newRubricHelp')}
              </p>
              <Input label={t('grades.rubricName')} value={newRubricName} onChange={(e) => setNewRubricName(e.target.value)} autoFocus />
              <div className="flex gap-2">
                <Button disabled={!newRubricName.trim() || saving} onClick={async () => {
                  setSaving(true);
                  try {
                    await createRubric(ownerId, schoolYearId, { name: newRubricName.trim(), criteria: [] });
                    setNewRubricName('');
                    setShowNewRubric(false);
                  } finally { setSaving(false); }
                }}>
                  {t('common.save')}
                </Button>
                <Button variant="ghost" onClick={() => setShowNewRubric(false)}>{t('common.cancel')}</Button>
              </div>
            </div>
          </Modal>
        )}
      </Modal>

      {showFromCompetencies && (
        <NewRubricFromCompetenciesModal
          ownerId={ownerId}
          schoolYearId={schoolYearId}
          subjects={subjects}
          etapas={etapas}
          comunitat={comunitat}
          onClose={() => setShowFromCompetencies(false)}
        />
      )}

      {viewingRubric && (
        <RubricDetailModal
          rubric={viewingRubric}
          onClose={() => setViewingRubric(null)}
        />
      )}
    </>
  );
}

// -----------------------------------------------------------------------
// Crear rúbrica manual a partir de las Competències Específiques i Criteris
// d'Avaluació de una asignatura (sin IA) — el docente marca las CE que
// quiere incluir y luego edita los indicadores por nivel a su gusto.
// -----------------------------------------------------------------------
function NewRubricFromCompetenciesModal({
  ownerId, schoolYearId, subjects, etapas, comunitat, onClose,
}: {
  ownerId: string;
  schoolYearId: string;
  subjects: Subject[];
  etapas: Etapa[];
  comunitat: Comunitat;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id ?? '');
  const [selectedAreas, setSelectedAreas] = useState<Set<string>>(new Set());
  const [selectedCeKeys, setSelectedCeKeys] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);

  const subject = subjects.find((s) => s.id === selectedSubjectId);
  // Currículum de la etapa real de la asignatura elegida (según su curso),
  // no uno combinado de todas las etapas del docente: evita mezclar CE de
  // otra etapa cuando un àrea se llama igual en las dos (p.ej.
  // "Matemàtiques" en ESO y Batxillerat).
  const curriculum = getCurriculumForSubject(comunitat, subject?.courseLevel, etapas);
  const ceAreaNames = useMemo(() => Object.keys(curriculum?.competencies ?? {}), [curriculum]);

  useEffect(() => {
    const guess = subject ? guessAreaName(subject.name, ceAreaNames) : '';
    setSelectedAreas(guess ? new Set([guess]) : new Set());
    setSelectedCeKeys(new Set());
  }, [selectedSubjectId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Pool de CE de todas las àrees marcadas, con clave compuesta "àrea::CEx"
  // para poder combinar competencias de varias àrees (p.ex. "Ambientes") sin
  // que colisionen los ids "CE1", "CE2"... que se repiten en cada àrea.
  const pooledCe = useMemo(() => {
    const list: { key: string; area: string; ce: CompetenciaEspecifica }[] = [];
    for (const area of selectedAreas) {
      const areaData = curriculum?.competencies?.[area];
      if (!areaData) continue;
      for (const ce of areaData.competencies) {
        list.push({ key: `${area}::${ce.id}`, area, ce });
      }
    }
    return list;
  }, [selectedAreas, curriculum]);

  async function handleCreate() {
    if (!subject || selectedCeKeys.size === 0) return;
    setSaving(true);
    try {
      const selected = pooledCe.filter((item) => selectedCeKeys.has(item.key));
      const equalWeight = Math.floor(100 / selected.length);
      const criteria: GradingCriterion[] = selected.map(({ area, ce }, i) => {
        const criteris = allCriteris(ce);
        const criterisText = criteris.join(' · ');
        const codes = extractCriteriCodes(criteris);
        return {
          id: crypto.randomUUID(),
          name: ce.title,
          description: ce.description,
          weight: i === 0 ? 100 - equalWeight * (selected.length - 1) : equalWeight,
          indicators: ['', '', '', ''],
          ceId: ce.id,
          ceName: ce.title,
          ceLabel: `${area} · ${ce.id}${codes ? ` · ${codes}` : ''}`,
          ...(criterisText ? { ceReference: `${ce.description}\n\nCriteris d'avaluació: ${criterisText}` } : {}),
        };
      });
      await createRubric(ownerId, schoolYearId, {
        name: t('grades.rubricFromCompetenciesName', { subject: subjectDisplayName(subject) }),
        subjectId: subject.id,
        criteria,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={t('grades.createFromCompetencies')} widthClass="max-w-lg">
      <div className="flex flex-col gap-4">
        <Select
          label={t('grades.selectSubjectForRubric')}
          value={selectedSubjectId}
          onChange={(e) => setSelectedSubjectId(e.target.value)}
        >
          {subjects.map((s) => <option key={s.id} value={s.id}>{subjectDisplayName(s)}</option>)}
        </Select>

        {ceAreaNames.length === 0 ? (
          <p className="text-sm text-ink-soft">
            {t('grades.noCeLoadedHelp')}
          </p>
        ) : (
          <>
            <TagMultiSelect
              label={t('grades.curriculumAreasComboLabel')}
              options={ceAreaNames.map((a) => ({ key: a, label: a }))}
              selected={selectedAreas}
              onChange={setSelectedAreas}
              placeholder={t('grades.selectAreasPlaceholder')}
            />

            {pooledCe.length > 0 && (
              <TagMultiSelect
                label={t('grades.ceToIncludeLabel')}
                options={pooledCe.map(({ key, area, ce }) => ({
                  key,
                  label: `${ce.id} — ${ce.title}${selectedAreas.size > 1 ? ` (${area})` : ''}`,
                  chipLabel: selectedAreas.size > 1 ? `${ce.id} · ${area}` : ce.id,
                  hint: `${ce.title}\n\n${ce.description}`,
                }))}
                selected={selectedCeKeys}
                onChange={setSelectedCeKeys}
                placeholder={t('grades.selectCePlaceholder')}
              />
            )}
          </>
        )}

        <div className="flex gap-2 pt-1">
          <Button disabled={!subject || selectedCeKeys.size === 0 || saving} onClick={handleCreate}>
            {saving ? t('grades.creating') : t('grades.createRubricWithCount', { count: selectedCeKeys.size })}
          </Button>
          <Button variant="ghost" onClick={onClose}>{t('common.cancel')}</Button>
        </div>
      </div>
    </Modal>
  );
}

// -----------------------------------------------------------------------
// Modal de detalle/edición de una rúbrica
// -----------------------------------------------------------------------
function RubricDetailModal({ rubric, onClose }: { rubric: Rubric; onClose: () => void }) {
  const { t } = useTranslation();
  const [name, setName] = useState(rubric.name);
  const [criteria, setCriteria] = useState<GradingCriterion[]>(rubric.criteria);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const isEditable = !rubric.isLomloe;

  const dirty = name !== rubric.name || JSON.stringify(criteria) !== JSON.stringify(rubric.criteria);

  async function handleSaveAll() {
    if (!dirty) return;
    setSaving(true);
    try {
      await updateRubric(rubric.id, { name: name.trim() || rubric.name, criteria });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={rubric.isLomloe ? rubric.name : t('grades.editRubric')} widthClass="max-w-3xl">
      <div className="flex flex-col gap-5">
        {rubric.community && (
          <p className="text-xs text-accent font-semibold bg-accent-light rounded-full px-3 py-1 self-start">
            {rubric.community}
          </p>
        )}

        {isEditable && (
          <Input
            label={t('grades.rubricName')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <RubricCriteriaEditor
          criteria={criteria}
          onChange={setCriteria}
          readOnly={!isEditable}
          newCriterion={() => ({ id: crypto.randomUUID(), name: '', description: '', weight: 0, indicators: ['', '', '', ''] as [string, string, string, string] })}
        />

        {isEditable && (
          <div className="flex items-center justify-end gap-2 pt-1">
            <Button
              disabled={saving || !dirty}
              icon={saved ? <IconCheck size={14} /> : undefined}
              onClick={handleSaveAll}
            >
              {saved ? t('common.saved') : t('grades.saveChanges')}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
