import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import DriveAttachmentPicker from '@/components/weekly/DriveAttachmentPicker';
import { IconTrash, IconSparkles, IconCheck } from '@/components/ui/icons';
import { updateMeeting, deleteMeeting } from '@/firebase/meetings';
import { summarizeMeeting, classifyAiError } from '@/services/ai';
import type { Meeting, DriveAttachment, MeetingFolder } from '@/types';

interface Props {
  meeting: Meeting;
  language: string;
  folders: MeetingFolder[];
  onClose: () => void;
}

export default function MeetingEditorModal({ meeting, language, folders, onClose }: Props) {
  const { t } = useTranslation();

  const [title, setTitle] = useState(meeting.title);
  const [date, setDate] = useState(meeting.date);
  // La hora es opcional (no todas las reuniones la necesitan): se muestra el
  // campo solo si ya tenía una guardada o el docente pulsa "Añadir hora".
  const [showTime, setShowTime] = useState(Boolean(meeting.time));
  const [time, setTime] = useState(meeting.time ?? '');
  const [notes, setNotes] = useState(meeting.notes);
  const [attachments, setAttachments] = useState<DriveAttachment[]>(meeting.driveAttachments);
  const [summarySourceText, setSummarySourceText] = useState(meeting.summarySourceText);
  const [aiSummary, setAiSummary] = useState(meeting.aiSummary ?? '');
  const [folderId, setFolderId] = useState(meeting.folderId ?? '');

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  const [error, setError] = useState('');

  async function handleSave() {
    setSaving(true);
    setError('');
    try {
      await updateMeeting(meeting.id, {
        title,
        date,
        time: showTime ? time : '',
        notes,
        driveAttachments: attachments,
        summarySourceText,
        aiSummary,
        folderId: folderId || null,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.error'));
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteMeeting() {
    setError('');
    try {
      await deleteMeeting(meeting.id);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.error'));
    }
  }

  async function handleGenerateSummary() {
    setSummarizing(true);
    setError('');
    try {
      const summary = await summarizeMeeting({ title, notes, summarySourceText, language });
      setAiSummary(summary);
      await updateMeeting(meeting.id, { aiSummary: summary });
    } catch (err) {
      const kind = classifyAiError(err);
      setError(
        kind === 'quota' ? t('common.aiQuotaError')
          : kind === 'overloaded' ? t('common.aiOverloadError')
          : err instanceof Error ? err.message : t('common.error')
      );
    } finally {
      setSummarizing(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={meeting.title || t('meetings.newMeeting')} widthClass="max-w-2xl">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <Input
            label={t('meetings.meetingTitle')}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="sm:col-span-2"
          />
          <Input label={t('meetings.date')} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          {showTime ? (
            <div className="flex items-end gap-1">
              <Input
                label={t('meetings.time')}
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => { setShowTime(false); setTime(''); }}
                className="text-ink-soft hover:text-rose-600 p-2.5 shrink-0"
                aria-label={t('meetings.removeTime')}
                title={t('meetings.removeTime')}
              >
                <IconTrash size={15} />
              </button>
            </div>
          ) : (
            <div className="flex items-end">
              <Button type="button" variant="secondary" size="sm" onClick={() => setShowTime(true)}>
                {t('meetings.addTime')}
              </Button>
            </div>
          )}
        </div>

        {folders.length > 0 && (
          <Select label={t('meetings.folder')} value={folderId} onChange={(e) => setFolderId(e.target.value)} className="max-w-xs">
            <option value="">{t('meetings.noFolder')}</option>
            {folders.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </Select>
        )}

        <Textarea
          label={t('meetings.notes')}
          placeholder={t('meetings.notesPlaceholder')}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          lang={language}
          spellCheck
        />

        <div>
          <label className="text-sm font-medium text-ink-soft block mb-1.5">{t('meetings.attachments')}</label>
          <DriveAttachmentPicker attachments={attachments} onChange={setAttachments} />
        </div>

        <div>
          <label className="text-sm font-medium text-ink-soft block mb-1.5">{t('meetings.summarySourceText')}</label>
          <p className="text-xs text-ink-soft mb-1.5">{t('meetings.summarySourceTextHelp')}</p>
          <Textarea
            placeholder={t('meetings.summarySourceTextPlaceholder')}
            value={summarySourceText}
            onChange={(e) => setSummarySourceText(e.target.value)}
            rows={6}
            lang={language}
            spellCheck
          />
        </div>

        {aiSummary && (
          <div className="bg-accent-light rounded-2xl p-3.5 flex flex-col gap-2">
            <span className="text-xs font-semibold text-accent flex items-center gap-1.5">
              <IconSparkles size={14} /> {t('meetings.aiSummary')}
            </span>
            <p className="text-sm text-ink whitespace-pre-wrap">{aiSummary}</p>
          </div>
        )}

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <div className="flex flex-wrap gap-2 pt-2">
          <Button onClick={handleSave} disabled={saving} icon={saved ? <IconCheck size={16} /> : undefined}>
            {t('common.save')}
          </Button>
          <Button
            variant="secondary"
            onClick={handleGenerateSummary}
            disabled={summarizing || (!notes.trim() && !summarySourceText.trim())}
            icon={<IconSparkles size={16} />}
          >
            {summarizing ? t('common.loading') : t('meetings.generateSummary')}
          </Button>
          <Button variant="danger" onClick={handleDeleteMeeting} icon={<IconTrash size={16} />}>
            {t('meetings.deleteMeeting')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
