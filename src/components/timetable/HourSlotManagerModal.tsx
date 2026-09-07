import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { IconPlus, IconTrash, IconCheck } from '@/components/ui/icons';
import {
  addTimeSlotDef,
  updateTimeSlotDef,
  deleteTimeSlotDef,
  copyTimeSlotDefsToDays,
} from '@/firebase/timetable';
import type { TimeSlotDef, WeekDay } from '@/types';

const DAYS: { value: WeekDay; key: string }[] = [
  { value: 0, key: 'timetable.monday' },
  { value: 1, key: 'timetable.tuesday' },
  { value: 2, key: 'timetable.wednesday' },
  { value: 3, key: 'timetable.thursday' },
  { value: 4, key: 'timetable.friday' },
];

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map((n) => parseInt(n, 10) || 0);
  return h * 60 + m;
}

interface Props {
  open: boolean;
  onClose: () => void;
  day: WeekDay;
  defs: TimeSlotDef[]; // todas las franjas (de todos los días)
  ownerId: string;
  schoolYearId: string;
}

export default function HourSlotManagerModal({ open, onClose, day, defs, ownerId, schoolYearId }: Props) {
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);
  const [applyDays, setApplyDays] = useState<WeekDay[]>([]);
  const [applied, setApplied] = useState(false);

  // Ordenadas cronológicamente por hora de inicio (no por el campo `order`,
  // que solo refleja el orden de creación): así, al escribir una hora de
  // inicio distinta en una franja existente, la lista se reordena sola en
  // vez de quedarse "congelada" en la posición donde se creó.
  const dayDefs = defs.filter((d) => d.day === day).sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));

  async function handleAdd() {
    const last = dayDefs[dayDefs.length - 1];
    const startTime = last ? last.endTime : '08:00';
    const endTime = addMinutes(startTime, 55);
    const order = dayDefs.length;
    setSaving(true);
    try {
      await addTimeSlotDef(ownerId, schoolYearId, { day, startTime, endTime, order });
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(id: string, field: 'startTime' | 'endTime', value: string) {
    await updateTimeSlotDef(id, { [field]: value });
  }

  async function handleDelete(id: string) {
    await deleteTimeSlotDef(id);
  }

  function toggleApplyDay(d: WeekDay) {
    setApplyDays((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  }

  async function handleApplyToOtherDays() {
    if (applyDays.length === 0 || dayDefs.length === 0) return;
    setSaving(true);
    try {
      await copyTimeSlotDefsToDays(ownerId, schoolYearId, dayDefs, defs, applyDays);
      setApplied(true);
      setTimeout(() => setApplied(false), 2000);
      setApplyDays([]);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={t('timetable.configureHours')} widthClass="max-w-lg">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-ink-soft">{t('timetable.hourSlotsHelp')}</p>

        {dayDefs.length === 0 && <p className="text-sm text-ink-soft">{t('timetable.noHourSlots')}</p>}

        <div className="flex flex-col gap-2">
          {dayDefs.map((def) => (
            <div key={def.id} className="flex items-center gap-2">
              <Input
                type="time"
                value={def.startTime}
                onChange={(e) => handleUpdate(def.id, 'startTime', e.target.value)}
                className="flex-1"
              />
              <span className="text-ink-soft">—</span>
              <Input
                type="time"
                value={def.endTime}
                onChange={(e) => handleUpdate(def.id, 'endTime', e.target.value)}
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => handleDelete(def.id)}
                className="text-ink-soft hover:text-rose-600 shrink-0"
              >
                <IconTrash size={16} />
              </button>
            </div>
          ))}
        </div>

        <Button variant="secondary" size="sm" onClick={handleAdd} disabled={saving} icon={<IconPlus size={16} />} className="self-start">
          {t('timetable.addHourSlot')}
        </Button>

        {dayDefs.length > 0 && (
          <div className="border-t border-lav-100 pt-4 flex flex-col gap-2">
            <p className="text-sm font-medium text-ink-soft">{t('timetable.applyToOtherDays')}</p>
            <p className="text-xs text-ink-soft">{t('timetable.applyToOtherDaysHelp')}</p>
            <div className="flex gap-2 flex-wrap">
              {DAYS.filter((d) => d.value !== day).map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => toggleApplyDay(d.value)}
                  className={`text-xs font-semibold rounded-full px-3 py-1.5 border transition ${
                    applyDays.includes(d.value)
                      ? 'bg-accent text-white border-accent'
                      : 'bg-theme-card text-ink-soft border-theme hover:bg-accent-light'
                  }`}
                >
                  {t(d.key)}
                </button>
              ))}
            </div>
            <Button
              size="sm"
              onClick={handleApplyToOtherDays}
              disabled={applyDays.length === 0 || saving}
              icon={applied ? <IconCheck size={16} /> : undefined}
              className="self-start"
            >
              {t('timetable.applyToOtherDays')}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number);
  let total = h * 60 + m + minutes;
  total = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
  const newH = Math.floor(total / 60);
  const newM = total % 60;
  return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
}
