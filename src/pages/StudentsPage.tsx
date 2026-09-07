import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import {
  subscribeStudentGroups,
  subscribeStudents,
  createStudentGroup,
  updateStudentGroup,
  deleteStudentGroup,
  createStudent,
  createStudentsBatch,
  updateStudent,
  deleteStudent,
} from '@/firebase/students';
import { subscribeSubjects } from '@/firebase/subjects';
import { subscribeStudentNotes, addStudentNote, updateStudentNote, deleteStudentNote } from '@/firebase/studentNotes';
import {
  subscribeChecklistBoards,
  createChecklistBoard,
  renameChecklistBoard,
  deleteChecklistBoard,
  addChecklistItems,
  renameChecklistItem,
  removeChecklistItem,
  setChecklistCheck,
} from '@/firebase/checklists';
import { parseStudentsText, type StudentRow } from '@/utils/studentsExcel';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { IconPlus, IconTrash, IconEdit, IconCheck, IconX } from '@/components/ui/icons';
import { IconUsers, IconClipboard, IconMessage } from '@/components/ui/icons-extra';
import type { StudentGroup, Student, Subject, StudentNote, ChecklistBoard, ChecklistItem } from '@/types';

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
        <h1 className="font-display text-2xl text-accent mb-1">{t('students.title')}</h1>
        <p className="text-sm text-ink-soft">{t('students.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* Lista de grupos */}
        <Card className="flex flex-col gap-3 h-fit">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base text-ink">{t('students.groups')}</h2>
            <button
              onClick={() => setShowNewGroup(true)}
              className="text-accent hover:bg-accent-light rounded-full p-1.5"
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
                  effectiveGroupId === group.id ? 'bg-accent text-white' : 'text-ink hover:bg-accent-light'
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
              key={selectedGroup.id}
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
  const [tab, setTab] = useState<'students' | 'checklists'>('students');

  const [renamingGroup, setRenamingGroup] = useState(false);
  const [groupName, setGroupName] = useState(group.name);

  const [showAddStudent, setShowAddStudent] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [saving, setSaving] = useState(false);

  const [showPasteList, setShowPasteList] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [importRows, setImportRows] = useState<StudentRow[] | null>(null);
  const [importing, setImporting] = useState(false);

  async function handleRenameGroup() {
    if (!groupName.trim()) return;
    await updateStudentGroup(group.id, groupName.trim());
    setRenamingGroup(false);
  }

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

  function handleParsePaste() {
    const rows = parseStudentsText(pasteText);
    setImportRows(rows);
    setShowPasteList(false);
    setPasteText('');
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
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setTab('students')}
          className={`text-xs font-semibold rounded-full px-3 py-1.5 ${tab === 'students' ? 'bg-accent text-white' : 'bg-accent-light text-accent'}`}
        >
          {t('students.tabStudents')}
        </button>
        <button
          type="button"
          onClick={() => setTab('checklists')}
          className={`text-xs font-semibold rounded-full px-3 py-1.5 ${tab === 'checklists' ? 'bg-accent text-white' : 'bg-accent-light text-accent'}`}
        >
          {t('students.tabChecklists')}
        </button>
      </div>

      {tab === 'checklists' ? (
        <ChecklistsPanel group={group} students={students} ownerId={ownerId} schoolYearId={schoolYearId} />
      ) : (
      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {renamingGroup ? (
            <div className="flex items-center gap-2">
              <Input
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRenameGroup();
                  if (e.key === 'Escape') { setGroupName(group.name); setRenamingGroup(false); }
                }}
              />
              <Button size="sm" onClick={handleRenameGroup}>{t('common.save')}</Button>
              <Button size="sm" variant="ghost" onClick={() => { setGroupName(group.name); setRenamingGroup(false); }}>
                {t('common.cancel')}
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setRenamingGroup(true)}
              className="flex items-center gap-1.5 font-display text-lg text-ink hover:text-accent"
            >
              {group.name}
              <IconEdit size={15} className="text-ink-soft" />
            </button>
          )}
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" variant="secondary" icon={<IconPlus size={16} />} onClick={() => setShowAddStudent(true)}>
              {t('students.addStudent')}
            </Button>
            <Button size="sm" variant="secondary" icon={<IconClipboard size={16} />} onClick={() => setShowPasteList(true)}>
              {t('students.pasteList')}
            </Button>
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
              <StudentRowItem key={student.id} student={student} ownerId={ownerId} schoolYearId={schoolYearId} />
            ))}
          </div>
        )}
      </Card>
      )}

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

