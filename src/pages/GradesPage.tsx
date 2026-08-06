import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import { subscribeSubjects } from '@/firebase/subjects';
import { subscribeStudents } from '@/firebase/students';
import {
  subscribeRubrics,
  subscribeGradeEntries,
  createRubric,
  deleteRubric,
  upsertGradeEntry,
  calculateFinalScore,
  gradeLabel,
} from '@/firebase/grades';
import { LOMLOE_RUBRICAS, LOMLOE_COMMUNITIES } from '@/data/lomloRubricas';
import { downloadRubricTemplate, parseRubricFile } from '@/utils/rubricExcel';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import { IconPlus, IconTrash, IconDownload, IconUpload, IconCheck } from '@/components/ui/icons';
import type { Subject, Student, Rubric, GradeEntry, Evaluation } from '@/types';
import { EVALUATIONS } from '@/types';
import type { ChangeEvent } from 'react';

const EVAL_LABELS: Record<Evaluation, string> = {
  '1': 'grades.eval1',
  '2': 'grades.eval2',
  '3': 'grades.eval3',
};

export default function GradesPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const { activeYear } = useSchoolYears();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [myRubrics, setMyRubrics] = useState<Rubric[]>([]);
  const [gradeEntries, setGradeEntries] = useState<GradeEntry[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedEval, setSelectedEval] = useState<Evaluation>('1');
  const [selectedRubricId, setSelectedRubricId] = useState('');
  const [showRubricsPanel, setShowRubricsPanel] = useState(false);

  useEffect(() => {
    if (!user || !activeYear) return;
    const unsub1 = subscribeSubjects(user.uid, activeYear.id, setSubjects);
    const unsub2 = subscribeStudents(user.uid, activeYear.id, setStudents);
    const unsub3 = subscribeRubrics(user.uid, activeYear.id, setMyRubrics);
    return () => { unsub1(); unsub2(); unsub3(); };
  }, [user, activeYear]);

  const effectiveSubjectId = selectedSubjectId || subjects[0]?.id || '';
  const selectedSubject = subjects.find((s) => s.id === effectiveSubjectId);

  const allRubrics: Rubric[] = useMemo(
    () => [...LOMLOE_RUBRICAS, ...myRubrics],
    [myRubrics]
  );
  const effectiveRubricId = selectedRubricId || allRubrics[0]?.id || '';
  const selectedRubric = allRubrics.find((r) => r.id === effectiveRubricId);

  const subjectStudents = useMemo(
    () => students.filter((s) => s.groupId === selectedSubject?.studentGroupId),
    [students, selectedSubject]
  );

  useEffect(() => {
    if (!user || !effectiveSubjectId || !effectiveRubricId || !activeYear) return;
    return subscribeGradeEntries(
      user.uid, activeYear.id, effectiveSubjectId, selectedEval, setGradeEntries
    );
  }, [user, activeYear, effectiveSubjectId, effectiveRubricId, selectedEval]);

  // key único para resetear GradeTable al cambiar selección
  const tableKey = `${effectiveSubjectId}-${selectedEval}-${effectiveRubricId}`;

  if (!activeYear) return <p className="text-sm text-ink-soft">{t('schoolYear.noYears')}</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl text-lav-600 mb-1">{t('grades.title')}</h1>
          <p className="text-sm text-ink-soft">{t('grades.subtitle')}</p>
        </div>
        <Button variant="secondary" onClick={() => setShowRubricsPanel(true)}>
          {t('grades.rubrics')}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Select label={t('grades.selectSubject')} value={effectiveSubjectId} onChange={(e) => setSelectedSubjectId(e.target.value)}>
          {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </Select>
        <Select label={t('grades.evaluation')} value={selectedEval} onChange={(e) => setSelectedEval(e.target.value as Evaluation)}>
          {EVALUATIONS.map((ev) => <option key={ev} value={ev}>{t(EVAL_LABELS[ev])}</option>)}
        </Select>
        <Select label={t('grades.selectRubric')} value={effectiveRubricId} onChange={(e) => setSelectedRubricId(e.target.value)}>
          <optgroup label={t('grades.lomloRubrics')}>
            {LOMLOE_RUBRICAS.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </optgroup>
          {myRubrics.length > 0 && (
            <optgroup label={t('grades.myRubrics')}>
              {myRubrics.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </optgroup>
          )}
        </Select>
      </div>

      {!selectedRubric ? (
        <Card className="text-sm text-ink-soft">{t('grades.selectRubric')}</Card>
      ) : subjectStudents.length === 0 ? (
        <Card className="text-sm text-ink-soft">{t('grades.noStudents')}</Card>
      ) : (
        <GradeTable
          key={tableKey}
          rubric={selectedRubric}
          students={subjectStudents}
          gradeEntries={gradeEntries}
          ownerId={user!.uid}
          schoolYearId={activeYear.id}
          subjectId={effectiveSubjectId}
          rubricId={effectiveRubricId}
          evaluation={selectedEval}
        />
      )}

      {showRubricsPanel && (
        <RubricsPanel
          ownerId={user!.uid}
          schoolYearId={activeYear.id}
          myRubrics={myRubrics}
          onClose={() => setShowRubricsPanel(false)}
        />
      )}
    </div>
  );
}

// -----------------------------------------------------------------------
// Tabla de notas — estado local de edición, reseteado via key
// -----------------------------------------------------------------------
function GradeTable({
  rubric, students, gradeEntries, ownerId, schoolYearId, subjectId, rubricId, evaluation,
}: {
  rubric: Rubric;
  students: Student[];
  gradeEntries: GradeEntry[];
  ownerId: string;
  schoolYearId: string;
  subjectId: string;
  rubricId: string;
  evaluation: Evaluation;
}) {
  const { t } = useTranslation();

  const initialScores = useMemo(() => {
    const map: Record<string, Record<string, number>> = {};
    gradeEntries.forEach((e) => { if (e.rubricId === rubricId) map[e.studentId] = { ...e.scores }; });
    return map;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [scores, setScores] = useState<Record<string, Record<string, number>>>(initialScores);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleChange(studentId: string, criterionId: string, value: string) {
    const num = Math.min(10, Math.max(0, parseFloat(value.replace(',', '.')) || 0));
    setScores((prev) => ({ ...prev, [studentId]: { ...(prev[studentId] ?? {}), [criterionId]: num } }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await Promise.all(
        students.map((student) => {
          const studentScores = scores[student.id] ?? {};
          const finalScore = calculateFinalScore(studentScores, rubric.criteria);
          return upsertGradeEntry(ownerId, schoolYearId, {
            studentId: student.id,
            subjectId,
            rubricId,
            evaluation,
            scores: studentScores,
            finalScore,
          });
        })
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-0 min-w-[700px]">
          <thead>
            <tr className="bg-lav-50">
              <th className="text-left px-3 py-2 rounded-l-2xl text-ink font-semibold w-48">
                {t('students.students')}
              </th>
              {rubric.criteria.map((c) => (
                <th key={c.id} className="text-center px-2 py-2 text-ink font-semibold text-xs">
                  <div>{c.name}</div>
                  <div className="text-ink-soft font-normal">({c.weight}%)</div>
                </th>
              ))}
              <th className="text-center px-3 py-2 rounded-r-2xl text-lav-600 font-semibold">
                {t('grades.finalScore')}
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const studentScores = scores[student.id] ?? {};
              const hasScores = Object.keys(studentScores).length > 0;
              const final = calculateFinalScore(studentScores, rubric.criteria);
              return (
                <tr key={student.id} className="border-b border-lav-50">
                  <td className="px-3 py-2 font-medium text-ink">
                    {student.lastName ? `${student.lastName}, ${student.firstName}` : student.firstName}
                  </td>
                  {rubric.criteria.map((c) => (
                    <td key={c.id} className="px-2 py-1.5 text-center">
                      <input
                        type="number"
                        min={0}
                        max={10}
                        step={0.1}
                        value={studentScores[c.id] ?? ''}
                        onChange={(e) => handleChange(student.id, c.id, e.target.value)}
                        className="w-16 text-center border border-lav-200 rounded-xl px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-lav-300"
                        placeholder="—"
                      />
                    </td>
                  ))}
                  <td className="px-3 py-2 text-center">
                    <span className={`font-bold text-base ${
                      final >= 9 ? 'text-mint-600' : final >= 7 ? 'text-lav-600' :
                      final >= 5 ? 'text-butter-600' : 'text-rose-500'
                    }`}>
                      {hasScores ? final.toFixed(1) : '—'}
                    </span>
                    {hasScores && <div className="text-xs text-ink-soft">{gradeLabel(final)}</div>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} icon={saved ? <IconCheck size={16} /> : undefined}>
          {saved ? t('grades.gradesSaved') : t('grades.saveGrades')}
        </Button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------
// Panel de gestión de rúbricas
// -----------------------------------------------------------------------
function RubricsPanel({
  ownerId, schoolYearId, myRubrics, onClose,
}: {
  ownerId: string;
  schoolYearId: string;
  myRubrics: Rubric[];
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [showNewRubric, setShowNewRubric] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [newRubricName, setNewRubricName] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [saving, setSaving] = useState(false);

  const filteredLomloe = selectedCommunity
    ? LOMLOE_RUBRICAS.filter((r) => r.community === selectedCommunity)
    : LOMLOE_RUBRICAS;

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
    <Modal open onClose={onClose} title={t('grades.rubrics')} widthClass="max-w-2xl">
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="font-display text-base text-ink mb-2">{t('grades.lomloRubrics')}</h3>
          <Select value={selectedCommunity} onChange={(e) => setSelectedCommunity(e.target.value)} className="mb-3 max-w-xs">
            <option value="">{t('grades.allCommunities')}</option>
            {LOMLOE_COMMUNITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
          <div className="flex flex-col gap-2">
            {filteredLomloe.map((r) => (
              <div key={r.id} className="flex items-center justify-between bg-lav-50 rounded-2xl px-3 py-2">
                <div>
                  <p className="text-sm font-semibold text-ink">{r.name}</p>
                  <p className="text-xs text-ink-soft">{r.community} · {r.criteria.length} criterios</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <h3 className="font-display text-base text-ink">{t('grades.myRubrics')}</h3>
            <div className="flex gap-2 flex-wrap">
              <Button size="sm" variant="secondary" icon={<IconDownload size={14} />} onClick={downloadRubricTemplate}>
                {t('grades.downloadTemplate')}
              </Button>
              <label className="cursor-pointer">
                <span className="btn-pill inline-flex items-center gap-1.5 font-semibold px-4 py-2 text-sm bg-white text-ink border border-lav-200 hover:bg-lav-50 rounded-full">
                  <IconUpload size={14} />
                  {importing ? '...' : t('grades.importExcel')}
                </span>
                <input type="file" accept=".xlsx,.xls" className="hidden" onChange={handleImport} disabled={importing} />
              </label>
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

          {myRubrics.length === 0 ? (
            <p className="text-sm text-ink-soft">{t('grades.noRubrics')}</p>
          ) : (
            <div className="flex flex-col gap-2">
              {myRubrics.map((r) => (
                <div key={r.id} className="flex items-center justify-between bg-mint-50 rounded-2xl px-3 py-2">
                  <div>
                    <p className="text-sm font-semibold text-ink">{r.name}</p>
                    <p className="text-xs text-ink-soft">{r.criteria.length} criterios</p>
                  </div>
                  <button onClick={() => deleteRubric(r.id)} className="text-ink-soft hover:text-rose-600" aria-label={t('grades.deleteRubric')}>
                    <IconTrash size={16} />
                  </button>
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
              Para una rúbrica con criterios detallados, usa "Importar desde Excel" con la plantilla descargable.
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
  );
}
