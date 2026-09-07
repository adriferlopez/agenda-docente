import { useEffect, useMemo, useState } from 'react';
import { getDay, parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import { subscribeSubjects } from '@/firebase/subjects';
import { subscribeTimetable, updateTimetableSlot } from '@/firebase/timetable';
import {
  subscribeAllWeeklyPlans,
  upsertWeeklyPlan,
  updateWeeklyPlanField,
  deleteWeeklyPlan,
  weeklyPlanId,
  setWeeklyPlanDayStatus,
  shiftWeeklyPlanChain,
  weeklyPlanContentFrom,
  EMPTY_WEEKLY_PLAN_CONTENT,
} from '@/firebase/weeklyPlans';
import { subscribeSchoolHolidays, addSchoolHoliday, deleteSchoolHoliday } from '@/firebase/schoolHolidays';
import { subscribeMeetings } from '@/firebase/meetings';
import { subscribeMeetingFolders } from '@/firebase/meetingFolders';
import MeetingEditorModal from '@/components/meetings/MeetingEditorModal';
import { subscribeRubrics, createRubric } from '@/firebase/grades';
import { subscribeLearningSituations, createLearningSituation } from '@/firebase/learningSituations';
import { generateWeeklySuggestions, generateRubricFromCurriculum } from '@/services/ai';
import { getCurriculumForSubject } from '@/data/curriculum';
import { allCriteris, extractCriteriCodes, guessAreaName } from '@/data/curriculum/types';
import type { Etapa, Comunitat } from '@/data/curriculum/types';
import { getEffectiveEtapas } from '@/types';
import {
  getWeekStart,
  shiftWeek,
  formatWeekLabel,
  dateForDayInWeek,
  isoDateForDayInWeek,
  getMonthStart,
  shiftMonth,
  formatMonthLabel,
  getMonthCalendarDays,
  isoDateRange,
} from '@/utils/dates';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { subjectColorClasses } from '@/components/ui/subjectColors';
import { subjectDisplayName } from '@/utils/timetableDisplay';
import Modal from '@/components/ui/Modal';
import DriveAttachmentPicker from '@/components/weekly/DriveAttachmentPicker';
import TagMultiSelect from '@/components/ui/TagMultiSelect';
import { IconChevronLeft, IconChevronRight, IconSparkles, IconCheck, IconEdit, IconTrash, IconCalendar } from '@/components/ui/icons';
import { IconLink, IconMessage } from '@/components/ui/icons-extra';
import type { Subject, TimetableSlot, WeeklyPlan, WeekDay, Rubric, DayStatusType, SchoolHoliday, Meeting, MeetingFolder, LearningSituation, WeeklyCalendarStyle, PastelFolderColor } from '@/types';
import { DAY_STATUS_TYPES, PASTEL_FOLDER_COLORS } from '@/types';

type SubjectSlot = TimetableSlot & { subjectId: string };
type ViewMode = 'week' | 'month';

const DAYS: { value: WeekDay; key: string; short: string }[] = [
  { value: 0, key: 'timetable.monday',    short: 'L' },
  { value: 1, key: 'timetable.tuesday',   short: 'M' },
  { value: 2, key: 'timetable.wednesday', short: 'X' },
  { value: 3, key: 'timetable.thursday',  short: 'J' },
  { value: 4, key: 'timetable.friday',    short: 'V' },
];

export default function WeeklyPlanningPage() {
  const { t, i18n } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const { activeYear } = useSchoolYears();

  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));
  const [monthStart, setMonthStart] = useState(() => getMonthStart(new Date()));
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [slots, setSlots] = useState<TimetableSlot[]>([]);
  const [plans, setPlans] = useState<WeeklyPlan[]>([]);
  const [myRubrics, setMyRubrics] = useState<Rubric[]>([]);
  const [viewing, setViewing] = useState<{ slot: SubjectSlot; weekStartDate: string } | null>(null);
  const [editing, setEditing] = useState<{ slot: SubjectSlot; weekStartDate: string } | null>(null);
  const [dayStatusEditing, setDayStatusEditing] = useState<{ day: WeekDay; weekStartDate: string } | null>(null);
  const [holidays, setHolidays] = useState<SchoolHoliday[]>([]);
  const [showHolidaysModal, setShowHolidaysModal] = useState(false);
  const [showExcursionModal, setShowExcursionModal] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [meetingFolders, setMeetingFolders] = useState<MeetingFolder[]>([]);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);

  useEffect(() => {
    if (!user || !activeYear) return;
    const u1 = subscribeSubjects(user.uid, activeYear.id, setSubjects);
    const u2 = subscribeTimetable(user.uid, activeYear.id, setSlots);
    const u3 = subscribeRubrics(user.uid, activeYear.id, setMyRubrics);
    const u4 = subscribeSchoolHolidays(user.uid, activeYear.id, setHolidays);
    const u5 = subscribeMeetings(user.uid, activeYear.id, setMeetings);
    const u6 = subscribeMeetingFolders(user.uid, activeYear.id, setMeetingFolders);
    return () => { u1(); u2(); u3(); u4(); u5(); u6(); };
  }, [user, activeYear]);

  // Reuniones agrupadas por fecha ISO (yyyy-MM-dd), ordenadas por hora (las
  // que no tienen hora asignada van al final), para poder mostrarlas junto a
  // las asignaturas de cada día tanto en la vista semanal como en la mensual.
  const meetingsByDate = useMemo(() => {
    const m = new Map<string, Meeting[]>();
    meetings.forEach((mt) => {
      const list = m.get(mt.date) ?? [];
      list.push(mt);
      m.set(mt.date, list);
    });
    for (const list of m.values()) list.sort((a, b) => (a.time ?? '99:99').localeCompare(b.time ?? '99:99'));
    return m;
  }, [meetings]);

  // Fechas (ISO) marcadas como festivo del centro, independientes de si ese
  // día de la semana tiene clases programadas o no.
  const holidayByDate = useMemo(() => {
    const m = new Map<string, SchoolHoliday>();
    holidays.forEach((h) => m.set(h.date, h));
    return m;
  }, [holidays]);

  // Se cargan todas las programaciones semanales del curso (no solo la
  // semana visible) para poder mostrar tanto la vista semanal como la
  // mensual con los mismos datos, sin tener que resubscribirse al cambiar
  // de semana o mes.
  useEffect(() => {
    if (!user || !activeYear) return;
    return subscribeAllWeeklyPlans(user.uid, activeYear.id, setPlans);
  }, [user, activeYear]);

  const subjectById = useMemo(() => {
    const m = new Map<string, Subject>();
    subjects.forEach((s) => m.set(s.id, s));
    return m;
  }, [subjects]);

  // Los documentos de weeklyPlans tienen id determinista `${slotId}_${week}`,
  // así que se pueden indexar todos juntos y consultar cualquier semana.
  const planById = useMemo(() => {
    const m = new Map<string, WeeklyPlan>();
    plans.forEach((p) => m.set(p.id, p));
    return m;
  }, [plans]);

  function planFor(slotId: string, weekStartDate: string): WeeklyPlan | undefined {
    return planById.get(weeklyPlanId(slotId, weekStartDate));
  }

  // Todas las franjas de asignatura de un día concreto (para aplicar/leer la
  // marca de ausencia-salida-festivo a "todo el día" de una vez).
  function subjectSlotsForDay(day: WeekDay): SubjectSlot[] {
    return slots.filter((s): s is SubjectSlot => !!s.subjectId && s.day === day);
  }

  // Si se hace click en una celda ya marcada como ausencia/salida/festivo,
  // se abre el selector de motivo (para poder cambiarlo o quitarlo) en vez
  // del editor normal de programación, que queda bloqueado mientras dure la
  // marca.
  function handleSelectCell(slot: SubjectSlot, weekStartDate: string) {
    const plan = planFor(slot.id, weekStartDate);
    if (plan?.dayStatus) {
      setDayStatusEditing({ day: slot.day, weekStartDate });
    } else {
      setViewing({ slot, weekStartDate });
    }
  }

  const allRubrics = myRubrics;

  // Obtener horas únicas ordenadas
  const uniqueTimes = useMemo(() => {
    const times = new Map<string, { start: string; end: string }>();
    slots.filter((s) => !!s.subjectId).forEach((s) => {
      const key = `${s.startTime}-${s.endTime}`;
      if (!times.has(key)) times.set(key, { start: s.startTime, end: s.endTime });
    });
    return [...times.values()].sort((a, b) => a.start.localeCompare(b.start));
  }, [slots]);

  // Franjas de asignatura de cada día, ordenadas por hora — se apilan una
  // debajo de otra en su columna (sin huecos por horas que otro día no
  // tiene), con la franja horaria escrita dentro de cada recuadro.
  const slotsByDay = useMemo(() => {
    const m = new Map<WeekDay, SubjectSlot[]>();
    slots
      .filter((s): s is SubjectSlot => !!s.subjectId)
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
      .forEach((s) => {
        const list = m.get(s.day) ?? [];
        list.push(s);
        m.set(s.day, list);
      });
    return m;
  }, [slots]);

  if (!activeYear) return <p className="text-sm text-ink-soft">{t('schoolYear.noYears')}</p>;

  // Un día se muestra en la vista semanal si tiene clases programadas, o si
  // la fecha concreta de esa semana está marcada como festivo del centro
  // (aunque ese día de la semana no tenga ninguna franja horaria).
  const activeDays = DAYS.filter((d) =>
    slots.some((s) => s.day === d.value && !!s.subjectId) || holidayByDate.has(isoDateForDayInWeek(weekStart, d.value))
  );

  const hideSubjectsOnHolidays = profile?.hideSubjectsOnHolidays ?? false;

  async function toggleHideSubjectsOnHolidays() {
    const next = !hideSubjectsOnHolidays;
    if (profile) setProfile({ ...profile, hideSubjectsOnHolidays: next });
    if (user) await updateDoc(doc(db, 'users', user.uid), { hideSubjectsOnHolidays: next }).catch(() => null);
  }

  // El estilo se elige desde Horario; aquí solo se lee para que ambas
  // pantallas se vean consistentes.
  const weeklyCalendarStyle: WeeklyCalendarStyle = profile?.weeklyCalendarStyle ?? 'colorBg';

  return (
    <div className="flex flex-col gap-5">
      {/* Cabecera */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl text-accent mb-1">{t('weekly.title')}</h1>
          <p className="text-sm text-ink-soft">{t('weekly.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex rounded-full p-0.5" style={{ background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
            <button
              onClick={() => setViewMode('week')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition ${
                viewMode === 'week' ? 'bg-accent text-white' : ''
              }`}
              style={viewMode === 'week' ? undefined : { color: 'var(--text-secondary)' }}
            >
              {t('weekly.viewWeek')}
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition ${
                viewMode === 'month' ? 'bg-accent text-white' : ''
              }`}
              style={viewMode === 'month' ? undefined : { color: 'var(--text-secondary)' }}
            >
              {t('weekly.viewMonth')}
            </button>
          </div>
          <div className="flex items-center gap-2 rounded-full px-2 py-1"
            style={{ background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
            {viewMode === 'week' ? (
              <>
                <button onClick={() => setWeekStart((w) => shiftWeek(w, -1))}
                  className="p-1.5 rounded-full" style={{ color: 'var(--text-secondary)' }}>
                  <IconChevronLeft size={18} />
                </button>
                <span className="text-sm font-medium px-1" style={{ color: 'var(--text-primary)' }}>
                  {t('weekly.week')} {formatWeekLabel(weekStart, i18n.language)}
                </span>
                <button onClick={() => setWeekStart((w) => shiftWeek(w, 1))}
                  className="p-1.5 rounded-full" style={{ color: 'var(--text-secondary)' }}>
                  <IconChevronRight size={18} />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setMonthStart((m) => shiftMonth(m, -1))}
                  className="p-1.5 rounded-full" style={{ color: 'var(--text-secondary)' }}>
                  <IconChevronLeft size={18} />
                </button>
                <span className="text-sm font-medium px-1 capitalize" style={{ color: 'var(--text-primary)' }}>
                  {formatMonthLabel(monthStart, i18n.language)}
                </span>
                <button onClick={() => setMonthStart((m) => shiftMonth(m, 1))}
                  className="p-1.5 rounded-full" style={{ color: 'var(--text-secondary)' }}>
                  <IconChevronRight size={18} />
                </button>
              </>
            )}
          </div>
          <Button size="sm" variant="secondary" icon={<IconCalendar size={16} />} onClick={() => setShowHolidaysModal(true)}>
            {t('weekly.holidays.button')}
          </Button>
          <Button size="sm" variant="secondary" icon={<IconCalendar size={16} />} onClick={() => setShowExcursionModal(true)}>
            {t('weekly.excursions.button')}
          </Button>
          <label
            className="flex items-center gap-1.5 text-xs font-medium cursor-pointer select-none px-1"
            style={{ color: 'var(--text-secondary)' }}
            title={t('weekly.holidays.hideSubjectsHelp')}
          >
            <input
              type="checkbox"
              checked={hideSubjectsOnHolidays}
              onChange={toggleHideSubjectsOnHolidays}
              className="rounded"
            />
            {t('weekly.holidays.hideSubjects')}
          </label>
        </div>
      </div>

      {uniqueTimes.length === 0 && (
        <Card className="text-sm text-ink-soft">
          {t('timetable.noSlot')} —{' '}
          <a href="/horario" className="text-accent font-semibold hover:underline">
            {t('timetable.title')}
          </a>
        </Card>
      )}

      {/* ── Vista semanal: una columna por día, las asignaturas apiladas
          una debajo de otra (sin huecos por franjas que otros días no
          tienen), con la franja horaria escrita dentro de cada recuadro. ── */}
      {uniqueTimes.length > 0 && viewMode === 'week' && (
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-3 items-start" style={{ minWidth: `${activeDays.length * 150}px` }}>
            {activeDays.map((d) => {
              const daySlots = slotsByDay.get(d.value) ?? [];
              const dayIso = isoDateForDayInWeek(weekStart, d.value);
              const holiday = holidayByDate.get(dayIso);
              const dayMeetings = meetingsByDate.get(dayIso) ?? [];
              return (
                <div key={d.value} className="flex-1 min-w-[150px] flex flex-col gap-2">
                  <div className="text-xs font-semibold pb-1 text-center" style={{ color: 'var(--accent)' }}>
                    <div className="flex items-center justify-center gap-1">
                      <span className="hidden sm:block">{t(d.key)}</span>
                      <span className="sm:hidden">{d.short}</span>
                    </div>
                    <span className="block text-[10px] font-normal mt-0.5"
                      style={{ color: 'var(--text-secondary)' }}>
                      {dateForDayInWeek(weekStart, d.value, i18n.language)}
                    </span>
                  </div>

                  {holiday && (
                    <div className="rounded-xl px-2.5 py-2 text-center bg-butter-100">
                      <p className="text-[10px] font-bold text-butter-600">{t('weekly.holidays.badge')}</p>
                      {holiday.label && <p className="text-[10px] text-butter-600 mt-0.5 truncate">{holiday.label}</p>}
                    </div>
                  )}

                  {holiday && hideSubjectsOnHolidays ? null : daySlots.length === 0 ? (
                    <div className="rounded-xl min-h-[56px]" style={{ background: 'var(--bg-input)', opacity: 0.3 }} />
                  ) : (
                    daySlots.map((slot) => {
                      const plan = planFor(slot.id, weekStart);
                      const subject = subjectById.get(slot.subjectId);
                      const colors = subject ? subjectColorClasses[subject.color] : null;

                      if (plan?.dayStatus) {
                        return (
                          <button
                            key={slot.id}
                            onClick={() => handleSelectCell(slot, weekStart)}
                            className="w-full text-left rounded-xl px-2.5 py-2 transition hover:opacity-85 border"
                            style={{ background: 'var(--bg-input)', borderColor: 'var(--border)', opacity: 0.75 }}
                          >
                            <p className="text-[10px] font-medium mb-0.5" style={{ color: 'var(--text-secondary)' }}>
                              {slot.startTime}–{slot.endTime}
                            </p>
                            <p className="text-[11px] font-bold truncate" style={{ color: 'var(--text-secondary)' }}>
                              {subject ? subjectDisplayName(subject) : ''}
                            </p>
                            <p className="text-[10px] mt-0.5 leading-tight" style={{ color: 'var(--text-secondary)' }}>
                              {t(`weekly.dayStatus.${plan.dayStatus.type}`)}
                              {plan.dayStatus.note ? ` ${plan.dayStatus.note}` : ''}
                            </p>
                          </button>
                        );
                      }

                      // Cuatro estilos posibles (ver weeklyCalendarStyle):
                      // colorBg (original) colorea el fondo entero; los otros
                      // tres dejan el fondo blanco/del tema y solo colorean el
                      // texto, con "stripe" añadiendo además una franja
                      // lateral de color (un <span> aparte, no un borde, para
                      // no pelear con el borde normal de la tarjeta).
                      const textColorClass = colors?.text ?? 'text-accent';
                      const cellBg =
                        weeklyCalendarStyle === 'colorBg'
                          ? (colors?.bg ?? 'bg-accent-light')
                          : weeklyCalendarStyle === 'colorTitleTheme'
                            ? ''
                            : 'bg-white';
                      const cellBorderClass = weeklyCalendarStyle === 'colorBg' || weeklyCalendarStyle === 'colorTitleWhite'
                        ? (colors?.border ?? 'border-accent')
                        : '';
                      const cellStyle = weeklyCalendarStyle === 'colorTitleTheme'
                        ? { background: 'var(--bg-input)', borderColor: 'var(--border)' }
                        : weeklyCalendarStyle === 'stripe'
                          ? { borderColor: 'var(--border)' }
                          : undefined;
                      // Solo "colorTitleTheme" tiene un fondo adaptativo
                      // (var(--bg-input)); los otros tres estilos pintan un
                      // fondo pastel FIJO (el color de la asignatura, o
                      // blanco), igual en claro y oscuro. El título/nota de
                      // la actividad usaba var(--text-primary) (adaptativo,
                      // casi blanco en oscuro) en los cuatro casos, así que
                      // en modo oscuro quedaba casi invisible sobre esos
                      // fondos claros fijos. Aquí reutiliza el mismo color
                      // fijo (textColorClass) que ya usan la hora y el
                      // nombre de la asignatura en esta misma tarjeta.
                      const usesFixedLightBg = weeklyCalendarStyle !== 'colorTitleTheme';

                      return (
                        <button
                          key={slot.id}
                          onClick={() => handleSelectCell(slot, weekStart)}
                          className={`w-full text-left rounded-xl transition hover:opacity-85 border flex overflow-hidden ${cellBg} ${cellBorderClass}`}
                          style={cellStyle}
                        >
                          {weeklyCalendarStyle === 'stripe' && (
                            <span className={`w-1.5 shrink-0 ${colors?.dot ?? 'bg-accent'}`} />
                          )}
                          <span className="flex-1 min-w-0 px-2.5 py-2">
                            <p className={`text-[10px] font-medium mb-0.5 opacity-70 ${textColorClass}`}>
                              {slot.startTime}–{slot.endTime}
                            </p>
                            <p className={`text-[11px] font-bold truncate ${textColorClass}`}>
                              {subject ? subjectDisplayName(subject) : ''}
                            </p>
                            {plan?.title ? (
                              <p
                                className={`text-[10px] mt-0.5 leading-tight opacity-80 line-clamp-2 ${usesFixedLightBg ? textColorClass : ''}`}
                                style={usesFixedLightBg ? undefined : { color: 'var(--text-primary)' }}
                              >
                                {plan.title}
                              </p>
                            ) : (
                              <p
                                className={`text-[10px] mt-0.5 opacity-40 italic ${usesFixedLightBg ? textColorClass : ''}`}
                                style={usesFixedLightBg ? undefined : { color: 'var(--text-secondary)' }}
                              >
                                {t('weekly.emptySlot')}
                              </p>
                            )}
                            {plan?.status && plan.status !== 'planned' && (
                              <StatusBadge status={plan.status} />
                            )}
                          </span>
                        </button>
                      );
                    })
                  )}

                  {dayMeetings.length > 0 && (
                    <div className="flex flex-col gap-1.5 pt-1">
                      {dayMeetings.map((mt) => (
                        <button
                          key={mt.id}
                          onClick={() => setEditingMeeting(mt)}
                          className="w-full text-left rounded-xl px-2.5 py-2 transition hover:opacity-85 bg-sky-50 border border-sky-200"
                        >
                          <p className="text-[10px] font-medium mb-0.5 text-sky-600 flex items-center gap-1">
                            <IconMessage size={11} />
                            {mt.time ? mt.time : t('weekly.meetings.noTime')}
                          </p>
                          <p className="text-[11px] font-bold truncate text-sky-600">{mt.title}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Vista mensual ── */}
      {uniqueTimes.length > 0 && viewMode === 'month' && (
        <MonthGrid
          monthStart={monthStart}
          slots={slots}
          planFor={planFor}
          holidayByDate={holidayByDate}
          meetingsByDate={meetingsByDate}
          onSelectMeeting={setEditingMeeting}
          onSelectStatusDay={(day, weekStartDate) => setDayStatusEditing({ day, weekStartDate })}
          onOpenHolidays={() => setShowHolidaysModal(true)}
        />
      )}

      {/* Modal de solo lectura */}
      {viewing && (
        <PlanViewModal
          slot={viewing.slot}
          subject={subjectById.get(viewing.slot.subjectId)}
          plan={planFor(viewing.slot.id, viewing.weekStartDate)}
          allRubrics={allRubrics}
          allSlots={slots}
          allPlans={plans}
          schoolYearEndDate={activeYear.endDate}
          ownerId={user!.uid}
          schoolYearId={activeYear.id}
          weekStart={viewing.weekStartDate}
          onClose={() => setViewing(null)}
          onEdit={() => { setEditing(viewing); setViewing(null); }}
        />
      )}

      {/* Modal de edición */}
      {editing && (
        <PlanEditorModal
          slot={editing.slot}
          subject={subjectById.get(editing.slot.subjectId)}
          plan={planFor(editing.slot.id, editing.weekStartDate)}
          allRubrics={allRubrics}
          allSubjects={subjects}
          allSlots={slots}
          ownerId={user!.uid}
          schoolYearId={activeYear.id}
          weekStart={editing.weekStartDate}
          language={profile?.language ?? 'es'}
          onClose={() => setEditing(null)}
        />
      )}

      {/* Marcar/quitar ausencia, salida o festivo para todo el día */}
      {dayStatusEditing && (
        <DayStatusModal
          day={dayStatusEditing.day}
          weekStartDate={dayStatusEditing.weekStartDate}
          slotsForDay={subjectSlotsForDay(dayStatusEditing.day)}
          initialStatus={subjectSlotsForDay(dayStatusEditing.day)
            .map((s) => planFor(s.id, dayStatusEditing.weekStartDate)?.dayStatus)
            .find(Boolean)}
          ownerId={user!.uid}
          schoolYearId={activeYear.id}
          onClose={() => setDayStatusEditing(null)}
        />
      )}

      {showHolidaysModal && (
        <HolidaysModal
          holidays={holidays}
          ownerId={user!.uid}
          schoolYearId={activeYear.id}
          onClose={() => setShowHolidaysModal(false)}
        />
      )}

      {showExcursionModal && (
        <ExcursionModal
          slots={slots}
          ownerId={user!.uid}
          schoolYearId={activeYear.id}
          onClose={() => setShowExcursionModal(false)}
        />
      )}

      {editingMeeting && (
        <MeetingEditorModal
          meeting={editingMeeting}
          language={i18n.language}
          folders={meetingFolders}
          onClose={() => setEditingMeeting(null)}
        />
      )}
    </div>
  );
}

// Selector de color por evento (festivo/ausencia/salida/otros): reutiliza la
// misma paleta pastel de 6 colores que las carpetas de Reuniones y el Mural,
// para que el docente pueda distinguir a simple vista eventos del mismo tipo
// (p.ej. dos salidas distintas) en la vista mensual. "Auto" (sin elegir
// ninguno) usa el color por defecto de ese tipo de evento.
function ColorSwatchPicker({ value, onChange }: {
  value: PastelFolderColor | undefined;
  onChange: (color: PastelFolderColor | undefined) => void;
}) {
  const { t } = useTranslation();
  return (
    <div>
      <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>
        {t('weekly.eventColor.label')}
      </label>
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => onChange(undefined)}
          className={`w-7 h-7 rounded-full flex items-center justify-center text-[8px] font-semibold transition ${
            !value ? 'ring-2 ring-offset-2 ring-ink' : ''
          }`}
          style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', background: 'var(--bg-input)' }}
          aria-label={t('weekly.eventColor.auto')}
          title={t('weekly.eventColor.auto')}
        >
          {t('weekly.eventColor.autoShort')}
        </button>
        {PASTEL_FOLDER_COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            className={`w-7 h-7 rounded-full transition ${subjectColorClasses[c].dot} ${
              value === c ? 'ring-2 ring-offset-2 ring-ink' : ''
            }`}
            aria-label={c}
            title={c}
          />
        ))}
      </div>
    </div>
  );
}

// ── Modal de gestión de festivos del centro (fechas concretas, con
// independencia de las franjas horarias) ──
function HolidaysModal({ holidays, ownerId, schoolYearId, onClose }: {
  holidays: SchoolHoliday[];
  ownerId: string;
  schoolYearId: string;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [label, setLabel] = useState('');
  const [color, setColor] = useState<PastelFolderColor | undefined>(undefined);
  const [saving, setSaving] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!startDate) return;
    setSaving(true);
    try {
      const dates = isoDateRange(startDate, endDate || startDate);
      await Promise.all(dates.map((d) => addSchoolHoliday(ownerId, schoolYearId, d, label.trim() || undefined, color)));
      setStartDate('');
      setEndDate('');
      setLabel('');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={t('weekly.holidays.title')} widthClass="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t('weekly.holidays.help')}</p>

        {/* Rejilla en vez de flex+wrap: con 3 campos + botón en una sola
            fila que envuelve, en pantallas estrechas los <input
            type="date"> (que no se dejan encoger por debajo de su ancho
            nativo) terminaban invadiéndose entre sí. Aquí cada campo tiene
            siempre su propia fila/celda completa. */}
        <form onSubmit={handleAdd} className="flex flex-col gap-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Input type="date" label={t('weekly.holidays.dateStart')} value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            <Input type="date" label={t('weekly.holidays.dateEnd')} value={endDate} min={startDate || undefined} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <Input label={t('weekly.holidays.label')} placeholder={t('weekly.holidays.labelPlaceholder')} value={label} onChange={(e) => setLabel(e.target.value)} />
          <ColorSwatchPicker value={color} onChange={setColor} />
          <Button type="submit" size="sm" disabled={!startDate || saving} className="self-start">{t('common.add')}</Button>
        </form>

        {holidays.length === 0 ? (
          <p className="text-sm text-ink-soft">{t('weekly.holidays.none')}</p>
        ) : (
          <div className="flex flex-col divide-y divide-lav-100 max-h-72 overflow-y-auto">
            {holidays.map((h) => (
              <div key={h.id} className="py-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {h.color && <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${subjectColorClasses[h.color].dot}`} />}
                  <div>
                    <p className="text-sm font-medium text-ink">{h.date}</p>
                    {h.label && <p className="text-xs text-ink-soft">{h.label}</p>}
                  </div>
                </div>
                <button
                  onClick={() => deleteSchoolHoliday(h.id)}
                  className="text-ink-soft hover:text-rose-600 p-1"
                  aria-label={t('common.delete')}
                >
                  <IconTrash size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <Button variant="ghost" onClick={onClose}>{t('common.close')}</Button>
        </div>
      </div>
    </Modal>
  );
}

// "holiday" ya no es una opción seleccionable aquí: los festivos del centro
// se gestionan aparte (botón "Festius" en la cabecera), así que se excluye
// de la lista para no duplicar esa función. Se mantiene en DAY_STATUS_TYPES
// (tipos.ts) por compatibilidad con marcas antiguas ya guardadas.
const SELECTABLE_DAY_STATUS_TYPES = DAY_STATUS_TYPES.filter((opt) => opt !== 'holiday');

// ── Modal para marcar/quitar ausencia o salida de todo un día ──
function DayStatusModal({ day, weekStartDate, slotsForDay, singleSlot, initialStatus, ownerId, schoolYearId, onClose, onSaved }: {
  day: WeekDay;
  weekStartDate: string;
  slotsForDay: SubjectSlot[];
  // Cuando el modal se abre desde dentro del editor de una tarea concreta,
  // se pasa la franja de esa tarea para poder ofrecer "solo esta sesión"
  // como alternativa a "todo el día" (si no se pasa, p.ej. al abrir desde
  // el icono de calendario de la cabecera del día, siempre es todo el día).
  singleSlot?: SubjectSlot;
  initialStatus?: WeeklyPlan['dayStatus'];
  ownerId: string;
  schoolYearId: string;
  onClose: () => void;
  // Se llama, además de onClose, cuando se aplica o se quita la marca con
  // éxito (pero no al cancelar) — lo usa el editor de tareas para cerrarse
  // también él, ya que si el día queda marcado no hay nada que programar.
  onSaved?: () => void;
}) {
  const { t } = useTranslation();
  const dayLabel = t(DAYS.find((d) => d.value === day)?.key ?? '');
  const existing = initialStatus;
  const [type, setType] = useState<DayStatusType>(existing?.type ?? 'absence');
  const [note, setNote] = useState(existing?.note ?? '');
  const [color, setColor] = useState<PastelFolderColor | undefined>(existing?.color);
  const [scope, setScope] = useState<'single' | 'day'>('single');
  const [saving, setSaving] = useState(false);

  const targetSlots = singleSlot && scope === 'single' ? [singleSlot] : slotsForDay;

  async function apply() {
    setSaving(true);
    try {
      await Promise.all(
        targetSlots.map((s) =>
          setWeeklyPlanDayStatus(ownerId, schoolYearId, s.id, s.subjectId, weekStartDate, {
            type,
            ...((type === 'outing' || type === 'other') && note.trim() ? { note: note.trim() } : {}),
            ...(color ? { color } : {}),
          })
        )
      );
      onClose();
      onSaved?.();
    } finally {
      setSaving(false);
    }
  }

  async function clear() {
    setSaving(true);
    try {
      await Promise.all(
        targetSlots.map((s) => setWeeklyPlanDayStatus(ownerId, schoolYearId, s.id, s.subjectId, weekStartDate, null))
      );
      onClose();
      onSaved?.();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={`${t('weekly.dayStatus.title')} · ${dayLabel}`} widthClass="max-w-sm">
      <div className="flex flex-col gap-4">
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t('weekly.dayStatus.help')}</p>

        {slotsForDay.length === 0 ? (
          <p className="text-sm text-ink-soft italic">{t('weekly.dayStatus.noSlots')}</p>
        ) : (
          <>
            {singleSlot && (
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--text-primary)' }}>
                  <input type="radio" name="dayStatusScope" checked={scope === 'single'} onChange={() => setScope('single')} />
                  {t('weekly.dayStatus.scopeSingle')}
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--text-primary)' }}>
                  <input type="radio" name="dayStatusScope" checked={scope === 'day'} onChange={() => setScope('day')} />
                  {t('weekly.dayStatus.scopeDay')}
                </label>
              </div>
            )}

            <div className="flex flex-col gap-2">
              {SELECTABLE_DAY_STATUS_TYPES.map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--text-primary)' }}>
                  <input type="radio" name="dayStatusType" checked={type === opt} onChange={() => setType(opt)} />
                  {t(`weekly.dayStatus.${opt}`)}
                </label>
              ))}
            </div>

            {type === 'outing' && (
              <Input
                label={t('weekly.dayStatus.outingLabel')}
                placeholder={t('weekly.dayStatus.outingPlaceholder')}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            )}

            {type === 'other' && (
              <Input
                label={t('weekly.dayStatus.otherLabel')}
                placeholder={t('weekly.dayStatus.otherPlaceholder')}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            )}

            <ColorSwatchPicker value={color} onChange={setColor} />

            <div className="flex flex-wrap gap-2 pt-1">
              <Button onClick={apply} disabled={saving}>{t('common.save')}</Button>
              {existing && (
                <Button variant="danger" onClick={clear} disabled={saving}>{t('weekly.dayStatus.clear')}</Button>
              )}
              <Button variant="ghost" onClick={onClose}>{t('common.cancel')}</Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

// ── Modal de "Excursiones": marcar ausencia/salida/otros para uno o varios
// días de una vez (junto a "Festius del centre" en la cabecera). Antes esto
// solo se podía hacer día a día (o sesión a sesión), lo que obligaba a
// repetir la operación para cada día de una salida de varios días. Aquí se
// elige un rango de fechas (inicio y fin, puede ser el mismo día) y se
// aplica a todas las franjas de asignatura de esos días de una sola vez —
// recorriendo cada fecha del rango y resolviendo, si el rango cruza más de
// una semana, la semana (lunes ISO) a la que pertenece cada una, ya que las
// programaciones semanales se guardan un documento por semana.
function ExcursionModal({ slots, ownerId, schoolYearId, onClose }: {
  slots: TimetableSlot[];
  ownerId: string;
  schoolYearId: string;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState<DayStatusType>('outing');
  const [note, setNote] = useState('');
  const [color, setColor] = useState<PastelFolderColor | undefined>(undefined);
  const [saving, setSaving] = useState(false);

  const slotsByWeekday = useMemo(() => {
    const m = new Map<WeekDay, SubjectSlot[]>();
    slots.filter((s): s is SubjectSlot => !!s.subjectId).forEach((s) => {
      const list = m.get(s.day) ?? [];
      list.push(s);
      m.set(s.day, list);
    });
    return m;
  }, [slots]);

  // Por cada fecha del rango (solo cuentan los días lectivos de lunes a
  // viernes, que son los únicos con franjas horarias), la semana (lunes ISO)
  // a la que pertenece esa fecha y las franjas de asignatura de ese día de
  // la semana — un mismo par (semana, franja) identifica de forma única el
  // documento de programación semanal a marcar.
  const targets = useMemo(() => {
    if (!startDate) return [] as { weekStartDate: string; slot: SubjectSlot }[];
    const dates = isoDateRange(startDate, endDate || startDate);
    const out: { weekStartDate: string; slot: SubjectSlot }[] = [];
    dates.forEach((iso) => {
      const date = parseISO(iso);
      const jsDay = getDay(date); // 0=Dom..6=Sáb
      if (jsDay < 1 || jsDay > 5) return;
      const weekday = (jsDay - 1) as WeekDay;
      const weekStartDate = getWeekStart(date);
      (slotsByWeekday.get(weekday) ?? []).forEach((slot) => out.push({ weekStartDate, slot }));
    });
    return out;
  }, [startDate, endDate, slotsByWeekday]);

  async function apply() {
    if (targets.length === 0) return;
    setSaving(true);
    try {
      await Promise.all(
        targets.map(({ weekStartDate, slot }) =>
          setWeeklyPlanDayStatus(ownerId, schoolYearId, slot.id, slot.subjectId, weekStartDate, {
            type,
            ...((type === 'outing' || type === 'other') && note.trim() ? { note: note.trim() } : {}),
            ...(color ? { color } : {}),
          })
        )
      );
      onClose();
    } finally {
      setSaving(false);
    }
  }

  async function clear() {
    if (targets.length === 0) return;
    setSaving(true);
    try {
      await Promise.all(
        targets.map(({ weekStartDate, slot }) =>
          setWeeklyPlanDayStatus(ownerId, schoolYearId, slot.id, slot.subjectId, weekStartDate, null)
        )
      );
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={t('weekly.excursions.title')} widthClass="max-w-sm">
      <div className="flex flex-col gap-4">
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t('weekly.excursions.help')}</p>

        {/* Rejilla de 2 columnas en vez de flex+wrap: con flex, dos <input
            type="date"> no se dejan encoger por debajo de su ancho mínimo
            nativo (sobre todo en Safari/iOS), así que en pantallas
            estrechas terminaban invadiéndose entre sí en vez de bajar
            limpiamente a una fila cada uno. Con grid cada fecha ocupa
            siempre el 100% de su celda, sin solape posible. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Input
            type="date"
            label={t('weekly.excursions.dateStart')}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <Input
            type="date"
            label={t('weekly.excursions.dateEnd')}
            value={endDate}
            min={startDate || undefined}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          {SELECTABLE_DAY_STATUS_TYPES.map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--text-primary)' }}>
              <input type="radio" name="excursionType" checked={type === opt} onChange={() => setType(opt)} />
              {t(`weekly.dayStatus.${opt}`)}
            </label>
          ))}
        </div>

        {type === 'outing' && (
          <Input
            label={t('weekly.dayStatus.outingLabel')}
            placeholder={t('weekly.dayStatus.outingPlaceholder')}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        )}

        {type === 'other' && (
          <Input
            label={t('weekly.dayStatus.otherLabel')}
            placeholder={t('weekly.dayStatus.otherPlaceholder')}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        )}

        <ColorSwatchPicker value={color} onChange={setColor} />

        {startDate && (
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {targets.length === 0
              ? t('weekly.excursions.noSlotsInRange')
              : t('weekly.excursions.summary', { count: targets.length })}
          </p>
        )}

        <div className="flex flex-wrap gap-2 pt-1">
          <Button onClick={apply} disabled={saving || targets.length === 0}>{t('common.save')}</Button>
          <Button variant="danger" onClick={clear} disabled={saving || targets.length === 0}>
            {t('weekly.dayStatus.clear')}
          </Button>
          <Button variant="ghost" onClick={onClose}>{t('common.cancel')}</Button>
        </div>
      </div>
    </Modal>
  );
}

// Colores por defecto (cuando el evento no tiene `color` propio elegido) del
// badge/barra de día completo (ausencia/salida/festivo/otros) en la vista
// mensual — mismo criterio de paleta que StatusBadge, para que se distinga
// de un vistazo sin tener que leer el texto. Se usan como {bg,text} en vez
// de una única cadena para poder combinarlos con el color personalizado
// (subjectColorClasses) con la misma forma.
const DAY_STATUS_BADGE_STYLES: Record<DayStatusType, { bg: string; text: string }> = {
  absence: { bg: 'bg-rose-100', text: 'text-rose-600' },
  outing: { bg: 'bg-sky-100', text: 'text-sky-600' },
  holiday: { bg: 'bg-butter-100', text: 'text-butter-600' },
  other: { bg: 'bg-lav-100', text: 'text-lav-600' },
};

// Una "barra" de la vista mensual: un festivo o una marca de
// ausencia/salida/otros que ocupa una o varias columnas (días) consecutivas
// dentro de la misma fila (semana). Al agrupar así los días consecutivos con
// el mismo evento, una salida de varios días se ve como una única franja de
// principio a fin en vez de repetir la misma etiqueta en cada casilla.
interface MonthBar {
  key: string;
  weekIndex: number;
  startCol: number; // 0 = lunes de esa fila
  endCol: number; // inclusive
  label: string;
  title: string;
  bg: string;
  text: string;
  onClick: () => void;
}

// ── Vista mensual ─────────────────────────────────────────────────────
function MonthGrid({ monthStart, slots, planFor, holidayByDate, meetingsByDate, onSelectMeeting, onSelectStatusDay, onOpenHolidays }: {
  monthStart: string;
  slots: TimetableSlot[];
  planFor: (slotId: string, weekStartDate: string) => WeeklyPlan | undefined;
  holidayByDate: Map<string, SchoolHoliday>;
  meetingsByDate: Map<string, Meeting[]>;
  onSelectMeeting: (meeting: Meeting) => void;
  // Permiten clicar una barra de festivo/ausencia/salida/otros y abrir su
  // editor correspondiente, igual que ya se puede desde la vista semanal.
  onSelectStatusDay: (day: WeekDay, weekStartDate: string) => void;
  onOpenHolidays: () => void;
}) {
  const { t } = useTranslation();
  const calendarDays = useMemo(() => getMonthCalendarDays(monthStart), [monthStart]);
  const currentMonth = monthStart.slice(0, 7); // yyyy-MM
  const weekCount = Math.ceil(calendarDays.length / 7);

  // slots por día de la semana (0=lunes...4=viernes), ya con subjectId
  const slotsByWeekday = useMemo(() => {
    const m = new Map<number, SubjectSlot[]>();
    slots.filter((s): s is SubjectSlot => !!s.subjectId).forEach((s) => {
      const list = m.get(s.day) ?? [];
      list.push(s);
      m.set(s.day, list);
    });
    for (const list of m.values()) list.sort((a, b) => a.startTime.localeCompare(b.startTime));
    return m;
  }, [slots]);

  // Info resuelta de cada día del calendario (42 o 35 casillas): festivo,
  // marca de ausencia/salida/otros y reuniones de ese día concreto.
  const dayInfos = useMemo(
    () =>
      calendarDays.map((iso) => {
        const date = parseISO(iso);
        const jsDay = getDay(date); // 0=Dom..6=Sáb
        const weekday: WeekDay | null = jsDay >= 1 && jsDay <= 5 ? ((jsDay - 1) as WeekDay) : null;
        const inMonth = iso.slice(0, 7) === currentMonth;
        const dayWeekStart = getWeekStart(date);
        const daySlots = weekday !== null ? slotsByWeekday.get(weekday) ?? [] : [];
        const dayStatus = daySlots
          .map((slot) => planFor(slot.id, dayWeekStart)?.dayStatus)
          .find((status): status is NonNullable<typeof status> => Boolean(status));
        const holiday = holidayByDate.get(iso);
        const meetings = meetingsByDate.get(iso) ?? [];
        return { iso, date, inMonth, holiday, dayStatus, meetings, weekday, weekStartDate: dayWeekStart };
      }),
    [calendarDays, currentMonth, slotsByWeekday, planFor, holidayByDate, meetingsByDate]
  );

  // Las 42 (o 35) casillas partidas en semanas de 7, cada una su propia fila
  // independiente: es más robusto que un único grid gigante con filas y
  // columnas calculadas a mano (que desalineaba los días respecto a las
  // cabeceras y no pintaba bien las barras).
  const weeks = useMemo(() => {
    const out: (typeof dayInfos)[] = [];
    for (let w = 0; w < weekCount; w++) out.push(dayInfos.slice(w * 7, w * 7 + 7));
    return out;
  }, [dayInfos, weekCount]);

  // Agrupa, dentro de cada semana, las columnas consecutivas que comparten
  // el mismo festivo o la misma marca de día (mismo tipo + nota + color) en
  // una única barra que se extiende de principio a fin. El festivo tiene
  // prioridad visual sobre la marca de ausencia/salida si coinciden en el
  // mismo día (igual que antes). Devuelve un array por semana (índice =
  // índice de semana) para poder dibujar cada barra superpuesta justo sobre
  // su propia fila de casillas.
  const barsByWeek = useMemo(() => {
    const result: MonthBar[][] = weeks.map(() => []);
    weeks.forEach((week, w) => {
      let col = 0;
      while (col < 7) {
        const info = week[col];
        const holidaySig = info?.holiday ? `h:${info.holiday.label ?? ''}:${info.holiday.color ?? ''}` : null;
        const statusSig =
          !info?.holiday && info?.dayStatus
            ? `s:${info.dayStatus.type}:${info.dayStatus.note ?? ''}:${info.dayStatus.color ?? ''}`
            : null;
        const sig = holidaySig ?? statusSig;
        if (!sig) {
          col++;
          continue;
        }
        let endCol = col;
        while (endCol + 1 < 7) {
          const next = week[endCol + 1];
          const nextSig = next?.holiday
            ? `h:${next.holiday.label ?? ''}:${next.holiday.color ?? ''}`
            : next?.dayStatus
              ? `s:${next.dayStatus.type}:${next.dayStatus.note ?? ''}:${next.dayStatus.color ?? ''}`
              : null;
          if (nextSig !== sig) break;
          endCol++;
        }
        if (holidaySig) {
          const holiday = info.holiday!;
          const label = holiday.label || t('weekly.holidays.badge');
          const palette = holiday.color ? subjectColorClasses[holiday.color] : null;
          result[w].push({
            key: `h-${w}-${col}`,
            weekIndex: w,
            startCol: col,
            endCol,
            label,
            title: label,
            bg: palette?.bg ?? DAY_STATUS_BADGE_STYLES.holiday.bg,
            text: palette?.text ?? DAY_STATUS_BADGE_STYLES.holiday.text,
            onClick: onOpenHolidays,
          });
        } else {
          const ds = info.dayStatus!;
          const typeLabel = t(`weekly.dayStatus.${ds.type}`);
          // Antes se mostraba siempre la etiqueta genérica del tipo ("Salida
          // a…", el texto de la opción del formulario, no un nombre real de
          // evento). Con nota escrita, esa es la que de verdad identifica la
          // salida/ausencia — se prioriza sobre la etiqueta genérica.
          const label = ds.note?.trim() || typeLabel;
          const palette = ds.color ? subjectColorClasses[ds.color] : null;
          const defaults = DAY_STATUS_BADGE_STYLES[ds.type];
          result[w].push({
            key: `s-${w}-${col}`,
            weekIndex: w,
            startCol: col,
            endCol,
            label,
            title: ds.note ? `${typeLabel} — ${ds.note}` : typeLabel,
            bg: palette?.bg ?? defaults.bg,
            text: palette?.text ?? defaults.text,
            onClick: () => {
              if (info.weekday !== null) onSelectStatusDay(info.weekday, info.weekStartDate);
            },
          });
        }
        col = endCol + 1;
      }
    });
    return result;
  }, [weeks, t]);

  return (
    <div className="flex flex-col gap-1">
      {/* Cabecera de días de la semana: mismo grid-cols-7 + gap que cada fila
          de días, para que ambos queden siempre alineados en columna. */}
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((d) => (
          <div key={d.value} className="text-[10px] sm:text-xs font-semibold text-center pb-1" style={{ color: 'var(--accent)' }}>
            <span className="sm:hidden">{d.short}</span>
            <span className="hidden sm:inline">{t(d.key)}</span>
          </div>
        ))}
        <div className="text-[10px] sm:text-xs font-semibold text-center pb-1 opacity-40" style={{ color: 'var(--text-secondary)' }}>
          <span className="sm:hidden">S</span>
          <span className="hidden sm:inline">{t('timetable.saturday')}</span>
        </div>
        <div className="text-[10px] sm:text-xs font-semibold text-center pb-1 opacity-40" style={{ color: 'var(--text-secondary)' }}>
          <span className="sm:hidden">D</span>
          <span className="hidden sm:inline">{t('timetable.sunday')}</span>
        </div>
      </div>

      {/* Una fila (grid-cols-7) por semana, con posición relative para poder
          superponer encima las barras de festivo/ausencia/salida en un
          segundo grid idéntico (mismas columnas y mismo gap), que es lo que
          garantiza que cada barra quede exactamente sobre sus días. */}
      {weeks.map((week, w) => (
        <div key={w} className="relative">
          <div className="grid grid-cols-7 gap-1">
            {week.map((info) => (
              <div
                key={info.iso}
                className="relative rounded-lg px-1 pt-1 pb-3.5 min-h-[46px] sm:min-h-[92px] flex flex-col gap-0.5 overflow-hidden"
                style={{ background: 'var(--bg-input)', opacity: info.inMonth ? 1 : 0.35 }}
              >
                <span className="text-[9px] sm:text-[10px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  {info.date.getDate()}
                </span>
                {/* La vista mensual solo muestra eventos (reuniones), nunca
                    las asignaturas normales: para eso ya está la vista
                    semanal. La celda solo tiene altura mínima (no fija), así
                    que si hay varias reuniones el día simplemente crece. */}
                <div className="flex flex-col gap-0.5">
                  {info.meetings.map((mt) => (
                    <button
                      key={mt.id}
                      onClick={() => onSelectMeeting(mt)}
                      className="text-left rounded-md px-1 py-0.5 text-[7px] sm:text-[9px] leading-tight truncate transition hover:opacity-80 bg-sky-100 text-sky-600"
                      title={mt.time ? `${mt.time} · ${mt.title}` : mt.title}
                    >
                      {/* Solo el título: la hora ya se ve en la vista semanal,
                          y en una casilla tan estrecha "HH:MM · " se comía
                          casi todo el ancho, dejando el título truncado a
                          solo un par de letras (o nada visible). */}
                      <span className="font-semibold">{mt.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Barras de festivo/ausencia/salida/otros: grid superpuesto
              (mismas columnas/gap que el de arriba) para que el ancho de
              cada barra coincida exactamente con los días que abarca,
              incluyendo el caso de varios días consecutivos. */}
          {barsByWeek[w].length > 0 && (
            <div className="absolute inset-0 grid grid-cols-7 gap-1 pointer-events-none">
              {barsByWeek[w].map((bar) => (
                <button
                  key={bar.key}
                  type="button"
                  onClick={bar.onClick}
                  title={bar.title}
                  className={`pointer-events-auto self-end mb-0.5 flex items-center justify-center text-center rounded-full h-3.5 sm:h-4 px-1 text-[7px] sm:text-[9px] font-semibold truncate leading-none transition hover:opacity-80 cursor-pointer ${bar.bg} ${bar.text}`}
                  style={{ gridColumn: `${bar.startCol + 1} / ${bar.endCol + 2}` }}
                >
                  {bar.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Badge de estado ──────────────────────────────────────────────────
function StatusBadge({ status }: { status: WeeklyPlan['status'] }) {
  const { t } = useTranslation();
  const styles: Record<WeeklyPlan['status'], string> = {
    planned:   'bg-sky-100 text-sky-600',
    done:      'bg-butter-100 text-butter-600',
    evaluated: 'bg-mint-100 text-mint-600',
  };
  return (
    <span className={`inline-block text-[9px] font-semibold rounded-full px-1.5 py-0.5 mt-1 ${styles[status]}`}>
      {t(`weekly.status.${status}`)}
    </span>
  );
}

// ── Modal de solo lectura ────────────────────────────────────────────
function PlanViewModal({ slot, subject, plan, allRubrics, allSlots, allPlans, schoolYearEndDate, ownerId, schoolYearId, weekStart, onClose, onEdit }: {
  slot: SubjectSlot;
  subject?: Subject;
  plan?: WeeklyPlan;
  allRubrics: Rubric[];
  allSlots: TimetableSlot[];
  allPlans: WeeklyPlan[];
  schoolYearEndDate: string;
  ownerId: string;
  schoolYearId: string;
  weekStart: string;
  onClose: () => void;
  onEdit: () => void;
}) {
  const { t, i18n } = useTranslation();
  const rubric = plan?.rubricId ? allRubrics.find((r) => r.id === plan.rubricId) : undefined;
  const [deleting, setDeleting] = useState(false);
  const [showMoveDayModal, setShowMoveDayModal] = useState(false);
  const [showShiftChainModal, setShowShiftChainModal] = useState(false);
  const [situations, setSituations] = useState<LearningSituation[]>([]);

  useEffect(() => {
    return subscribeLearningSituations(ownerId, schoolYearId, slot.subjectId, setSituations);
  }, [ownerId, schoolYearId, slot.subjectId]);

  // Nombre de la SA a mostrar: preferimos el de la entidad real (situations,
  // vía saId); si la actividad es de antes de este cambio y todavía no se ha
  // migrado (saId ausente), caemos al texto libre legacy (saLabel).
  const saName = (plan?.saId && situations.find((s) => s.id === plan.saId)?.name) || plan?.saLabel;

  async function handleDelete() {
    if (!plan) return;
    if (!window.confirm(t('weekly.deleteConfirm'))) return;
    setDeleting(true);
    try {
      await deleteWeeklyPlan(plan.id);
      onClose();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={subject ? `${subjectDisplayName(subject)} · ${slot.startTime}` : t('weekly.addPlan')}
      widthClass="max-w-lg"
    >
      <div className="flex flex-col gap-4">
        {/* Info básica */}
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {dateForDayInWeek(weekStart, slot.day, i18n.language)} · {slot.startTime}–{slot.endTime}
          </span>
          {plan?.status && <StatusBadge status={plan.status} />}
        </div>

        {!plan?.title ? (
          <p className="text-sm text-ink-soft italic">{t('weekly.noPlanForSession')}</p>
        ) : (
          <>
            <div>
              {saName && (
                <span className="inline-block text-[10px] font-semibold rounded-full px-2 py-0.5 mb-1.5 bg-accent-light text-accent">
                  {saName}
                </span>
              )}
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                {t('weekly.activityTitle')}
              </p>
              <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                {plan.title}
              </p>
            </div>

            {plan.description && (
              <div>
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                  {t('weekly.description')}
                </p>
                <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--text-primary)' }}>
                  {plan.description}
                </p>
              </div>
            )}

            {plan.driveAttachments?.length > 0 && (
              <div>
                <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  {t('weekly.attachments')}
                </p>
                <div className="flex flex-col gap-1">
                  {plan.driveAttachments.map((a) => (
                    <a key={a.id} href={a.url} target="_blank" rel="noreferrer"
                      className="text-sm text-accent hover:underline flex items-center gap-1.5">
                      <IconLink size={13} className="shrink-0" />
                      {a.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {rubric && (
              <div>
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                  {t('weekly.rubric')}
                </p>
                <div className="rounded-xl px-3 py-2" style={{ background: 'var(--accent-light)' }}>
                  <p className="text-sm font-medium text-accent">{rubric.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    {t('weekly.criteriaCount', { count: rubric.criteria.length })} · {rubric.community ?? t('weekly.ownRubric')}
                  </p>
                </div>
              </div>
            )}

            {plan.postClassEvaluation && (
              <div>
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                  {t('weekly.postEvaluation')}
                </p>
                <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--text-primary)' }}>
                  {plan.postClassEvaluation}
                </p>
              </div>
            )}

            {plan.aiSuggestions && (
              <div className="rounded-xl p-3" style={{ background: 'var(--accent-light)' }}>
                <p className="text-xs font-semibold text-accent mb-1 flex items-center gap-1">
                  <IconSparkles size={12} />
                  {t('weekly.aiSuggestions')}
                </p>
                <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--text-primary)' }}>
                  {plan.aiSuggestions}
                </p>
              </div>
            )}
          </>
        )}

        <div className="flex gap-2 pt-2 flex-wrap">
          <Button onClick={onEdit} icon={<IconEdit size={16} />}>
            {plan?.title ? t('common.edit') : t('weekly.planSession')}
          </Button>
          <Button variant="secondary" onClick={() => setShowMoveDayModal(true)} icon={<IconChevronRight size={16} />}>
            {t('weekly.moveDay.button')}
          </Button>
          {plan?.title && (
            <Button variant="secondary" onClick={() => setShowShiftChainModal(true)} icon={<IconChevronRight size={16} />}>
              {t('weekly.shiftChain.button')}
            </Button>
          )}
          <Button variant="ghost" onClick={onClose}>{t('common.close')}</Button>
          {plan?.title && (
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={deleting}
              icon={<IconTrash size={16} />}
              className="ml-auto"
            >
              {deleting ? t('common.loading') : t('weekly.deleteActivity')}
            </Button>
          )}
        </div>
      </div>

      {showMoveDayModal && (
        <MoveDayModal
          slot={slot}
          allSlots={allSlots}
          onClose={() => setShowMoveDayModal(false)}
          onMoved={onClose}
        />
      )}

      {showShiftChainModal && (
        <ShiftChainModal
          slot={slot}
          weekStart={weekStart}
          allSlots={allSlots}
          allPlans={allPlans}
          schoolYearEndDate={schoolYearEndDate}
          ownerId={ownerId}
          schoolYearId={schoolYearId}
          language={i18n.language}
          onClose={() => setShowShiftChainModal(false)}
          onMoved={onClose}
        />
      )}
    </Modal>
  );
}

// ── Modal para cambiar el día de una clase del horario ──────────────
// Cambia el día de la franja del horario base (TimetableSlot), no solo de
// esta semana: como updateTimetableSlot conserva el id del documento, toda
// la programación semanal/anual ya escrita para esa franja se mueve junto
// con ella (se ve reflejado tanto en la vista semanal como en la mensual,
// que leen de los mismos datos). Si el día destino ya tiene otra clase a la
// misma hora, se intercambian las dos franjas (cada una conserva su propio
// id y su programación). Mismo criterio que el "mover/intercambiar franja"
// ya disponible en Horario, pero accesible directamente desde aquí.
function MoveDayModal({ slot, allSlots, onClose, onMoved }: {
  slot: SubjectSlot;
  allSlots: TimetableSlot[];
  onClose: () => void;
  onMoved: () => void;
}) {
  const { t } = useTranslation();
  const [targetDay, setTargetDay] = useState<WeekDay>(slot.day);
  const [moving, setMoving] = useState(false);
  const [error, setError] = useState('');

  const targetSlot = allSlots.find((s) => s.day === targetDay && s.startTime === slot.startTime && s.id !== slot.id);

  async function handleMove() {
    if (targetDay === slot.day) { onClose(); return; }
    setMoving(true);
    setError('');
    try {
      await updateTimetableSlot(slot.id, {
        day: targetDay,
        startTime: slot.startTime,
        endTime: slot.endTime,
        room: slot.room,
        subjectId: slot.subjectId,
        specialType: slot.specialType,
        specialLabel: slot.specialLabel,
        color: slot.color,
      });
      if (targetSlot) {
        await updateTimetableSlot(targetSlot.id, {
          day: slot.day,
          startTime: targetSlot.startTime,
          endTime: targetSlot.endTime,
          room: targetSlot.room,
          subjectId: targetSlot.subjectId,
          specialType: targetSlot.specialType,
          specialLabel: targetSlot.specialLabel,
          color: targetSlot.color,
        });
      }
      onMoved();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setMoving(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={t('weekly.moveDay.title')} widthClass="max-w-sm">
      <div className="flex flex-col gap-4">
        <p className="text-xs text-ink-soft">{t('weekly.moveDay.help')}</p>
        <Select label={t('weekly.moveDay.newDay')} value={String(targetDay)} onChange={(e) => setTargetDay(Number(e.target.value) as WeekDay)}>
          {DAYS.map((d) => (
            <option key={d.value} value={d.value}>{t(d.key)}</option>
          ))}
        </Select>
        {targetSlot && targetDay !== slot.day && (
          <p className="text-xs rounded-lg px-2.5 py-2 bg-accent-light text-accent">
            {t('weekly.moveDay.willSwap')}
          </p>
        )}
        {error && <p className="text-xs text-rose-600">{error}</p>}
        <div className="flex gap-2">
          <Button onClick={handleMove} disabled={moving || targetDay === slot.day}>
            {moving ? t('common.loading') : t('common.save')}
          </Button>
          <Button variant="ghost" onClick={onClose}>{t('common.cancel')}</Button>
        </div>
      </div>
    </Modal>
  );
}

// ── "Mover y desplazar siguientes" ────────────────────────────────────
// A diferencia de MoveDayModal (que cambia el horario base para todas las
// semanas), esto no toca el horario: mueve el CONTENIDO de esta sesión a la
// siguiente ocurrencia de la misma asignatura, y desplaza en cadena el
// contenido de las sesiones ya planificadas que le siguen, una posición cada
// una, hasta la primera sesión sin planificar (que absorbe el último
// contenido desplazado y ahí se detiene). Las sesiones marcadas como
// ausencia/salida/festivo se saltan (no reciben ni ceden contenido).
type SubjectOccurrence = { timetableSlotId: string; weekStartDate: string; day: WeekDay; startTime: string };

function buildSubjectOccurrences(
  subjectId: string,
  allSlots: TimetableSlot[],
  fromWeekStart: string,
  schoolYearEndDate: string
): SubjectOccurrence[] {
  const subjectSlots = allSlots
    .filter((s) => s.subjectId === subjectId)
    .sort((a, b) => a.day - b.day || a.startTime.localeCompare(b.startTime));
  if (subjectSlots.length === 0) return [];
  const occurrences: SubjectOccurrence[] = [];
  let week = fromWeekStart;
  let guard = 0;
  while (week <= schoolYearEndDate && guard < 200) {
    subjectSlots.forEach((s) => {
      occurrences.push({ timetableSlotId: s.id, weekStartDate: week, day: s.day, startTime: s.startTime });
    });
    week = shiftWeek(week, 1);
    guard++;
  }
  return occurrences;
}

function ShiftChainModal({ slot, weekStart, allSlots, allPlans, schoolYearEndDate, ownerId, schoolYearId, language, onClose, onMoved }: {
  slot: SubjectSlot;
  weekStart: string;
  allSlots: TimetableSlot[];
  allPlans: WeeklyPlan[];
  schoolYearEndDate: string;
  ownerId: string;
  schoolYearId: string;
  language: string;
  onClose: () => void;
  onMoved: () => void;
}) {
  const { t } = useTranslation();
  const [moving, setMoving] = useState(false);
  const [error, setError] = useState('');

  const planByKey = useMemo(() => {
    const m = new Map<string, WeeklyPlan>();
    allPlans.forEach((p) => m.set(p.id, p));
    return m;
  }, [allPlans]);

  function planAt(occ: SubjectOccurrence): WeeklyPlan | undefined {
    return planByKey.get(weeklyPlanId(occ.timetableSlotId, occ.weekStartDate));
  }

  // Cadena: [origen, ...sesiones con contenido a desplazar, hueco final].
  // Se filtran las ocurrencias marcadas como ausencia/salida/festivo: no son
  // un destino válido ni interrumpen la cadena, simplemente no cuentan.
  const chain = useMemo(() => {
    const occurrences = buildSubjectOccurrences(slot.subjectId, allSlots, weekStart, schoolYearEndDate)
      .filter((occ) => !planAt(occ)?.dayStatus);
    const sourceIndex = occurrences.findIndex((o) => o.timetableSlotId === slot.id && o.weekStartDate === weekStart);
    if (sourceIndex === -1) return null;
    const result: SubjectOccurrence[] = [occurrences[sourceIndex]];
    for (let i = sourceIndex + 1; i < occurrences.length; i++) {
      const occ = occurrences[i];
      result.push(occ);
      if (!planAt(occ)?.title?.trim()) break; // hueco: aquí se detiene la cadena
      if (result.length > 60) break; // salvaguarda ante datos inesperados
    }
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slot.id, slot.subjectId, allSlots, weekStart, schoolYearEndDate, planByKey]);

  const canShift = !!chain && chain.length >= 2;

  async function handleShift() {
    if (!chain || chain.length < 2) return;
    setMoving(true);
    setError('');
    try {
      // Contenido actual de cada eslabón, capturado antes de escribir nada.
      const contents = chain.map((occ) => weeklyPlanContentFrom(planAt(occ)));
      const writes: { timetableSlotId: string; subjectId: string; weekStartDate: string; content: typeof contents[number] }[] = [];
      for (let i = 1; i < chain.length; i++) {
        const destSlot = allSlots.find((s) => s.id === chain[i].timetableSlotId);
        if (!destSlot?.subjectId) continue;
        writes.push({
          timetableSlotId: chain[i].timetableSlotId,
          subjectId: destSlot.subjectId,
          weekStartDate: chain[i].weekStartDate,
          content: contents[i - 1],
        });
      }
      writes.push({
        timetableSlotId: chain[0].timetableSlotId,
        subjectId: slot.subjectId,
        weekStartDate: chain[0].weekStartDate,
        content: EMPTY_WEEKLY_PLAN_CONTENT,
      });
      await shiftWeeklyPlanChain(ownerId, schoolYearId, writes);
      onMoved();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setMoving(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={t('weekly.shiftChain.title')} widthClass="max-w-sm">
      <div className="flex flex-col gap-4">
        <p className="text-xs text-ink-soft">{t('weekly.shiftChain.help')}</p>
        {!chain || chain.length < 2 ? (
          <p className="text-xs rounded-lg px-2.5 py-2 bg-accent-light text-accent">
            {t('weekly.shiftChain.noNext')}
          </p>
        ) : (
          <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto">
            {chain.slice(1).map((occ, idx) => {
              const dayDef = DAYS.find((d) => d.value === occ.day);
              const incomingTitle = planAt(chain[idx])?.title?.trim() || '';
              return (
                <div key={`${occ.timetableSlotId}_${occ.weekStartDate}`} className="text-xs rounded-lg px-2.5 py-2" style={{ background: 'var(--bg-input)' }}>
                  <span className="font-semibold">
                    {dayDef ? t(dayDef.key) : ''} {dateForDayInWeek(occ.weekStartDate, occ.day, language)}
                  </span>
                  {': '}
                  <span style={{ color: 'var(--text-secondary)' }}>{incomingTitle}</span>
                </div>
              );
            })}
          </div>
        )}
        {error && <p className="text-xs text-rose-600">{error}</p>}
        <div className="flex gap-2">
          <Button onClick={handleShift} disabled={!canShift || moving}>
            {moving ? t('common.loading') : t('weekly.shiftChain.confirm')}
          </Button>
          <Button variant="ghost" onClick={onClose}>{t('common.cancel')}</Button>
        </div>
      </div>
    </Modal>
  );
}

// ── Modal de edición ─────────────────────────────────────────────────
function PlanEditorModal({ slot, subject, plan, allRubrics, allSubjects, allSlots, ownerId, schoolYearId, weekStart, language, onClose }: {
  slot: SubjectSlot;
  subject?: Subject;
  plan?: WeeklyPlan;
  allRubrics: Rubric[];
  allSubjects: Subject[];
  allSlots: TimetableSlot[];
  ownerId: string;
  schoolYearId: string;
  weekStart: string;
  language: string;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const profile = useAuthStore((s) => s.profile);
  const [title, setTitle] = useState(plan?.title ?? '');
  const [saId, setSaId] = useState(plan?.saId ?? '');
  const [situations, setSituations] = useState<LearningSituation[]>([]);
  const [creatingSa, setCreatingSa] = useState(false);
  const [newSaName, setNewSaName] = useState('');
  const [savingNewSa, setSavingNewSa] = useState(false);
  const [description, setDescription] = useState(plan?.description ?? '');
  const [attachments, setAttachments] = useState(plan?.driveAttachments ?? []);
  const [selectedRubricId, setSelectedRubricId] = useState(plan?.rubricId ?? '');
  const [evaluate, setEvaluate] = useState(plan?.evaluate ?? true);
  const [postEval, setPostEval] = useState(plan?.postClassEvaluation ?? '');
  const [aiSuggestions, setAiSuggestions] = useState(plan?.aiSuggestions ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatingRubric, setGeneratingRubric] = useState(false);
  const [rubricGenError, setRubricGenError] = useState('');
  const [rubricGenerated, setRubricGenerated] = useState(false);
  const [rubricPanelOpen, setRubricPanelOpen] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);

  useEffect(() => {
    return subscribeLearningSituations(ownerId, schoolYearId, slot.subjectId, setSituations);
  }, [ownerId, schoolYearId, slot.subjectId]);

  async function handleCreateSa() {
    if (!newSaName.trim()) return;
    setSavingNewSa(true);
    try {
      const id = await createLearningSituation(ownerId, schoolYearId, slot.subjectId, newSaName);
      setSaId(id);
      setNewSaName('');
      setCreatingSa(false);
    } finally {
      setSavingNewSa(false);
    }
  }

  // Grupos paralelos/homólogos a los que se puede copiar la actividad. Se
  // consideran paralelas las asignaturas que cumplan CUALQUIERA de estos dos
  // criterios (no hace falta que se cumplan los dos):
  //  1) Comparten al menos una àrea de currículum con la asignatura de origen
  //     (p.ej. "Castellano" y "Lengua Castellana" mapeadas a la misma àrea).
  //  2) Se llaman igual (ignorando mayúsculas/espacios) y comparten al menos
  //     un curso, aunque cambie el grupo (p.ej. "Matemàtiques 1rA" /
  //     "Matemàtiques 1rB", o si el curso está guardado como lista separada
  //     por comas y solo coincide parcialmente).
  const parallelSubjects = useMemo(() => {
    if (!subject) return [];
    const name = subject.name.trim().toLowerCase();
    const courseTokens = new Set(
      (subject.courseLevel ?? '').split(',').map((c) => c.trim().toLowerCase()).filter(Boolean)
    );
    const areas = new Set(subject.curriculumAreas ?? []);
    return allSubjects.filter((s) => {
      if (s.id === subject.id) return false;
      const sTokens = (s.courseLevel ?? '').split(',').map((c) => c.trim().toLowerCase()).filter(Boolean);
      const sameName = s.name.trim().toLowerCase() === name;
      const shareCourse =
        (courseTokens.size === 0 && sTokens.length === 0) || sTokens.some((c) => courseTokens.has(c));
      const sharesArea = areas.size > 0 && (s.curriculumAreas ?? []).some((a) => areas.has(a));
      return (sameName && shareCourse) || sharesArea;
    });
  }, [subject, allSubjects]);

  const etapas: Etapa[] = getEffectiveEtapas(profile);
  const comunitat: Comunitat = profile?.comunitat ?? 'catalunya';
  // Currículum de la etapa real de ESTA asignatura (según su curso), no uno
  // combinado de todas las etapas del docente: evita mezclar CE de otra
  // etapa cuando un àrea se llama igual en las dos (p.ej. "Matemàtiques" en
  // ESO y Batxillerat).
  const curriculum = getCurriculumForSubject(comunitat, subject?.courseLevel, etapas);
  const ceAreaNames = useMemo(() => Object.keys(curriculum?.competencies ?? {}), [curriculum]);
  const [selectedCeAreas, setSelectedCeAreas] = useState<Set<string>>(() => {
    const guess = subject ? guessAreaName(subject.name, ceAreaNames) : '';
    return guess ? new Set([guess]) : new Set();
  });

  const selectedRubricLabel = selectedRubricId
    ? allRubrics.find((r) => r.id === selectedRubricId)?.name
    : undefined;

  // Pool de CE de todas las àrees marcadas (permite combinar, p.ex. para
  // asignaturas tipo "ambientes" que no corresponden a una única àrea oficial).
  const pooledCompetencies = useMemo(() => {
    const list: { area: string; id: string; ceId: string; title: string; description: string; criteris: string[] }[] = [];
    for (const area of selectedCeAreas) {
      const areaData = curriculum?.competencies?.[area];
      if (!areaData) continue;
      for (const ce of areaData.competencies) {
        list.push({
          area,
          id: selectedCeAreas.size > 1 ? `${ce.id} (${area})` : ce.id,
          ceId: ce.id,
          title: ce.title,
          description: ce.description,
          criteris: allCriteris(ce),
        });
      }
    }
    return list;
  }, [selectedCeAreas, curriculum]);
  const hasCe = pooledCompetencies.length > 0;

  async function handleGenerateRubricAI() {
    if (!subject || !hasCe) return;
    setGeneratingRubric(true);
    setRubricGenError('');
    try {
      const result = await generateRubricFromCurriculum({
        subjectName: subject.name,
        courseLevel: subject.courseLevel,
        activityDescription: [title, description].filter(Boolean).join(' — '),
        competencies: pooledCompetencies.map((ce) => ({
          id: ce.id,
          title: ce.title,
          description: ce.description,
          criteris: ce.criteris,
        })),
        language,
      });
      // Emparejar cada criterio devuelto por la IA con su CE de origen. Preferimos
      // "ref" (número de posición [REF n] que le dimos, 1-based) porque es un
      // lookup directo y sin ambigüedad; "ceId" (texto libre tipo "CE3") queda
      // como respaldo por si la IA no rellena ref, y si tampoco hay ceId, como
      // último recurso emparejamos por posición cuando el número de criterios
      // coincide exactamente con el de CE marcadas.
      function findMatch(returnedRef: number | undefined, returnedCeId: string | undefined, index: number) {
        if (typeof returnedRef === 'number' && Number.isInteger(returnedRef)) {
          const byRef = pooledCompetencies[returnedRef - 1];
          if (byRef) return byRef;
        }
        if (returnedCeId) {
          const exact = pooledCompetencies.find((p) => p.id === returnedCeId);
          if (exact) return exact;
          const bare = returnedCeId.match(/CE\s*\d+/i)?.[0]?.replace(/\s+/g, '').toUpperCase();
          if (bare) {
            const byBare = pooledCompetencies.find((p) => p.ceId.toUpperCase() === bare);
            if (byBare) return byBare;
          }
        }
        return result.criteria.length === pooledCompetencies.length ? pooledCompetencies[index] : undefined;
      }
      const newId = await createRubric(ownerId, schoolYearId, {
        name: result.rubricName,
        subjectId: subject.id,
        criteria: result.criteria.map((c, i) => {
          const matched = findMatch(c.ref, c.ceId, i);
          const codes = matched ? extractCriteriCodes(matched.criteris) : '';
          const ceReference = matched
            ? `${matched.description}${matched.criteris.length ? `\n\nCriteris d'avaluació: ${matched.criteris.join(' · ')}` : ''}`
            : undefined;
          const ceLabel = matched ? `${matched.area} · ${matched.ceId}${codes ? ` · ${codes}` : ''}` : undefined;
          return {
            id: `gen-${Date.now()}-${i}`,
            name: c.name,
            description: c.description,
            weight: c.weight,
            indicators: c.indicators,
            ...(matched ? { ceId: matched.ceId } : c.ceId ? { ceId: c.ceId } : {}),
            ...(matched ? { ceName: matched.title } : {}),
            ...(ceReference ? { ceReference } : {}),
            ...(ceLabel ? { ceLabel } : {}),
          };
        }),
      });
      setSelectedRubricId(newId);
      setEvaluate(true);
      setRubricPanelOpen(false);
      await persistRubricId(newId);
      setRubricGenerated(true);
      setTimeout(() => setRubricGenerated(false), 3000);
    } catch (err) {
      setRubricGenError(
        err instanceof Error ? err.message : t('weekly.rubricGenError')
      );
    } finally {
      setGeneratingRubric(false);
    }
  }

  // Guarda inmediatamente la rúbrica elegida/generada (título y demás campos
  // tal como estén en ese momento), sin esperar a que el docente pulse el
  // botón "Guardar" general. Antes, si el docente generaba o elegía una
  // rúbrica y cerraba el modal sin pulsar Guardar, la actividad se quedaba
  // sin rubricId en Firestore y por tanto nunca aparecía como columna en
  // Notas, aunque en la pantalla pareciera que ya estaba todo listo.
  async function persistRubricId(rubricId: string) {
    await upsertWeeklyPlan(ownerId, schoolYearId, slot.id, slot.subjectId, weekStart, {
      title,
      description,
      driveAttachments: attachments,
      rubric: [],
      rubricId,
      evaluate: true,
      postClassEvaluation: postEval,
      aiSuggestions,
      status: plan?.status ?? 'planned',
    });
  }

  async function handleSave(status?: WeeklyPlan['status']) {
    setSaving(true);
    setSaveError('');
    try {
      await upsertWeeklyPlan(ownerId, schoolYearId, slot.id, slot.subjectId, weekStart, {
        title,
        saId: saId || undefined,
        description,
        driveAttachments: attachments,
        rubric: [],
        rubricId: selectedRubricId || undefined,
        evaluate,
        postClassEvaluation: postEval,
        aiSuggestions,
        status: status ?? plan?.status ?? 'planned',
      });
      setSaved(true);
      setTimeout(() => { setSaved(false); onClose(); }, 1500);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : t('common.error'));
    } finally {
      setSaving(false);
    }
  }

  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!plan) return;
    if (!window.confirm(t('weekly.deleteConfirm'))) return;
    setDeleting(true);
    try {
      await deleteWeeklyPlan(plan.id);
      onClose();
    } finally {
      setDeleting(false);
    }
  }

  async function handleGenerateSuggestions() {
    if (!subject) return;
    setGenerating(true);
    try {
      const suggestions = await generateWeeklySuggestions({
        subjectName: subject.name,
        courseLevel: subject.courseLevel,
        activityTitle: title,
        description,
        postClassEvaluation: postEval,
        language,
      });
      setAiSuggestions(suggestions);
      await updateWeeklyPlanField(weeklyPlanId(slot.id, weekStart), { aiSuggestions: suggestions, status: 'evaluated' });
    } finally {
      setGenerating(false);
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={subject ? `${subjectDisplayName(subject)} · ${slot.startTime}` : t('weekly.addPlan')}
      widthClass="max-w-2xl"
    >
      <div className="flex flex-col gap-4">
        <Input
          label={t('weekly.activityTitle')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          lang={language}
          spellCheck
          autoFocus
        />

        <div>
          <label className="text-sm font-medium text-ink block mb-1.5">{t('weekly.saLabel')}</label>
          {creatingSa ? (
            <div className="flex gap-2">
              <Input
                value={newSaName}
                onChange={(e) => setNewSaName(e.target.value)}
                placeholder={t('weekly.saLabelPlaceholder')}
                lang={language}
                spellCheck
                autoFocus
              />
              <Button size="sm" onClick={handleCreateSa} disabled={savingNewSa || !newSaName.trim()}>
                {savingNewSa ? t('common.loading') : t('common.add')}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => { setCreatingSa(false); setNewSaName(''); }}>
                {t('common.cancel')}
              </Button>
            </div>
          ) : (
            <Select
              value={saId}
              onChange={(e) => {
                if (e.target.value === '__new__') { setCreatingSa(true); return; }
                setSaId(e.target.value);
              }}
            >
              <option value="">{t('weekly.noSa')}</option>
              {situations.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
              <option value="__new__">{t('weekly.newSa')}</option>
            </Select>
          )}
          <p className="text-[11px] text-ink-soft mt-1">{t('weekly.saLabelHelp')}</p>
        </div>

        <Textarea
          label={t('weekly.description')}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          lang={language}
          spellCheck
        />

        <div>
          <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            {t('weekly.attachments')}
          </label>
          <DriveAttachmentPicker attachments={attachments} onChange={setAttachments} />
        </div>

        {/* Rúbrica — resumen compacto + panel colapsable para cambiarla */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              {t('weekly.rubric')}
            </label>
            <button
              type="button"
              onClick={() => setRubricPanelOpen((o) => !o)}
              className="text-xs font-medium text-accent hover:underline"
            >
              {rubricPanelOpen ? t('common.close') : selectedRubricId ? t('common.change') : t('common.add')}
            </button>
          </div>

          {selectedRubricLabel ? (
            <>
              <span className="inline-flex items-center gap-1.5 self-start text-xs font-medium rounded-full pl-2.5 pr-1.5 py-1 bg-accent-light text-accent">
                {selectedRubricLabel}
                <button type="button" onClick={() => setSelectedRubricId('')} className="hover:opacity-70 leading-none">×</button>
              </span>
              <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                <input type="checkbox" checked={evaluate} onChange={(e) => setEvaluate(e.target.checked)} />
                {t('weekly.evaluateInGradebook')}
              </label>
            </>
          ) : (
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t('weekly.noRubric')}</p>
          )}

          {rubricPanelOpen && (
            <div className="rounded-2xl p-3.5 flex flex-col gap-3" style={{ background: 'var(--accent-light)' }}>
              <Select
                label={t('weekly.chooseExistingRubric')}
                value={selectedRubricId}
                onChange={(e) => {
                  const id = e.target.value;
                  setSelectedRubricId(id);
                  setRubricPanelOpen(false);
                  if (id) {
                    setEvaluate(true);
                    persistRubricId(id);
                  }
                }}
              >
                <option value="">{t('weekly.noRubric')}</option>
                {allRubrics.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </Select>

              {ceAreaNames.length > 0 && (
                <>
                  <div style={{ borderTop: '1px solid var(--border)' }} />
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {t('weekly.generateRubricAiHelp')}
                  </p>
                  <TagMultiSelect
                    options={ceAreaNames.map((a) => ({ key: a, label: a }))}
                    selected={selectedCeAreas}
                    onChange={setSelectedCeAreas}
                    placeholder={t('weekly.selectAreasPlaceholder')}
                  />
                  {rubricGenError && (
                    <p className="text-xs rounded-xl px-3 py-2" style={{ background: 'rgba(248,113,113,0.1)', color: 'var(--danger-text)' }}>
                      {rubricGenError}
                    </p>
                  )}
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleGenerateRubricAI}
                    disabled={generatingRubric || !title.trim() || !hasCe}
                    icon={generatingRubric ? undefined : <IconSparkles size={14} />}
                    className="self-start"
                  >
                    {generatingRubric ? t('weekly.generatingRubricProfi') : t('weekly.generateRubricAi')}
                  </Button>
                </>
              )}
            </div>
          )}

          {rubricGenerated && (
            <div className="flex items-center gap-2 text-sm rounded-xl px-3 py-2" style={{ background: '#ECFDF5', color: '#059669' }}>
              <IconCheck size={16} /> {t('weekly.rubricGeneratedHelp')}
            </div>
          )}
        </div>

        <Textarea
          label={t('weekly.postEvaluation')}
          placeholder={t('weekly.postEvaluationPlaceholder')}
          value={postEval}
          onChange={(e) => setPostEval(e.target.value)}
          rows={3}
          lang={language}
          spellCheck
        />

        {aiSuggestions && (
          <div className="rounded-2xl p-3.5" style={{ background: 'var(--accent-light)' }}>
            <span className="text-xs font-semibold text-accent flex items-center gap-1.5 mb-1">
              <IconSparkles size={14} /> {t('weekly.aiSuggestions')}
            </span>
            <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--text-primary)' }}>
              {aiSuggestions}
            </p>
          </div>
        )}

        {saveError && (
          <p className="text-sm text-rose-600 bg-rose-50 rounded-xl px-3 py-2">{saveError}</p>
        )}

        <div className="flex flex-wrap gap-2 pt-1">
          <Button onClick={() => handleSave()} disabled={saving}
            icon={saved ? <IconCheck size={16} /> : undefined}>
            {saved ? t('settings.geminiKeySaved') : t('weekly.save')}
          </Button>
          <Button variant="secondary" onClick={() => handleSave('done')} disabled={saving}>
            {t('weekly.status.done')}
          </Button>
          <Button variant="secondary" onClick={handleGenerateSuggestions}
            disabled={generating || !postEval.trim()} icon={<IconSparkles size={16} />}>
            {generating ? t('common.loading') : t('weekly.generateSuggestions')}
          </Button>
          {parallelSubjects.length > 0 && (
            <Button
              variant="secondary"
              onClick={() => setShowCopyModal(true)}
              disabled={!title.trim()}
            >
              {t('weekly.copyToGroup')}
            </Button>
          )}
          {plan?.title && (
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={deleting}
              icon={<IconTrash size={16} />}
              className="ml-auto"
            >
              {deleting ? t('common.loading') : t('weekly.deleteActivity')}
            </Button>
          )}
        </div>
      </div>

      {showCopyModal && subject && (
        <CopyToGroupModal
          parallelSubjects={parallelSubjects}
          allSlots={allSlots}
          activity={{
            title,
            description,
            driveAttachments: attachments,
            rubricId: selectedRubricId || undefined,
            evaluate,
            postClassEvaluation: postEval,
            aiSuggestions,
          }}
          ownerId={ownerId}
          schoolYearId={schoolYearId}
          weekStart={weekStart}
          onClose={() => setShowCopyModal(false)}
        />
      )}
    </Modal>
  );
}

// ── Modal para copiar la actividad a grupos paralelos ────────────────
function CopyToGroupModal({ parallelSubjects, allSlots, activity, ownerId, schoolYearId, weekStart, onClose }: {
  parallelSubjects: Subject[];
  allSlots: TimetableSlot[];
  activity: {
    title: string;
    description: string;
    driveAttachments: WeeklyPlan['driveAttachments'];
    rubricId: string | undefined;
    evaluate: boolean;
    postClassEvaluation: string;
    aiSuggestions: string;
  };
  ownerId: string;
  schoolYearId: string;
  weekStart: string;
  onClose: () => void;
}) {
  const { t, i18n } = useTranslation();
  const dayLabel = (d: WeekDay) => t(DAYS.find((x) => x.value === d)?.key ?? '');

  const slotsBySubject = useMemo(() => {
    const m = new Map<string, TimetableSlot[]>();
    for (const subject of parallelSubjects) {
      const subjectSlots = allSlots
        .filter((s) => s.subjectId === subject.id)
        .sort((a, b) => (a.day - b.day) || a.startTime.localeCompare(b.startTime));
      m.set(subject.id, subjectSlots);
    }
    return m;
  }, [parallelSubjects, allSlots]);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [targetSlotBySubject, setTargetSlotBySubject] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const subject of parallelSubjects) {
      const first = slotsBySubject.get(subject.id)?.[0];
      if (first) initial[subject.id] = first.id;
    }
    return initial;
  });
  // Semana destino: por defecto la misma que se está viendo, pero se puede
  // elegir cualquier otra semana del año (pasada o futura) antes de escoger
  // el día y la hora, para poder copiar la actividad a otra semana distinta.
  const [targetWeek, setTargetWeek] = useState(weekStart);
  const [copying, setCopying] = useState(false);
  const [copyError, setCopyError] = useState('');
  const [copied, setCopied] = useState(false);

  function toggleSubject(subjectId: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(subjectId)) next.delete(subjectId);
      else next.add(subjectId);
      return next;
    });
  }

  async function handleConfirm() {
    setCopying(true);
    setCopyError('');
    try {
      const targets = [...selected]
        .map((subjectId) => {
          const slotId = targetSlotBySubject[subjectId];
          const slot = slotsBySubject.get(subjectId)?.find((s) => s.id === slotId);
          return slot ? { subjectId, slot } : null;
        })
        .filter((entry): entry is { subjectId: string; slot: TimetableSlot } => entry !== null);

      await Promise.all(
        targets.map(({ subjectId, slot }) =>
          upsertWeeklyPlan(ownerId, schoolYearId, slot.id, subjectId, targetWeek, {
            title: activity.title,
            description: activity.description,
            driveAttachments: activity.driveAttachments,
            rubric: [],
            rubricId: activity.rubricId,
            evaluate: activity.evaluate,
            postClassEvaluation: activity.postClassEvaluation,
            aiSuggestions: activity.aiSuggestions,
            status: 'planned',
          })
        )
      );
      setCopied(true);
      setTimeout(() => { setCopied(false); onClose(); }, 1200);
    } catch (err) {
      setCopyError(err instanceof Error ? err.message : t('common.error'));
    } finally {
      setCopying(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={t('weekly.copyToGroup')} widthClass="max-w-md">
      <div className="flex flex-col gap-4">
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {t('weekly.copyToGroupHelp')}
        </p>

        <div>
          <Input
            type="date"
            label={t('weekly.copyToGroupWeek')}
            value={targetWeek}
            onChange={(e) => {
              if (e.target.value) setTargetWeek(getWeekStart(parseISO(e.target.value)));
            }}
          />
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            {t('weekly.copyToGroupWeekLabel', { week: formatWeekLabel(targetWeek, i18n.language) })}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {parallelSubjects.map((subject) => {
            const subjectSlots = slotsBySubject.get(subject.id) ?? [];
            const isSelected = selected.has(subject.id);
            return (
              <div key={subject.id} className="rounded-xl p-3" style={{ background: 'var(--bg-input)' }}>
                <label className="flex items-center gap-2 text-sm font-medium cursor-pointer" style={{ color: 'var(--text-primary)' }}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    disabled={subjectSlots.length === 0}
                    onChange={() => toggleSubject(subject.id)}
                  />
                  {subjectDisplayName(subject)}
                </label>
                {subjectSlots.length === 0 ? (
                  <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                    {t('weekly.copyToGroupNoSlots')}
                  </p>
                ) : (
                  isSelected && (
                    <Select
                      className="mt-2"
                      value={targetSlotBySubject[subject.id] ?? ''}
                      onChange={(e) =>
                        setTargetSlotBySubject((prev) => ({ ...prev, [subject.id]: e.target.value }))
                      }
                    >
                      {subjectSlots.map((s) => (
                        <option key={s.id} value={s.id}>
                          {dayLabel(s.day)} · {s.startTime}–{s.endTime}
                        </option>
                      ))}
                    </Select>
                  )
                )}
              </div>
            );
          })}
        </div>

        {copyError && (
          <p className="text-sm text-rose-600 bg-rose-50 rounded-xl px-3 py-2">{copyError}</p>
        )}

        <div className="flex gap-2">
          <Button
            onClick={handleConfirm}
            disabled={copying || selected.size === 0}
            icon={copied ? <IconCheck size={16} /> : undefined}
          >
            {copied ? t('weekly.copyToGroupSuccess') : t('weekly.copyToGroupConfirm')}
          </Button>
          <Button variant="ghost" onClick={onClose}>{t('common.cancel')}</Button>
        </div>
      </div>
    </Modal>
  );
}
