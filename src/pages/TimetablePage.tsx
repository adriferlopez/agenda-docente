import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import { subscribeSubjects } from '@/firebase/subjects';
import {
  subscribeTimetable,
  createTimetableSlot,
  updateTimetableSlot,
  deleteTimetableSlot,
  subscribeTimeSlotDefs,
  createDefaultTimeSlotDefs,
} from '@/firebase/timetable';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { subjectColorClasses } from '@/components/ui/subjectColors';
import Modal from '@/components/ui/Modal';
import HourSlotManagerModal from '@/components/timetable/HourSlotManagerModal';
import { IconPlus, IconTrash, IconSettings } from '@/components/ui/icons';
import { subjectDetails, specialTypeLabel } from '@/utils/timetableDisplay';
import type { Subject, TimetableSlot, TimeSlotDef, WeekDay, SpecialSlotType } from '@/types';
import { SPECIAL_SLOT_TYPES } from '@/types';

const DAYS: { value: WeekDay; key: string }[] = [
  { value: 0, key: 'timetable.monday' },
  { value: 1, key: 'timetable.tuesday' },
  { value: 2, key: 'timetable.wednesday' },
  { value: 3, key: 'timetable.thursday' },
  { value: 4, key: 'timetable.friday' },
];

export default function TimetablePage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const { activeYear } = useSchoolYears();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [slots, setSlots] = useState<TimetableSlot[]>([]);
  const [hourDefs, setHourDefs] = useState<TimeSlotDef[]>([]);
  const [editing, setEditing] = useState<{ day: WeekDay; hourDef: TimeSlotDef; slot?: TimetableSlot } | null>(null);
  const [configuringDay, setConfiguringDay] = useState<WeekDay | null>(null);
  const [creatingDefaults, setCreatingDefaults] = useState(false);

  useEffect(() => {
    if (!user || !activeYear) return;
    const unsubSubjects = subscribeSubjects(user.uid, activeYear.id, setSubjects);
    const unsubSlots = subscribeTimetable(user.uid, activeYear.id, setSlots);
    const unsubHours = subscribeTimeSlotDefs(user.uid, activeYear.id, setHourDefs);
    return () => {
      unsubSubjects();
      unsubSlots();
      unsubHours();
    };
  }, [user, activeYear]);

  const subjectById = useMemo(() => {
    const map = new Map<string, Subject>();
    subjects.forEach((s) => map.set(s.id, s));
    return map;
  }, [subjects]);

  // Filas de la tabla: unión de todas las franjas horarias distintas que
  // existen en cualquier día, ordenadas por hora de inicio.
  const hourRows = useMemo(() => {
    const seen = new Map<string, string>(); // startTime -> endTime (el primero que aparezca)
    hourDefs.forEach((d) => {
      if (!seen.has(d.startTime)) seen.set(d.startTime, d.endTime);
    });
    return Array.from(seen.entries())
      .map(([startTime, endTime]) => ({ startTime, endTime }))
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [hourDefs]);

  function getHourDef(day: WeekDay, startTime: string): TimeSlotDef | undefined {
    return hourDefs.find((d) => d.day === day && d.startTime === startTime);
  }

  function getSlot(day: WeekDay, startTime: string): TimetableSlot | undefined {
    return slots.find((s) => s.day === day && s.startTime === startTime);
  }

  async function handleUseDefaults() {
    if (!user || !activeYear) return;
    setCreatingDefaults(true);
    try {
      await createDefaultTimeSlotDefs(user.uid, activeYear.id);
    } finally {
      setCreatingDefaults(false);
    }
  }

  if (!activeYear) {
    return <p className="text-sm text-ink-soft">{t('schoolYear.noYears')}</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl text-lav-600 mb-1">{t('timetable.title')}</h1>
          <p className="text-sm text-ink-soft">{t('timetable.subtitle')}</p>
        </div>
      </div>

      {subjects.length === 0 && (
        <Card className="text-sm text-ink-soft">
          {t('subjects.noSubjects')} —{' '}
          <a href="/asignaturas" className="text-lav-600 font-semibold hover:underline">
            {t('subjects.create')}
          </a>
        </Card>
      )}

      {hourDefs.length === 0 ? (
        <Card className="flex flex-col gap-3 text-sm text-ink-soft">
          <p>{t('timetable.noHourSlots')}</p>
          <Button onClick={handleUseDefaults} disabled={creatingDefaults} className="self-start">
            {t('timetable.useDefaults')}
          </Button>
        </Card>
      ) : (
        <>
          {/* Vista desktop: tabla */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-separate border-spacing-2 min-w-[760px]">
              <thead>
                <tr>
                  <th className="w-24"></th>
                  {DAYS.map((d) => (
                    <th key={d.value} className="text-sm font-semibold text-ink-soft pb-2">
                      <div className="flex items-center justify-center gap-1.5">
                        {t(d.key)}
                        <button
                          onClick={() => setConfiguringDay(d.value)}
                          className="text-ink-soft hover:text-lav-600"
                          aria-label={t('timetable.configureHours')}
                        >
                          <IconSettings size={14} />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hourRows.map((hour) => (
                  <tr key={hour.startTime}>
                    <td className="text-xs text-ink-soft text-right pr-2 align-top pt-3">
                      {hour.startTime}
                      <br />
                      {hour.endTime}
                    </td>
                    {DAYS.map((d) => {
                      const hourDef = getHourDef(d.value, hour.startTime);
                      if (!hourDef) {
                        return <td key={d.value} />;
                      }
                      const slot = getSlot(d.value, hourDef.startTime);
                      const subject = slot?.subjectId ? subjectById.get(slot.subjectId) : undefined;
                      const colors = subject ? subjectColorClasses[subject.color] : null;
                      const isSpecial = slot && !slot.subjectId;
                      return (
                        <td key={d.value} className="align-top">
                          <button
                            onClick={() => setEditing({ day: d.value, hourDef, slot })}
                            className={`w-full min-h-[64px] rounded-2xl border text-left p-2.5 transition hover:shadow-sm ${
                              subject && colors
                                ? `${colors.bg} ${colors.border}`
                                : isSpecial
                                ? 'bg-butter-50 border-butter-200'
                                : 'bg-white border-dashed border-lav-200 hover:bg-lav-50'
                            }`}
                          >
                            {subject ? (
                              <div className={colors!.text}>
                                <p className="text-sm font-semibold">{subject.name}</p>
                                <p className="text-xs opacity-80">
                                  {subjectDetails(subject)}
                                  {slot?.room ? ` · ${slot.room}` : ''}
                                </p>
                              </div>
                            ) : isSpecial && slot ? (
                              <div className="text-butter-600">
                                <p className="text-sm font-semibold">{specialTypeLabel(t, slot)}</p>
                                {slot.room && <p className="text-xs opacity-80">{slot.room}</p>}
                              </div>
                            ) : (
                              <p className="text-xs text-ink-soft">{t('timetable.noSlot')}</p>
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Vista móvil: lista por día */}
          <div className="md:hidden flex flex-col gap-4">
            {DAYS.map((d) => {
              const dayDefs = hourDefs.filter((h) => h.day === d.value).sort((a, b) => a.order - b.order);
              return (
                <div key={d.value}>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-sm font-semibold text-ink-soft">{t(d.key)}</h2>
                    <button
                      onClick={() => setConfiguringDay(d.value)}
                      className="text-ink-soft hover:text-lav-600"
                      aria-label={t('timetable.configureHours')}
                    >
                      <IconSettings size={16} />
                    </button>
                  </div>
                  {dayDefs.length === 0 && <p className="text-xs text-ink-soft">{t('timetable.noHourSlots')}</p>}
                  <div className="flex flex-col gap-2">
                    {dayDefs.map((hourDef) => {
                      const slot = getSlot(d.value, hourDef.startTime);
                      const subject = slot?.subjectId ? subjectById.get(slot.subjectId) : undefined;
                      const colors = subject ? subjectColorClasses[subject.color] : null;
                      const isSpecial = slot && !slot.subjectId;
                      return (
                        <button
                          key={hourDef.id}
                          onClick={() => setEditing({ day: d.value, hourDef, slot })}
                          className={`w-full rounded-2xl border text-left p-3 flex items-center gap-3 ${
                            subject && colors
                              ? `${colors.bg} ${colors.border}`
                              : isSpecial
                              ? 'bg-butter-50 border-butter-200'
                              : 'bg-white border-lav-100'
                          }`}
                        >
                          <span className="text-xs text-ink-soft w-12 shrink-0">{hourDef.startTime}</span>
                          {subject ? (
                            <div className={colors!.text}>
                              <p className="text-sm font-semibold">{subject.name}</p>
                              <p className="text-xs opacity-80">{subjectDetails(subject)}</p>
                            </div>
                          ) : isSpecial && slot ? (
                            <div className="text-butter-600">
                              <p className="text-sm font-semibold">{specialTypeLabel(t, slot)}</p>
                            </div>
                          ) : (
                            <p className="text-xs text-ink-soft">{t('timetable.noSlot')}</p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {editing && (
        <SlotModal
          editing={editing}
          subjects={subjects}
          ownerId={user!.uid}
          schoolYearId={activeYear.id}
          onClose={() => setEditing(null)}
        />
      )}

      {configuringDay !== null && (
        <HourSlotManagerModal
          open
          onClose={() => setConfiguringDay(null)}
          day={configuringDay}
          defs={hourDefs}
          ownerId={user!.uid}
          schoolYearId={activeYear.id}
        />
      )}
    </div>
  );
}

function SlotModal({
  editing,
  subjects,
  ownerId,
  schoolYearId,
  onClose,
}: {
  editing: { day: WeekDay; hourDef: TimeSlotDef; slot?: TimetableSlot };
  subjects: Subject[];
  ownerId: string;
  schoolYearId: string;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const { slot, day, hourDef } = editing;
  const [kind, setKind] = useState<'subject' | 'special'>(slot && !slot.subjectId ? 'special' : 'subject');
  const [subjectId, setSubjectId] = useState(slot?.subjectId ?? subjects[0]?.id ?? '');
  const [specialType, setSpecialType] = useState<SpecialSlotType>(slot?.specialType ?? 'patio');
  const [specialLabel, setSpecialLabel] = useState(slot?.specialLabel ?? '');
  const [endTime, setEndTime] = useState(slot?.endTime ?? hourDef.endTime);
  const [room, setRoom] = useState(slot?.room ?? '');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const base = { day, startTime: hourDef.startTime, endTime, room: room || undefined };
      const data =
        kind === 'subject'
          ? { ...base, subjectId }
          : { ...base, specialType, specialLabel: specialType === 'otro' ? specialLabel : undefined };

      if (slot) {
        await updateTimetableSlot(slot.id, data);
      } else {
        await createTimetableSlot(ownerId, schoolYearId, data);
      }
      onClose();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!slot) return;
    await deleteTimetableSlot(slot.id);
    onClose();
  }

  const canSubmit = kind === 'subject' ? !!subjectId : specialType !== 'otro' || specialLabel.trim() !== '';

  return (
    <Modal open onClose={onClose} title={t('timetable.addSlot')}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-ink-soft block mb-1.5">{t('timetable.type')}</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setKind('subject')}
              className={`flex-1 text-sm font-semibold rounded-2xl px-3 py-2 border transition ${
                kind === 'subject' ? 'bg-lav-400 text-white border-lav-400' : 'bg-white text-ink-soft border-lav-200'
              }`}
            >
              {t('timetable.typeSubject')}
            </button>
            <button
              type="button"
              onClick={() => setKind('special')}
              className={`flex-1 text-sm font-semibold rounded-2xl px-3 py-2 border transition ${
                kind === 'special' ? 'bg-butter-400 text-white border-butter-400' : 'bg-white text-ink-soft border-lav-200'
              }`}
            >
              {t('timetable.typeSpecial')}
            </button>
          </div>
        </div>

        {kind === 'subject' ? (
          <Select
            label={t('timetable.selectSubject')}
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
          >
            <option value="" disabled>
              {t('timetable.selectSubject')}
            </option>
            {subjects.map((s) => {
              const details = [s.courseLevel, s.group].filter(Boolean).join(' ');
              return (
                <option key={s.id} value={s.id}>
                  {s.name}
                  {details ? ` (${details})` : ''}
                </option>
              );
            })}
          </Select>
        ) : (
          <>
            <Select
              label={t('timetable.specialType')}
              value={specialType}
              onChange={(e) => setSpecialType(e.target.value as SpecialSlotType)}
            >
              {SPECIAL_SLOT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {t(`timetable.special.${type}`)}
                </option>
              ))}
            </Select>
            {specialType === 'otro' && (
              <Input
                label={t('timetable.specialLabel')}
                placeholder={t('timetable.specialLabelPlaceholder')}
                value={specialLabel}
                onChange={(e) => setSpecialLabel(e.target.value)}
              />
            )}
          </>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Input label={t('timetable.startTime')} value={hourDef.startTime} disabled />
          <Input
            label={t('timetable.endTime')}
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <Input label={t('timetable.room')} value={room} onChange={(e) => setRoom(e.target.value)} />

        <div className="flex gap-2 mt-2">
          <Button type="submit" disabled={saving || !canSubmit} icon={<IconPlus size={16} />}>
            {t('common.save')}
          </Button>
          {slot && (
            <Button type="button" variant="danger" onClick={handleDelete} icon={<IconTrash size={16} />}>
              {t('timetable.removeSlot')}
            </Button>
          )}
          <Button type="button" variant="ghost" onClick={onClose}>
            {t('common.cancel')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
