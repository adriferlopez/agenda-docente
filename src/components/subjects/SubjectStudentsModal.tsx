import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  subscribeStudentGroups,
  subscribeStudents,
  createStudentGroup,
  createStudent,
  createStudentsBatch,
  updateStudent,
  deleteStudent,
} from '@/firebase/students';
import { updateSubjectStudentGroup } from '@/firebase/subjects';
import { subscribeStudentAdaptations, setStudentAdaptation } from '@/firebase/studentAdaptations';
import { subscribeRubrics } from '@/firebase/grades';
import { parseStudentsText, type StudentRow } from '@/utils/studentsExcel';
import Button from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import { IconPlus, IconTrash } from '@/components/ui/icons';
import { IconClipboard } from '@/components/ui/icons-extra';
import type { Subject, StudentGroup, Student, StudentAdaptation, Rubric } from '@/types';

interface Props {
  subject: Subject;
  ownerId: string;
  schoolYearId: string;
  onClose: () => void;
}

/**
 * Alumnado de una asignatura, incrustado directamente en Asignaturas (ya no
 * existe una página "Alumnos" separada). Permite vincular/crear el grupo de
 * alumnos, gestionar el listado y marcar adaptaciones curriculares con una
 * rúbrica alternativa por alumno/a.
 */
export default function SubjectStudentsModal({ subject, ownerId, schoolYearId, onClose }: Props) {
  const { t } = useTranslation();
  const [groups, setGroups] = useState<StudentGroup[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [adaptations, setAdaptations] = useState<StudentAdaptation[]>([]);
  const [rubrics, setRubrics] = useState<Rubric[]>([]);
  const [linking, setLinking] = useState(false);
  const [existingGroupId, setExistingGroupId] = useState('');
  const [newGroupName, setNewGroupName] = useState(subject.name);
  const [saving, setSaving] = useState(false);

  const [showAddStudent, setShowAddStudent] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addingStudent, setAddingStudent] = useState(false);
  const [showPasteList, setShowPasteList] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [importRows, setImportRows] = useState<StudentRow[] | null>(null);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState('');

  useEffect(() => {
    const unsubGroups = subscribeStudentGroups(ownerId, schoolYearId, setGroups);
    const unsubStudents = subscribeStudents(ownerId, schoolYearId, setStudents);
    const unsubAdaptations = subscribeStudentAdaptations(ownerId, subject.id, setAdaptations);
    const unsubRubrics = subscribeRubrics(ownerId, schoolYearId, setRubrics);
    return () => {
      unsubGroups();
      unsubStudents();
      unsubAdaptations();
      unsubRubrics();
    };
  }, [ownerId, schoolYearId, subject.id]);

  const group = groups.find((g) => g.id === subject.studentGroupId) ?? null;
  const groupStudents = useMemo(
    () => (group ? students.filter((s) => s.groupId === group.id) : []),
    [students, group]
  );
  const otherGroups = useMemo(
    () => groups.filter((g) => g.id !== subject.studentGroupId),
    [groups, subject.studentGroupId]
  );
  const subjectRubrics = useMemo(
    () => rubrics.filter((r) => r.subjectId === subject.id),
    [rubrics, subject.id]
  );
  const adaptationByStudent = useMemo(() => {
    const map = new Map<string, StudentAdaptation>();
    adaptations.forEach((a) => map.set(a.studentId, a));
    return map;
  }, [adaptations]);

  async function handleCreateGroup(e: FormEvent) {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    setSaving(true);
    try {
      const id = await createStudentGroup(ownerId, schoolYearId, newGroupName.trim());
      await updateSubjectStudentGroup(subject.id, id);
      setLinking(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleLinkExisting() {
    if (!existingGroupId) return;
    setSaving(true);
    try {
      await updateSubjectStudentGroup(subject.id, existingGroupId);
      setLinking(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleAddStudent(e: FormEvent) {
    e.preventDefault();
    if (!group || (!firstName.trim() && !lastName.trim())) return;
    setAddingStudent(true);
    try {
      await createStudent(ownerId, schoolYearId, {
        groupId: group.id,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });
      setFirstName('');
      setLastName('');
      setShowAddStudent(false);
    } finally {
      setAddingStudent(false);
    }
  }

  function handleParsePaste() {
    const rows = parseStudentsText(pasteText);
    setImportRows(rows);
    setShowPasteList(false);
    setPasteText('');
  }

  async function handleConfirmImport() {
    if (!importRows || !group) return;
    setImporting(true);
    setImportError('');
    try {
      await createStudentsBatch(ownerId, schoolYearId, group.id, importRows);
      setImportRows(null);
    } catch (err) {
      setImportError(err instanceof Error ? err.message : String(err));
    } finally {
      setImporting(false);
    }
  }

  async function handleToggleAdaptation(student: Student, hasAdaptation: boolean) {
    const current = adaptationByStudent.get(student.id);
    await setStudentAdaptation(ownerId, subject.id, student.id, {
      hasAdaptation,
      adaptedRubricId: hasAdaptation ? current?.adaptedRubricId : undefined,
    });
  }

  async function handleSetAdaptedRubric(student: Student, rubricId: string) {
    await setStudentAdaptation(ownerId, subject.id, student.id, {
      hasAdaptation: true,
      adaptedRubricId: rubricId || undefined,
    });
  }

  return (
    <Modal open onClose={onClose} title={`${t('subjects.manageStudents')} · ${subject.name}`} widthClass="max-w-lg">
      <div className="flex flex-col gap-4">
        {!group || linking ? (
          <div className="flex flex-col gap-4">
            {otherGroups.length > 0 && (
              <div className="flex flex-col gap-2">
                <Select
                  label={t('subjects.selectGroupOptional')}
                  value={existingGroupId}
                  onChange={(e) => setExistingGroupId(e.target.value)}
                >
                  <option value="">{t('subjects.noGroup')}</option>
                  {otherGroups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </Select>
                <Button size="sm" onClick={handleLinkExisting} disabled={!existingGroupId || saving}>
                  {t('common.save')}
                </Button>
              </div>
            )}
            <form onSubmit={handleCreateGroup} className="flex flex-col gap-2">
              <Input
                label={t('students.newGroup')}
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                autoFocus
              />
              <Button type="submit" size="sm" variant="secondary" disabled={saving || !newGroupName.trim()}>
                {t('students.newGroup')}
              </Button>
            </form>
            {group && linking && (
              <Button variant="ghost" size="sm" onClick={() => setLinking(false)}>
                {t('common.cancel')}
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="text-sm font-semibold text-ink">{group.name}</p>
              <div className="flex gap-2 flex-wrap">
                <Button size="sm" variant="secondary" icon={<IconPlus size={16} />} onClick={() => setShowAddStudent(true)}>
                  {t('students.addStudent')}
                </Button>
                <Button size="sm" variant="secondary" icon={<IconClipboard size={16} />} onClick={() => setShowPasteList(true)}>
                  {t('students.pasteList')}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setLinking(true)}>
                  {t('students.changeGroup')}
                </Button>
              </div>
            </div>

            {groupStudents.length === 0 ? (
              <p className="text-sm text-ink-soft">{t('students.noStudents')}</p>
            ) : (
              <div className="flex flex-col divide-y divide-lav-100">
                {groupStudents.map((student) => (
                  <StudentAdaptationRow
                    key={student.id}
                    student={student}
                    adaptation={adaptationByStudent.get(student.id) ?? null}
                    rubrics={subjectRubrics}
                    onToggleAdaptation={(v) => handleToggleAdaptation(student, v)}
                    onSetRubric={(id) => handleSetAdaptedRubric(student, id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {showAddStudent && (
        <Modal open onClose={() => setShowAddStudent(false)} title={t('students.addStudent')}>
          <form onSubmit={handleAddStudent} className="flex flex-col gap-4">
            <Input label={t('students.firstName')} value={firstName} onChange={(e) => setFirstName(e.target.value)} autoFocus />
            <Input label={t('students.lastName')} value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <div className="flex gap-2">
              <Button type="submit" disabled={addingStudent}>
                {t('common.save')}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowAddStudent(false)}>
                {t('common.cancel')}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {showPasteList && (
        <Modal open onClose={() => setShowPasteList(false)} title={t('students.pasteList')} widthClass="max-w-lg">
          <div className="flex flex-col gap-4">
            <p className="text-xs text-ink-soft">{t('students.pasteListHelp')}</p>
            <Textarea
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              rows={8}
              autoFocus
              placeholder={t('students.pasteListPlaceholder')}
            />
            <div className="flex gap-2">
              <Button onClick={handleParsePaste} disabled={!pasteText.trim()}>
                {t('common.confirm')}
              </Button>
              <Button variant="ghost" onClick={() => setShowPasteList(false)}>
                {t('common.cancel')}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {importRows && (
        <Modal open onClose={() => setImportRows(null)} title={t('students.importPreview')} widthClass="max-w-lg">
          <div className="flex flex-col gap-4">
            <p className="text-xs text-ink-soft">{t('students.importPasteHelp')}</p>
            {importError && <p className="text-xs text-red-600">{importError}</p>}
            <div className="max-h-80 overflow-y-auto flex flex-col divide-y divide-lav-100">
              {importRows.map((row, i) => (
                <div key={i} className="py-2 text-sm text-ink">
                  {row.firstName} {row.lastName}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button onClick={handleConfirmImport} disabled={importing}>
                {t('students.importConfirm', { count: importRows.length })}
              </Button>
              <Button variant="ghost" onClick={() => setImportRows(null)}>
                {t('common.cancel')}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </Modal>
  );
}

function StudentAdaptationRow({
  student,
  adaptation,
  rubrics,
  onToggleAdaptation,
  onSetRubric,
}: {
  student: Student;
  adaptation: StudentAdaptation | null;
  rubrics: Rubric[];
  onToggleAdaptation: (value: boolean) => void;
  onSetRubric: (rubricId: string) => void;
}) {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);
  const hasAdaptation = adaptation?.hasAdaptation ?? false;

  async function handleSave() {
    await updateStudent(student.id, { firstName, lastName });
    setEditing(false);
  }

  return (
    <div className="py-2.5 flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        {editing ? (
          <div className="flex items-center gap-2 flex-1">
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="flex-1" />
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="flex-1" />
            <Button size="sm" onClick={handleSave}>
              {t('common.save')}
            </Button>
          </div>
        ) : (
          <button onClick={() => setEditing(true)} className="text-sm text-ink text-left hover:text-accent">
            {student.lastName ? `${student.lastName}, ${student.firstName}` : student.firstName}
          </button>
        )}
        <button
          onClick={() => deleteStudent(student.id)}
          className="text-ink-soft hover:text-rose-600 shrink-0"
          aria-label={t('common.delete')}
        >
          <IconTrash size={14} />
        </button>
      </div>
      <label className="flex items-center gap-2 text-xs text-ink-soft cursor-pointer">
        <input
          type="checkbox"
          checked={hasAdaptation}
          onChange={(e) => onToggleAdaptation(e.target.checked)}
        />
        {t('students.hasAdaptation')}
      </label>
      {hasAdaptation && (
        <Select value={adaptation?.adaptedRubricId ?? ''} onChange={(e) => onSetRubric(e.target.value)}>
          <option value="">{t('students.selectAdaptedRubric')}</option>
          {rubrics.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </Select>
      )}
    </div>
  );
}
