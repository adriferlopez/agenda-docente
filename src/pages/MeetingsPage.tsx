import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import { subscribeMeetings, createMeeting } from '@/firebase/meetings';
import { getWeekStart } from '@/utils/dates';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import MeetingCard from '@/components/meetings/MeetingCard';
import MeetingEditorModal from '@/components/meetings/MeetingEditorModal';
import { IconPlus } from '@/components/ui/icons';
import type { Meeting } from '@/types';

export default function MeetingsPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const { activeYear } = useSchoolYears();

  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!user || !activeYear) return;
    return subscribeMeetings(user.uid, activeYear.id, setMeetings);
  }, [user, activeYear]);

  async function handleCreate() {
    if (!user || !activeYear) return;
    setCreating(true);
    try {
      const id = await createMeeting(user.uid, activeYear.id, {
        title: '',
        date: getWeekStart(new Date()),
      });
      const newMeeting: Meeting = {
        id,
        ownerId: user.uid,
        schoolYearId: activeYear.id,
        title: '',
        date: getWeekStart(new Date()),
        notes: '',
        driveAttachments: [],
        summarySourceText: '',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setEditingMeeting(newMeeting);
    } finally {
      setCreating(false);
    }
  }

  if (!activeYear) {
    return <p className="text-sm text-ink-soft">{t('schoolYear.noYears')}</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl text-lav-600 mb-1">{t('meetings.title')}</h1>
          <p className="text-sm text-ink-soft">{t('meetings.subtitle')}</p>
        </div>
        <Button onClick={handleCreate} disabled={creating} icon={<IconPlus size={16} />}>
          {t('meetings.newMeeting')}
        </Button>
      </div>

      {meetings.length === 0 ? (
        <Card className="text-sm text-ink-soft">{t('meetings.noMeetings')}</Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} onClick={() => setEditingMeeting(meeting)} />
          ))}
        </div>
      )}

      {editingMeeting && (
        <MeetingEditorModal
          meeting={editingMeeting}
          language={profile?.language ?? 'es'}
          onClose={() => setEditingMeeting(null)}
        />
      )}
    </div>
  );
}
