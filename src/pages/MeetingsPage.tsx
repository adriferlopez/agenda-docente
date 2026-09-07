import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import { subscribeMeetings, createMeeting, updateMeeting } from '@/firebase/meetings';
import {
  subscribeMeetingFolders,
  createMeetingFolder,
  updateMeetingFolder,
  deleteMeetingFolder,
} from '@/firebase/meetingFolders';
import { getWeekStart } from '@/utils/dates';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import MeetingCard from '@/components/meetings/MeetingCard';
import MeetingEditorModal from '@/components/meetings/MeetingEditorModal';
import { subjectColorClasses } from '@/components/ui/subjectColors';
import { IconPlus, IconTrash, IconEdit } from '@/components/ui/icons';
import { PASTEL_FOLDER_COLORS } from '@/types';
import type { Meeting, MeetingFolder, PastelFolderColor } from '@/types';

export default function MeetingsPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const { activeYear } = useSchoolYears();

  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [folders, setFolders] = useState<MeetingFolder[]>([]);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);
  const [creating, setCreating] = useState(false);
  // undefined = todas, '' = sin carpeta, id = carpeta concreta
  const [selectedFolderId, setSelectedFolderId] = useState<string | '' | undefined>(undefined);
  const [folderModal, setFolderModal] = useState<{ mode: 'create' } | { mode: 'edit'; folder: MeetingFolder } | null>(null);

  useEffect(() => {
    if (!user || !activeYear) return;
    const u1 = subscribeMeetings(user.uid, activeYear.id, setMeetings);
    const u2 = subscribeMeetingFolders(user.uid, activeYear.id, setFolders);
    return () => { u1(); u2(); };
  }, [user, activeYear]);

  const visibleMeetings = useMemo(() => {
    if (selectedFolderId === undefined) return meetings;
    if (selectedFolderId === '') return meetings.filter((m) => !m.folderId);
    return meetings.filter((m) => m.folderId === selectedFolderId);
  }, [meetings, selectedFolderId]);

  async function handleCreate() {
    if (!user || !activeYear) return;
    setCreating(true);
    try {
      const id = await createMeeting(user.uid, activeYear.id, {
        title: '',
        date: getWeekStart(new Date()),
      });
      if (selectedFolderId) {
        await updateMeeting(id, { folderId: selectedFolderId });
      }
      const newMeeting: Meeting = {
        id,
        ownerId: user.uid,
        schoolYearId: activeYear.id,
        title: '',
        date: getWeekStart(new Date()),
        notes: '',
        driveAttachments: [],
        summarySourceText: '',
        folderId: selectedFolderId || undefined,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setEditingMeeting(newMeeting);
    } finally {
      setCreating(false);
    }
  }

  async function handleDeleteFolder(folder: MeetingFolder) {
    if (!confirm(t('meetings.deleteFolderConfirm'))) return;
    const idsInFolder = meetings.filter((m) => m.folderId === folder.id).map((m) => m.id);
    await deleteMeetingFolder(folder.id, idsInFolder);
    if (selectedFolderId === folder.id) setSelectedFolderId(undefined);
  }

  if (!activeYear) {
    return <p className="text-sm text-ink-soft">{t('schoolYear.noYears')}</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl text-accent mb-1">{t('meetings.title')}</h1>
          <p className="text-sm text-ink-soft">{t('meetings.subtitle')}</p>
        </div>
        <Button onClick={handleCreate} disabled={creating} icon={<IconPlus size={16} />}>
          {t('meetings.newMeeting')}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <div className="md:w-56 flex-shrink-0 flex flex-col gap-1.5">
          <button
            onClick={() => setSelectedFolderId(undefined)}
            className={`text-left text-sm font-semibold rounded-xl px-3 py-2 transition ${
              selectedFolderId === undefined ? 'bg-accent text-white' : 'hover:bg-accent-light text-ink'
            }`}
          >
            {t('meetings.allMeetings')} <span className="opacity-70">({meetings.length})</span>
          </button>
          <button
            onClick={() => setSelectedFolderId('')}
            className={`text-left text-sm font-semibold rounded-xl px-3 py-2 transition ${
              selectedFolderId === '' ? 'bg-accent text-white' : 'hover:bg-accent-light text-ink'
            }`}
          >
            {t('meetings.noFolder')} <span className="opacity-70">({meetings.filter((m) => !m.folderId).length})</span>
          </button>

          {folders.map((folder) => {
            const colors = subjectColorClasses[folder.color];
            const active = selectedFolderId === folder.id;
            const count = meetings.filter((m) => m.folderId === folder.id).length;
            return (
              <div
                key={folder.id}
                className={`group flex items-center gap-1 rounded-xl px-1 transition ${active ? 'bg-accent text-white' : 'hover:bg-accent-light'}`}
              >
                <button
                  onClick={() => setSelectedFolderId(folder.id)}
                  className={`flex-1 flex items-center gap-2 text-left text-sm font-semibold px-2 py-2 min-w-0 ${active ? 'text-white' : 'text-ink'}`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${colors.dot}`} />
                  <span className="truncate">{folder.name}</span>
                  <span className="opacity-70 flex-shrink-0">({count})</span>
                </button>
                <button
                  onClick={() => setFolderModal({ mode: 'edit', folder })}
                  className={`p-1 opacity-0 group-hover:opacity-100 flex-shrink-0 ${active ? 'text-white' : 'text-ink-soft hover:text-accent'}`}
                  aria-label={t('common.edit')}
                >
                  <IconEdit size={13} />
                </button>
              </div>
            );
          })}

          <button
            onClick={() => setFolderModal({ mode: 'create' })}
            className="text-left text-xs font-semibold rounded-xl px-3 py-2 text-ink-soft hover:text-accent hover:bg-accent-light transition flex items-center gap-1.5 mt-1"
          >
            <IconPlus size={14} /> {t('meetings.newFolder')}
          </button>
        </div>

        <div className="flex-1">
          {visibleMeetings.length === 0 ? (
            <Card className="text-sm text-ink-soft">{t('meetings.noMeetings')}</Card>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {visibleMeetings.map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  meeting={meeting}
                  folder={folders.find((f) => f.id === meeting.folderId)}
                  onClick={() => setEditingMeeting(meeting)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {editingMeeting && (
        <MeetingEditorModal
          meeting={editingMeeting}
          language={profile?.language ?? 'es'}
          folders={folders}
          onClose={() => setEditingMeeting(null)}
        />
      )}

      {folderModal && user && activeYear && (
        <FolderModal
          mode={folderModal.mode}
          folder={folderModal.mode === 'edit' ? folderModal.folder : undefined}
          ownerId={user.uid}
          schoolYearId={activeYear.id}
          onDelete={folderModal.mode === 'edit' ? () => handleDeleteFolder(folderModal.folder) : undefined}
          onClose={() => setFolderModal(null)}
        />
      )}
    </div>
  );
}

// -----------------------------------------------------------------------
// Crear/editar una carpeta: nombre + color pastel.
// -----------------------------------------------------------------------
function FolderModal({
  mode, folder, ownerId, schoolYearId, onDelete, onClose,
}: {
  mode: 'create' | 'edit';
  folder?: MeetingFolder;
  ownerId: string;
  schoolYearId: string;
  onDelete?: () => void;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [name, setName] = useState(folder?.name ?? '');
  const [color, setColor] = useState<PastelFolderColor>(folder?.color ?? PASTEL_FOLDER_COLORS[0]);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setFormError('');
    try {
      if (mode === 'create') {
        await createMeetingFolder(ownerId, schoolYearId, { name: name.trim(), color });
      } else if (folder) {
        await updateMeetingFolder(folder.id, { name: name.trim(), color });
      }
      onClose();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={mode === 'create' ? t('meetings.newFolder') : t('meetings.editFolder')} widthClass="max-w-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label={t('meetings.folderName')} value={name} onChange={(e) => setName(e.target.value)} required autoFocus />
        <div>
          <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            {t('meetings.folderColor')}
          </label>
          <div className="flex gap-2 flex-wrap">
            {PASTEL_FOLDER_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full ${subjectColorClasses[c].dot} ${
                  color === c ? 'ring-2 ring-offset-2 ring-ink' : ''
                }`}
                aria-label={c}
              />
            ))}
          </div>
        </div>
        {formError && (
          <p className="text-xs text-rose-600 bg-rose-50 rounded-xl px-3 py-2">{formError}</p>
        )}
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2">
            <Button type="submit" disabled={saving || !name.trim()}>
              {t('common.save')}
            </Button>
            <Button type="button" variant="ghost" onClick={onClose}>
              {t('common.cancel')}
            </Button>
          </div>
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="text-ink-soft hover:text-rose-600 p-1.5"
              aria-label={t('meetings.deleteFolder')}
            >
              <IconTrash size={16} />
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}