function StudentRowItem({
  student,
  ownerId,
  schoolYearId,
}: {
  student: Student;
  ownerId: string;
  schoolYearId: string;
}) {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState<StudentNote[]>([]);

  useEffect(() => {
    if (!showNotes) return;
    const unsub = subscribeStudentNotes(ownerId, student.id, setNotes);
    return unsub;
  }, [showNotes, ownerId, student.id]);

  async function handleSave() {
    await updateStudent(student.id, { firstName, lastName });
    setEditing(false);
  }

  return (
    <div className="py-2 flex flex-col gap-2">
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
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setShowNotes((v) => !v)}
            className={`hover:bg-accent-light rounded-full p-1.5 ${showNotes ? 'text-accent bg-accent-light' : 'text-ink-soft'}`}
            aria-label={t('students.notes')}
            title={t('students.notes')}
          >
            <IconMessage size={15} />
          </button>
          <button
            onClick={() => deleteStudent(student.id)}
            className="text-ink-soft hover:text-rose-600 p-1.5"
            aria-label={t('common.delete')}
          >
            <IconTrash size={14} />
          </button>
        </div>
      </div>

      {showNotes && (
        <StudentNotesPanel student={student} ownerId={ownerId} schoolYearId={schoolYearId} notes={notes} />
      )}
    </div>
  );
}

