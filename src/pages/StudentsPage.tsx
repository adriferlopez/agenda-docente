import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import {
  subscribeStudentGroups,
  subscribeStudents,
  createStudentGroup,
  deleteStudentGroup,
  createStudent,
  createStudentsBatch,
  updateStudent,
  deleteStudent,
} from '@/firebase/students';
import { subscribeSubjects } from '@/firebase/subjects';
import { parseStudentsFile, type StudentRow } from '@/utils/studentsExcel';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { IconPlus, IconTrash, IconUpload } from '@/components/ui/icons';
import { IconUsers } from '@/components/ui/icons-extra';
import type { StudentGroup, Student, Subject } from '@/types';

export default function StudentsPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const { activeYear } = useSchoolYears();

  const [groups, setGroups] = useState<StudentGroup[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [savingGroup, setSavingGroup] = useState(false);

  useEffect(() => {
    if (!user || !activeYear) return;
    const unsubGroups = subscribeStudentGroups(user.uid, activeYear.id, setGroups);
    const unsubStudents = subscribeStudents(user.uid, activeYear.id, setStudents);
    const unsubSubjects = subscribeSubjects(user.uid, activeYear.id, setSubjects);
    return () => {
      unsubGroups();
      unsubStudents();
      unsubSubjects();
    };
  }, [user, activeYear]);

  // Si no hay grupo seleccionado todavía (o el seleccionado ya no existe),
  // usa el primero disponible. Derivado durante el render para evitar un
  // render extra con un useEffect que llame a setState.
  const effectiveGroupId = groups.some((g) => g.id === selectedGroupId) ? selectedGroupId : groups[0]?.id ?? null;

  const selectedGroup = groups.find((g) => g.id === effectiveGroupId) ?? null;
  const groupStudents = useMemo(
    () => students.filter((s) => s.groupId === effectiveGroupId),
    [students, effectiveGroupId]
  );
  const linkedSubjects = useMemo(
    () => subjects.filter((s) => s.studentGroupId === effectiveGroupId),
    [subjects, effectiveGroupId]
  );

  async function handleCreateGroup(e: FormEvent) {
    e.preventDefault();
    if (!user || !activeYear || !newGroupName.trim()) return;
    setSavingGroup(true);
    try {
      const id = await createStudentGroup(user.uid, activeYear.id, newGroupName.trim());
      setNewGroupName('');
      setShowNewGroup(false);
      setSelectedGroupId(id);
    } finally {
      setSavingGroup(false);
    }
  }

  async function handleDeleteGroup(group: StudentGroup) {
    if (!confirm(t('students.deleteGroupConfirm'))) return;
    const idsToDelete = students.filter((s) => s.groupId === group.id).map((s) => s.id);
    await deleteStudentGroup(group.id, idsToDelete);
    if (selectedGroupId === group.id) setSelectedGroupId(null);
  }

  if (!activeYear) {
    return <p className="text-sm text-ink-soft">{t('schoolYear.noYears')}</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl text-lav-600 mb-1">{t('students.title')}</h1>
        <p className="text-sm text-ink-soft">{t('students.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* Lista de grupos */}
        <Card className="flex flex-col gap-3 h-fit">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base text-ink">{t('students.groups')}</h2>
            <button
              onClick={() => setShowNewGroup(true)}
              className="text-lav-600 hover:bg-lav-50 rounded-full p-1.5"
              aria-label={t('students.newGroup')}
            >
              <IconPlus size={16} />
            </button>
          </div>

          {groups.length === 0 && <p className="text-xs text-ink-soft">{t('students.noGroups')}</p>}

          <div className="flex flex-col gap-1">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => setSelectedGroupId(group.id)}
                className={`flex items-center justify-between gap-2 rounded-2xl px-3 py-2 text-sm text-left transition ${
                  effectiveGroupId === group.id ? 'bg-lav-400 text-white' : 'text-ink hover:bg-lav-50'
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  <IconUsers size={15} />
                  {group.name}
                </span>
              </button>
            ))}
          </div>
        </Card>

        {/* Detalle del grupo seleccionado */}
        <div className="flex flex-col gap-4">
          {selectedGroup ? (
            <GroupDetail
              group={selectedGroup}
              students={groupStudents}
              linkedSubjects={linkedSubjects}
              ownerId={user!.uid}
              schoolYearId={activeYear.id}
              onDeleteGroup={() => handleDeleteGroup(selectedGroup)}
            />
          ) : (
            <Card className="text-sm text-ink-soft">{t('students.noGroups')}</Card>
          )}
        </div>
      </div>

      {showNewGroup && (
        <Modal open onClose={() => setShowNewGroup(false)} title={t('students.newGroup')}>
          <form onSubmit={handleCreateGroup} className="flex flex-col gap-4">
            <Input
              label={t('students.groupName')}
              placeholder={t('students.groupNamePlaceholder')}
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              required
              autoFocus
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={savingGroup}>
                {t('common.save')}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowNewGroup(false)}>
                {t('common.cancel')}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function GroupDetail({
  group,
  students,
  linkedSubjects,
  ownerId,
  schoolYearId,
  onDeleteGroup,
}: {
  group: StudentGroup;
  students: Student[];
  linkedSubjects: Subject[];
  ownerId: string;
  schoolYearId: string;
  onDeleteGroup: () => void;
}) {
  const { t } = useTranslation();
  const fileRef = useRef<HTMLInputElement>(null);

  const [showAddStudent, setShowAddStudent] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [saving, setSaving] = useState(false);

  const [importRows, setImportRows] = useState<StudentRow[] | null>(null);
  const [importing, setImporting] = useState(false);

  async function handleAddStudent(e: FormEvent) {
    e.preventDefault();
    if (!firstName.trim() && !lastName.trim()) return;
    setSaving(true);
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
      setSaving(false);
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const rows = await parseStudentsFile(file);
    setImportRows(rows);
    if (fileRef.current) fileRef.current.value = '';
  }

  async function handleConfirmImport() {
    if (!importRows) return;
    setImporting(true);
    try {
      await createStudentsBatch(ownerId, schoolYearId, group.id, importRows);
      setImportRows(null);
    } finally {
      setImporting(false);
    }
  }

  return (
    <>
      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="font-display text-lg text-ink">{group.name}</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" icon={<IconPlus size={16} />} onClick={() => setShowAddStudent(true)}>
              {t('students.addStudent')}
            </Button>
            <Button size="sm" variant="secondary" icon={<IconUpload size={16} />} onClick={() => fileRef.current?.click()}>
              {t('students.importExcel')}
            </Button>
            <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleFileChange} />
            <Button size="sm" variant="danger" icon={<IconTrash size={16} />} onClick={onDeleteGroup}>
              {t('students.deleteGroup')}
            </Button>
          </div>
        </div>

        {linkedSubjects.length > 0 && (
          <p className="text-xs text-ink-soft">
            {t('students.linkedSubjects')}: {linkedSubjects.map((s) => s.name).join(', ')}
          </p>
        )}

        {students.length === 0 ? (
          <p className="text-sm text-ink-soft">{t('students.noStudents')}</p>
        ) : (
          <div className="flex flex-col divide-y divide-lav-100">
            {students.map((student) => (
              <StudentRowItem key={student.id} student={student} />
            ))}
          </div>
        )}
      </Card>

      {showAddStudent && (
        <Modal open onClose={() => setShowAddStudent(false)} title={t('students.addStudent')}>
          <form onSubmit={handleAddStudent} className="flex flex-col gap-4">
            <Input label={t('students.firstName')} value={firstName} onChange={(e) => setFirstName(e.target.value)} autoFocus />
            <Input label={t('students.lastName')} value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <div className="flex gap-2">
              <Button type="submit" disabled={saving}>
                {t('common.save')}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowAddStudent(false)}>
                {t('common.cancel')}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {importRows && (
        <Modal open onClose={() => setImportRows(null)} title={t('students.importPreview')} widthClass="max-w-lg">
          <div className="flex flex-col gap-4">
            <p className="text-xs text-ink-soft">{t('students.importExcelHelp')}</p>
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
    </>
  );
}

function StudentRowItem({ student }: { student: Student }) {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);

  async function handleSave() {
    await updateStudent(student.id, { firstName, lastName });
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="py-2 flex items-center gap-2">
        <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="flex-1" />
        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="flex-1" />
        <Button size="sm" onClick={handleSave}>
          {t('common.save')}
        </Button>
      </div>
    );
  }

  return (
    <div className="py-2 flex items-center justify-between gap-2">
      <button onClick={() => setEditing(true)} className="text-sm text-ink text-left hover:text-lav-600">
        {student.lastName ? `${student.lastName}, ${student.firstName}` : student.firstName}
      </button>
      <button
        onClick={() => deleteStudent(student.id)}
        className="text-ink-soft hover:text-rose-600"
        aria-label={t('common.delete')}
      >
        <IconTrash size={14} />
      </button>
    </div>
  );
}
