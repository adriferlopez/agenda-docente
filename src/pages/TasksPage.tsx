import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import { subscribeSubjects } from '@/firebase/subjects';
import {
  subscribeTasks, createTask, updateTask, setTaskDone, setTasksDoneBatch,
  deleteTask, deleteTasksBatch,
} from '@/firebase/tasks';
import { subjectDisplayName } from '@/utils/timetableDisplay';
import { subjectColorClasses } from '@/components/ui/subjectColors';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { IconPlus, IconTrash, IconEdit, IconCheck } from '@/components/ui/icons';
import type { Subject, TeacherTask } from '@/types';

type Tab = 'pending' | 'done';
const OWN_KEY = '__own__';

function sortTasks(a: TeacherTask, b: TeacherTask): number {
  if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate);
  if (a.dueDate) return -1;
  if (b.dueDate) return 1;
  return a.createdAt - b.createdAt;
}

interface TaskGroup {
  key: string;
  label: string;
  dot?: string;
  tasks: TeacherTask[];
}

function groupBySubject(tasks: TeacherTask[], subjectById: Map<string, Subject>, t: TFunction): TaskGroup[] {
  const groups = new Map<string, TaskGroup>();
  for (const task of tasks) {
    const key = task.subjectId ?? OWN_KEY;
    if (!groups.has(key)) {
      if (key === OWN_KEY) {
        groups.set(key, { key, label: t('tasks.ownTasks'), tasks: [] });
      } else {
        const subject = subjectById.get(key);
        groups.set(key, {
          key,
          label: subject ? subjectDisplayName(subject) : t('tasks.unknownSubject'),
          dot: subject ? subjectColorClasses[subject.color].dot : undefined,
          tasks: [],
        });
      }
    }
    groups.get(key)!.tasks.push(task);
  }
  return [...groups.values()].sort((a, b) => {
    if (a.key === OWN_KEY) return -1;
    if (b.key === OWN_KEY) return 1;
    return a.label.localeCompare(b.label);
  });
}