function StudentNotesPanel({
  student,
  ownerId,
  schoolYearId,
  notes,
}: {
  student: Student;
  ownerId: string;
  schoolYearId: string;
  notes: StudentNote[];
}) {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [saving, setSaving] = useState(false);

  // Categorías ya usadas con este alumno + un par de sugerencias habituales
  // de seguimiento de tutoría, para que el docente no tenga que escribirlas
  // siempre desde cero pero pueda crear las que quiera libremente.
  const categoryOptions = useMemo(() => {
    const used = new Set(notes.map((n) => n.category).filter((c): c is string => Boolean(c)));
    for (const suggestion of [
      t('students.categoryAttitude'),
      t('students.categoryBehavior'),
      t('students.categoryFamily'),
      t('students.categoryAcademic'),
    ]) {
      used.add(suggestion);
    }
    return Array.from(used);
  }, [notes, t]);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setSaving(true);
    try {
      await addStudentNote(ownerId, schoolYearId, student.id, text.trim(), category.trim() || undefined);
      setText('');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="ml-1 pl-3 border-l-2 border-lav-100 flex flex-col gap-3">
      <form onSubmit={handleAdd} className="flex flex-col gap-2">
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder={t('students.categoryPlaceholder')}
          list={`note-categories-${student.id}`}
        />
        <datalist id={`note-categories-${student.id}`}>
          {categoryOptions.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          placeholder={t('students.notesPlaceholder')}
        />
        <div>
          <Button type="submit" size="sm" disabled={!text.trim() || saving}>
            {t('students.addNote')}
          </Button>
        </div>
      </form>

      {notes.length === 0 ? (
        <p className="text-xs text-ink-soft">{t('students.noNotes')}</p>
      ) : (
        <div className="flex flex-col gap-2">
          {notes.map((note) => (
            <StudentNoteItem key={note.id} note={note} categoryOptions={categoryOptions} />
          ))}
        </div>
      )}
    </div>
  );
}

function StudentNoteItem({ note, categoryOptions }: { note: StudentNote; categoryOptions: string[] }) {
  const { t, i18n } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(note.text);
  const [category, setCategory] = useState(note.category ?? '');

  const dateLabel = note.createdAt
    ? new Date(note.createdAt).toLocaleDateString(i18n.language, { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

  async function handleSave() {
    if (!text.trim()) return;
    await updateStudentNote(note.id, text.trim(), category.trim() || undefined);
    setEditing(false);
  }

  async function handleDelete() {
    if (!confirm(t('students.deleteNoteConfirm'))) return;
    await deleteStudentNote(note.id);
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-2 bg-accent-light/40 rounded-xl p-2">
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder={t('students.categoryPlaceholder')}
          list={`note-categories-edit-${note.id}`}
        />
        <datalist id={`note-categories-edit-${note.id}`}>
          {categoryOptions.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} autoFocus />
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSave}>
            {t('common.save')}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
            {t('common.cancel')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-between gap-2 bg-accent-light/40 rounded-xl p-2">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          {note.category && (
            <span className="text-[9px] font-semibold rounded-full px-1.5 py-0.5 bg-accent text-white">
              {note.category}
            </span>
          )}
          {dateLabel && <p className="text-[10px] text-ink-soft">{dateLabel}</p>}
        </div>
        <p className="text-sm text-ink whitespace-pre-wrap break-words">{note.text}</p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button onClick={() => setEditing(true)} className="text-ink-soft hover:text-accent p-1" aria-label={t('common.edit')}>
          <IconEdit size={13} />
        </button>
        <button onClick={handleDelete} className="text-ink-soft hover:text-rose-600 p-1" aria-label={t('common.delete')}>
          <IconTrash size={13} />
        </button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------
// Listas de verificación por grupo (seguimiento de tutoría): el docente
// crea columnas (items) y marca casillas por alumno, con recuento de
// completados/total por item.
// -----------------------------------------------------------------------
function ChecklistsPanel({
  group,
  students,
  ownerId,
  schoolYearId,
}: {
  group: StudentGroup;
  students: Student[];
  ownerId: string;
  schoolYearId: string;
}) {
  const { t } = useTranslation();
  const [boards, setBoards] = useState<ChecklistBoard[]>([]);
  const [showNewBoard, setShowNewBoard] = useState(false);

  useEffect(() => {
    const unsub = subscribeChecklistBoards(ownerId, group.id, setBoards);
    return unsub;
  }, [ownerId, group.id]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs text-ink-soft max-w-md">{t('students.checklistsHelp')}</p>
        <Button size="sm" icon={<IconPlus size={16} />} onClick={() => setShowNewBoard(true)}>
          {t('students.newChecklist')}
        </Button>
      </div>

      {boards.length === 0 ? (
        <Card className="text-sm text-ink-soft">{t('students.noChecklists')}</Card>
      ) : (
        boards.map((board) => <ChecklistBoardCard key={board.id} board={board} students={students} />)
      )}

      {showNewBoard && (
        <NewChecklistModal
          ownerId={ownerId}
          schoolYearId={schoolYearId}
          groupId={group.id}
          onClose={() => setShowNewBoard(false)}
        />
      )}
    </div>
  );
}

function NewChecklistModal({
  ownerId,
  schoolYearId,
  groupId,
  onClose,
}: {
  ownerId: string;
  schoolYearId: string;
  groupId: string;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [itemsText, setItemsText] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      await createChecklistBoard(ownerId, schoolYearId, groupId, name.trim(), itemsText.split(/\r?\n/));
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={t('students.newChecklist')} widthClass="max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label={t('students.checklistName')} value={name} onChange={(e) => setName(e.target.value)} required autoFocus />
        <Textarea
          label={t('students.checklistItems')}
          value={itemsText}
          onChange={(e) => setItemsText(e.target.value)}
          rows={6}
          placeholder={t('students.checklistItemsPlaceholder')}
        />
        <p className="text-xs text-ink-soft">{t('students.checklistItemsHelp')}</p>
        <div className="flex gap-2">
          <Button type="submit" disabled={!name.trim() || saving}>
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

function ChecklistBoardCard({ board, students }: { board: ChecklistBoard; students: Student[] }) {
  const { t } = useTranslation();
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(board.name);
  const [showAddItems, setShowAddItems] = useState(false);
  const [newItemsText, setNewItemsText] = useState('');
  const [addingItems, setAddingItems] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [itemLabel, setItemLabel] = useState('');

  async function handleRenameBoard() {
    if (!name.trim()) return;
    await renameChecklistBoard(board.id, name.trim());
    setRenaming(false);
  }

  async function handleDeleteBoard() {
    if (!confirm(t('students.deleteChecklistConfirm'))) return;
    await deleteChecklistBoard(board.id);
  }

  async function handleAddItems(e: FormEvent) {
    e.preventDefault();
    setAddingItems(true);
    try {
      await addChecklistItems(board.id, board.items, newItemsText.split(/\r?\n/));
      setNewItemsText('');
      setShowAddItems(false);
    } finally {
      setAddingItems(false);
    }
  }

  async function handleRenameItem(item: ChecklistItem) {
    if (!itemLabel.trim()) return;
    await renameChecklistItem(board.id, board.items, item.id, itemLabel.trim());
    setEditingItemId(null);
  }

  async function handleRemoveItem(item: ChecklistItem) {
    if (!confirm(t('students.deleteChecklistItemConfirm'))) return;
    await removeChecklistItem(board.id, board.items, item.id);
  }

  function isChecked(studentId: string, itemId: string): boolean {
    return board.checks?.[studentId]?.[itemId] === true;
  }

  async function toggle(studentId: string, itemId: string) {
    await setChecklistCheck(board.id, studentId, itemId, !isChecked(studentId, itemId));
  }

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        {renaming ? (
          <div className="flex items-center gap-2">
            <Input value={name} onChange={(e) => setName(e.target.value)} autoFocus />
            <Button size="sm" onClick={handleRenameBoard}>{t('common.save')}</Button>
          </div>
        ) : (
          <button onClick={() => setRenaming(true)} className="font-display text-base text-ink hover:text-accent text-left">
            {board.name}
          </button>
        )}
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" icon={<IconPlus size={14} />} onClick={() => setShowAddItems((v) => !v)}>
            {t('students.addChecklistItems')}
          </Button>
          <Button size="sm" variant="danger" icon={<IconTrash size={14} />} onClick={handleDeleteBoard}>
            {t('common.delete')}
          </Button>
        </div>
      </div>

      {showAddItems && (
        <form onSubmit={handleAddItems} className="flex flex-col gap-2 bg-accent-light/40 rounded-xl p-3">
          <Textarea
            value={newItemsText}
            onChange={(e) => setNewItemsText(e.target.value)}
            rows={3}
            placeholder={t('students.checklistItemsPlaceholder')}
            autoFocus
          />
          <div className="flex gap-2">
            <Button size="sm" type="submit" disabled={!newItemsText.trim() || addingItems}>
              {t('common.add')}
            </Button>
            <Button size="sm" type="button" variant="ghost" onClick={() => setShowAddItems(false)}>
              {t('common.cancel')}
            </Button>
          </div>
        </form>
      )}

      {board.items.length === 0 || students.length === 0 ? (
        <p className="text-sm text-ink-soft">{t('students.noChecklistItems')}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-0 min-w-[420px]">
            <thead>
              <tr className="bg-accent-light">
                <th className="text-left px-3 py-2 rounded-l-2xl text-ink font-semibold sticky left-0 bg-accent-light">
                  {t('students.students')}
                </th>
                {board.items.map((item) => (
                  <th key={item.id} className="text-center px-2 py-2 text-ink font-semibold text-xs min-w-[110px]">
                    {editingItemId === item.id ? (
                      <div className="flex items-center gap-1 justify-center">
                        <input
                          value={itemLabel}
                          onChange={(e) => setItemLabel(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleRenameItem(item)}
                          autoFocus
                          className="w-24 text-center border border-lav-200 rounded-lg px-1 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <button type="button" onClick={() => handleRenameItem(item)} className="text-accent">
                          <IconCheck size={12} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 justify-center">
                        <button
                          type="button"
                          onClick={() => { setEditingItemId(item.id); setItemLabel(item.label); }}
                          className="truncate max-w-[100px] hover:text-accent"
                          title={item.label}
                        >
                          {item.label}
                        </button>
                        <button type="button" onClick={() => handleRemoveItem(item)} className="text-ink-soft hover:text-rose-600" aria-label={t('common.delete')}>
                          <IconX size={11} />
                        </button>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-lav-50">
                  <td className="px-3 py-2 font-medium text-ink sticky left-0 bg-[var(--bg-card)]">
                    {student.lastName ? `${student.lastName}, ${student.firstName}` : student.firstName}
                  </td>
                  {board.items.map((item) => (
                    <td key={item.id} className="px-2 py-1.5 text-center">
                      <input
                        type="checkbox"
                        checked={isChecked(student.id, item.id)}
                        onChange={() => toggle(student.id, item.id)}
                        className="w-4 h-4 cursor-pointer accent-current"
                        style={{ color: 'var(--accent)' }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="px-3 py-2 text-xs font-semibold text-accent">{t('students.checklistCompleted')}</td>
                {board.items.map((item) => {
                  const done = students.filter((s) => isChecked(s.id, item.id)).length;
                  return (
                    <td key={item.id} className="px-2 py-2 text-center text-xs font-semibold text-accent">
                      {done}/{students.length}
                    </td>
                  );
                })}
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </Card>
  );
}
