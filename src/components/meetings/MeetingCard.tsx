import { format, parseISO } from 'date-fns';
import { IconLink } from '@/components/ui/icons-extra';
import { IconSparkles } from '@/components/ui/icons';
import type { Meeting } from '@/types';

interface Props {
  meeting: Meeting;
  onClick: () => void;
}

export default function MeetingCard({ meeting, onClick }: Props) {
  const dateLabel = (() => {
    try {
      return format(parseISO(meeting.date), 'd MMM yyyy');
    } catch {
      return meeting.date;
    }
  })();

  return (
    <button
      onClick={onClick}
      className="card-pastel p-4 text-left flex flex-col gap-2 hover:shadow-md transition aspect-square sm:aspect-[4/3]"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-lav-600 bg-lav-50 rounded-full px-2 py-0.5">{dateLabel}</span>
        {meeting.driveAttachments.length > 0 && (
          <span className="text-ink-soft flex items-center gap-1 text-xs">
            <IconLink size={14} />
            {meeting.driveAttachments.length}
          </span>
        )}
      </div>
      <p className="font-semibold text-ink line-clamp-2">{meeting.title}</p>
      <p className="text-xs text-ink-soft line-clamp-3 flex-1">{meeting.notes}</p>
      {meeting.aiSummary && (
        <span className="text-xs text-mint-600 flex items-center gap-1">
          <IconSparkles size={12} />
        </span>
      )}
    </button>
  );
}