export default function TasksPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const { activeYear } = useSchoolYears();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [tasks, setTasks] = useState<TeacherTask[]>([]);
  const [tab, setTab] = useState<Tab>('pending');
  const [editingTask, setEditingTask] = useState<TeacherTask | 'new' | null>(null);
  const [undoIds, setUndoIds] = useState<string[] | null>(null);

  useEffect(() => {
    if (!user || !activeYear) return;
    const u1 = subscribeSubjects(user.uid, activeYear.id, setSubjects);
    const u2 = subscribeTasks(user.uid, activeYear.id, setTasks);
    return () => { u1(); u2(); };
  }, [user, activeYear]);

  // El aviso de "deshacer recuperar todas" desaparece solo pasado un rato,
  // para no dejarlo pegado en pantalla indefinidamente.
  useEffect(() => {
    if (!undoIds) return;
    const timer = setTimeout(() => setUndoIds(null), 8000);
    return () => clearTimeout(timer);
  }, [undoIds]);

  const subjectById = useMemo(() => {
    const m = new Map<string, Subject>();
    subjects.forEach((s) => m.set(s.id, s));
    return m;
  }, [subjects]);

  const pendingTasks = useMemo(() => tasks.filter((tk) => !tk.done).sort(sortTasks), [tasks]);
  const doneTasks = useMemo(
    () => tasks.filter((tk) => tk.done).sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0)),
    [tasks]
  );
  const groupedPending = useMemo(() => groupBySubject(pendingTasks, subjectById, t), [pendingTasks, subjectById, t]);

  async function handleDeleteTask(task: TeacherTask) {
    if (!window.confirm(t('tasks.deleteConfirm'))) return;
    await deleteTask(task.id);
  }

  async function handleRestoreAll() {
    const ids = doneTasks.map((tk) => tk.id);
    if (ids.length === 0) return;
    await setTasksDoneBatch(ids, false);
    setUndoIds(ids);
  }

  async function handleUndoRestoreAll() {
    if (!undoIds) return;
    await setTasksDoneBatch(undoIds, true);
    setUndoIds(null);
  }

  async function handleDeleteAllPermanently() {
    const ids = doneTasks.map((tk) => tk.id);
    if (ids.length === 0) return;
    if (!window.confirm(t('tasks.deleteAllConfirm', { count: ids.length }))) return;
    await deleteTasksBatch(ids);
    setUndoIds(null);
  }

  if (!activeYear) {
    return <p className="text-sm text-ink-soft">{t('schoolYear.noYears')}</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl text-accent mb-1">{t('tasks.title')}</h1>
          <p className="text-sm text-ink-soft">{t('tasks.subtitle')}</p>
        </div>
        {tab === 'pending' && (
          <Button onClick={() => setEditingTask('new')} icon={<IconPlus size={16} />}>
            {t('tasks.newTask')}
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        <TabButton active={tab === 'pending'} onClick={() => setTab('pending')}>
          {t('tasks.tabPending')}{pendingTasks.length > 0 ? ` (${pendingTasks.length})` : ''}
        </TabButton>
        <TabButton active={tab === 'done'} onClick={() => setTab('done')}>
          {t('tasks.tabDone')}{doneTasks.length > 0 ? ` (${doneTasks.length})` : ''}
        </TabButton>
      </div>

      {tab === 'pending' ? (
        pendingTasks.length === 0 ? (
          <Card className="text-sm text-ink-soft">{t('tasks.noPending')}</Card>
        ) : (
          <div className="flex flex-col gap-5">
            {groupedPending.map((group) => (
              <div key={group.key} className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                  {group.dot && <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${group.dot}`} />}
                  {group.label}
                </h3>
                <div className="flex flex-col gap-2">
                  {group.tasks.map((task) => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      onToggle={() => setTaskDone(task.id, true)}
                      onEdit={() => setEditingTask(task)}
                      onDelete={() => handleDeleteTask(task)}
                      t={t}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="flex flex-col gap-4">
          {undoIds && (
            <div className="flex items-center justify-between gap-3 rounded-xl px-4 py-2.5" style={{ background: 'var(--accent-light)' }}>
              <p className="text-sm" style={{ color: 'var(--accent-text)' }}>
                {t('tasks.restoredAllNotice', { count: undoIds.length })}
              </p>
              <button onClick={handleUndoRestoreAll} className="text-sm font-semibold underline shrink-0" style={{ color: 'var(--accent)' }}>
                {t('tasks.undo')}
              </button>
            </div>
          )}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-ink-soft">{t('tasks.doneHelp')}</p>
            {doneTasks.length > 0 && (
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={handleRestoreAll}>{t('tasks.restoreAll')}</Button>
                <Button variant="danger" size="sm" onClick={handleDeleteAllPermanently}>{t('tasks.deleteAllPermanently')}</Button>
              </div>
            )}
          </div>
          {doneTasks.length === 0 ? (
            <Card className="text-sm text-ink-soft">{t('tasks.noDone')}</Card>
          ) : (
            <div className="flex flex-col gap-2">
              {doneTasks.map((task) => (
                <DoneTaskRow
                  key={task.id}
                  task={task}
                  subject={task.subjectId ? subjectById.get(task.subjectId) : undefined}
                  onRestore={() => setTasksDoneBatch([task.id], false)}
                  t={t}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {editingTask && (
        <TaskEditorModal
          task={editingTask === 'new' ? null : editingTask}
          subjects={subjects}
          onClose={() => setEditingTask(null)}
          onCreate={async (data) => {
            if (!user || !activeYear) return;
            await createTask(user.uid, activeYear.id, data);
          }}
          onSave={async (id, data) => { await updateTask(id, data); }}
        />
      )}
    </div>
  );
}

// ─── Pestaña ────────────────────────────────────────────────────────
function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="btn-base btn-pill text-sm px-4 py-2"
      style={{
        background: active ? 'var(--accent)' : 'var(--accent-light)',
        color: active ? 'white' : 'var(--accent-text)',
      }}
    >
      {children}
    </button>
  );
}

// ─── Fila de tarea pendiente ──────────────────────────────────────────
function TaskRow({ task, onToggle, onEdit, onDelete, t }: {
  task: TeacherTask;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  t: TFunction;
}) {
  const overdue = task.dueDate ? task.dueDate < new Date().toISOString().slice(0, 10) : false;
  return (
    <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <button
        onClick={onToggle}
        aria-label={t('tasks.markDone')}
        className="w-5 h-5 rounded-md border-2 shrink-0"
        style={{ borderColor: 'var(--accent)', background: 'transparent' }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{task.title}</p>
        {task.dueDate && (
          <p className="text-xs mt-0.5" style={{ color: overdue ? 'var(--danger-text)' : 'var(--text-secondary)' }}>
            {t('tasks.due')}: {task.dueDate}
          </p>
        )}
      </div>
      <button onClick={onEdit} aria-label={t('common.edit')} className="btn-base rounded-full p-1.5 shrink-0" style={{ color: 'var(--text-secondary)' }}>
        <IconEdit size={15} />
      </button>
      <button onClick={onDelete} aria-label={t('common.delete')} className="btn-base rounded-full p-1.5 shrink-0" style={{ color: 'var(--text-secondary)' }}>
        <IconTrash size={15} />
      </button>
    </div>
  );
}

// ─── Fila de tarea realizada (archivo) ─────────────────────────────────
function DoneTaskRow({ task, subject, onRestore, t }: {
  task: TeacherTask;
  subject?: Subject;
  onRestore: () => void;
  t: TFunction;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: 'var(--bg-input)' }}>
      <span className="w-5 h-5 rounded-md shrink-0 flex items-center justify-center" style={{ background: 'var(--accent)' }}>
        <IconCheck size={13} style={{ color: 'white' }} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium line-through opacity-70" style={{ color: 'var(--text-primary)' }}>{task.title}</p>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {subject ? subjectDisplayName(subject) : t('tasks.ownTasks')}
        </p>
      </div>
      <Button variant="secondary" size="sm" onClick={onRestore}>{t('tasks.restore')}</Button>
    </div>
  );
}

// ─── Modal de creación/edición ─────────────────────────────────────────
function TaskEditorModal({ task, subjects, onClose, onCreate, onSave }: {
  task: TeacherTask | null;
  subjects: Subject[];
  onClose: () => void;
  onCreate: (data: { title: string; subjectId?: string; dueDate?: string }) => Promise<void>;
  onSave: (id: string, data: { title?: string; subjectId?: string | null; dueDate?: string | null }) => Promise<void>;
}) {
  const { t } = useTranslation();
  const [title, setTitle] = useState(task?.title ?? '');
  const [subjectId, setSubjectId] = useState(task?.subjectId ?? '');
  const [dueDate, setDueDate] = useState(task?.dueDate ?? '');
  const [saving, setSaving] = useState(false);

  async function handleSubmit() {
    if (!title.trim() || saving) return;
    setSaving(true);
    try {
      if (task) {
        await onSave(task.id, {
          title: title.trim(),
          subjectId: subjectId || null,
          dueDate: dueDate || null,
        });
      } else {
        await onCreate({
          title: title.trim(),
          ...(subjectId ? { subjectId } : {}),
          ...(dueDate ? { dueDate } : {}),
        });
      }
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={task ? t('tasks.editTask') : t('tasks.newTask')}>
      <div className="flex flex-col gap-4">
        <Input
          label={t('tasks.taskTitle')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <Select
          label={t('tasks.subject')}
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
        >
          <option value="">{t('tasks.ownTasks')}</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>{subjectDisplayName(s)}</option>
          ))}
        </Select>
        <Input
          type="date"
          label={t('tasks.dueDate')}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose}>{t('common.cancel')}</Button>
          <Button onClick={handleSubmit} disabled={saving || !title.trim()}>{t('common.save')}</Button>
        </div>
      </div>
    </Modal>
  );
}
