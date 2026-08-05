import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import DriveAttachmentPicker from '@/components/weekly/DriveAttachmentPicker';
import { IconTrash, IconSparkles, IconCheck } from '@/components/ui/icons';
import { updateMeeting, deleteMeeting } from '@/firebase/meetings';
import { summarizeMeeting } from '@/services/ai';
import type { Meeting, DriveAttachment } from '@/types';

interface Props {
  meeting: Meeting;
  language: string;
  onClose: () => void;
}

export default function MeetingEditorModal({ meeting, language, onClose }: Props) {
  const { t } = useTranslation();

  const [title, setTitle] = useState(meeting.title);
  const [date, setDate] = useState(meeting.date);
  const [notes, setNotes] = useState(meeting.notes);
  const [attachments, setAttachments] = useState<DriveAttachment[]>(meeting.driveAttachments);
  const [summarySourceText, setSummarySourceText] = useState(meeting.summarySourceText);
  const [aiSummary, setAiSummary] = useState(meeting.aiSummary ?? '');

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [summarizing, setSummarizing] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await updateMeeting(meeting.id, {
        title,
        date,
        notes,
        driveAttachments: attachments,
        summarySourceText,
        aiSummary,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteMeeting() {
    await deleteMeeting(meeting.id);
    onClose();
  }

  async function handleGenerateSummary() {
    setSummarizing(true);
    try {
      const summary = await summarizeMeeting({ title, notes, summarySourceText, language });
      setAiSummary(summary);
      await updateMeeting(meeting.id, { aiSummary: summary });
    } finally {
      setSummarizing(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={meeting.title || t('meetings.newMeeting')} widthClass="max-w-2xl">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label={t('meetings.meetingTitle')}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="sm:col-span-2"
          />
          <Input label={t('meetings.date')} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

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
          <div className="bg-lav-50 rounded-2xl p-3.5 flex flex-col gap-2">
            <span className="text-xs font-semibold text-lav-600 flex items-center gap-1.5">
              <IconSparkles size={14} /> {t('meetings.aiSummary')}
            </span>
            <p className="text-sm text-ink whitespace-pre-wrap">{aiSummary}</p>
          </div>
        )}

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
