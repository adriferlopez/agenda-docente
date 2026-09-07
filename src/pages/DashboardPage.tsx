import { useEffect, useMemo, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { Link } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useAuthStore } from '@/store/authStore';
import { useSchoolYears } from '@/hooks/useSchoolYears';
import { subscribeSubjects } from '@/firebase/subjects';
import { subscribeTimetable } from '@/firebase/timetable';
import { subscribeWeeklyPlans, subscribeOutingWeeklyPlans } from '@/firebase/weeklyPlans';
import { subscribeMeetings } from '@/firebase/meetings';
import { subscribeTasks, setTaskDone } from '@/firebase/tasks';
import { subscribeFavoriteMuralItems, updateMuralFavoritesOrder } from '@/firebase/murals';
import { subscribeMuralFolders } from '@/firebase/muralFolders';
import { getWeekStart, formatWeekLabel, isoDateForDayInWeek } from '@/utils/dates';
import Card from '@/components/ui/Card';
import FitText from '@/components/ui/FitText';
import { subjectColorClasses, styledSubjectCell } from '@/components/ui/subjectColors';
import TagMultiSelect, { type TagOption } from '@/components/ui/TagMultiSelect';
import { specialTypeLabel, subjectDisplayName } from '@/utils/timetableDisplay';
import { IconCalendar, IconSettings } from '@/components/ui/icons';
import { IconUsers, IconChecklist, IconMapPin, IconStar, IconMove } from '@/components/ui/icons-extra';
import type { Subject, TimetableSlot, WeeklyPlan, WeekDay, Meeting, TeacherTask, MuralItem, MuralFolder, WeeklyCalendarStyle, SubjectColor } from '@/types';

const DEFAULT_SPECIAL_COLOR: SubjectColor = 'butter';

// ─── Tipos de widgets ────────────────────────────────────────────────
export type WidgetId = 'today' | 'meetings' | 'tasks' | 'outings' | 'mural';

interface WidgetConfig {
  id: WidgetId;
  active: boolean;
  order: number;
}

const WIDGET_DEFAULTS: WidgetConfig[] = [
  { id: 'today',    active: true, order: 0 },
  { id: 'meetings', active: true, order: 1 },
  { id: 'tasks',    active: true, order: 2 },
  { id: 'outings',  active: true, order: 3 },
  { id: 'mural',    active: true, order: 4 },
];

// Elimina entradas duplicadas por id, quedándose con la primera aparición.
// Necesario porque perfiles guardados antes de esta corrección pueden tener
// el mismo widget repetido en `dashboardWidgets` (p.ej. "Reuniones" x2).
function dedupeWidgets(list: WidgetConfig[]): WidgetConfig[] {
  const seen = new Set<string>();
  return list.filter((w) => {
    if (seen.has(w.id)) return false;
    seen.add(w.id);
    return true;
  });
}

function widgetLabel(t: TFunction, id: WidgetId): string {
  if (id === 'today') return t('dashboard.widgetToday');
  if (id === 'meetings') return t('dashboard.widgetMeetings');
  if (id === 'outings') return t('dashboard.widgetOutings');
  if (id === 'mural') return t('dashboard.widgetMural');
  return t('dashboard.widgetTasks');
}

const OWN_TASKS_KEY = '__own__';

function sortByDueDate(a: TeacherTask, b: TeacherTask): number {
  if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate);
  if (a.dueDate) return -1;
  if (b.dueDate) return 1;
  return a.createdAt - b.createdAt;
}

const DAY_KEYS = [
  'timetable.monday','timetable.tuesday','timetable.wednesday',
  'timetable.thursday','timetable.friday','timetable.saturday','timetable.sunday',
];

// ─── Página principal ─────────────────────────────────────────────────
export default function DashboardPage() {
  const { t, i18n } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const { activeYear, loading } = useSchoolYears();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [slots, setSlots] = useState<TimetableSlot[]>([]);
  const [plans, setPlans] = useState<WeeklyPlan[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [tasks, setTasks] = useState<TeacherTask[]>([]);
  const [outingPlans, setOutingPlans] = useState<WeeklyPlan[]>([]);
  const [muralFavorites, setMuralFavorites] = useState<MuralItem[]>([]);
  const [muralFolders, setMuralFolders] = useState<MuralFolder[]>([]);
  const [widgets, setWidgets] = useState<WidgetConfig[]>(() => {
    const raw = profile?.dashboardWidgets;
    // dedupeWidgets: perfiles guardados antes de esta corrección pueden
    // tener el mismo widget repetido (p.ej. "Reuniones" x2) en el array
    // persistido; se sanea siempre al cargar, no solo al guardar.
    const base = dedupeWidgets(
      Array.isArray(raw) && raw.length > 0 ? (raw as WidgetConfig[]) : WIDGET_DEFAULTS
    );
    // Añade automáticamente widgets nuevos (p.ej. añadidos en una
    // actualización posterior) que un perfil ya guardado todavía no conozca.
    const missing = WIDGET_DEFAULTS.filter((d) => !base.some((w) => w.id === d.id));
    return missing.length > 0
      ? [...base, ...missing.map((d, i) => ({ ...d, order: base.length + i }))]
      : base;
  });
  const [configuring, setConfiguring] = useState(false);

  const weekStart = useMemo(() => getWeekStart(new Date()), []);
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  useEffect(() => {
    if (!user || !activeYear) return;
    const u1 = subscribeSubjects(user.uid, activeYear.id, setSubjects);
    const u2 = subscribeTimetable(user.uid, activeYear.id, setSlots);
    const u3 = subscribeWeeklyPlans(user.uid, activeYear.id, weekStart, setPlans);
    const u4 = subscribeMeetings(user.uid, activeYear.id, setMeetings);
    const u5 = subscribeTasks(user.uid, activeYear.id, setTasks);
    const u6 = subscribeOutingWeeklyPlans(user.uid, activeYear.id, setOutingPlans);
    const u7 = subscribeFavoriteMuralItems(user.uid, activeYear.id, setMuralFavorites);
    const u8 = subscribeMuralFolders(user.uid, activeYear.id, setMuralFolders);
    return () => { u1(); u2(); u3(); u4(); u5(); u6(); u7(); u8(); };
  }, [user, activeYear, weekStart]);

  const muralFolderById = useMemo(() => {
    const m = new Map<string, MuralFolder>();
    muralFolders.forEach((f) => m.set(f.id, f));
    return m;
  }, [muralFolders]);

  const subjectById = useMemo(() => {
    const m = new Map<string, Subject>();
    subjects.forEach((s) => m.set(s.id, s));
    return m;
  }, [subjects]);

  const planBySlot = useMemo(() => {
    const m = new Map<string, WeeklyPlan>();
    plans.forEach((p) => m.set(p.timetableSlotId, p));
    return m;
  }, [plans]);

  // Se excluyen las franjas "huérfanas": las que apuntan a un subjectId que
  // ya no existe (asignatura eliminada antes de que se limpiaran también
  // sus franjas del horario). Antes se colaban en el widget como una
  // casilla rota, sin el color de ningún tema. deleteSubject ya limpia esto
  // de raíz para las asignaturas que se borren de ahora en adelante, pero
  // esto además cubre cualquier resto que hubiera quedado de antes.
  const todaySlots = useMemo(
    () =>
      slots
        .filter((s) => s.day === (todayIndex as WeekDay) && (!s.subjectId || subjectById.has(s.subjectId)))
        .sort((a, b) => a.startTime.localeCompare(b.startTime)),
    [slots, todayIndex, subjectById]
  );

  const upcomingMeetings = useMemo(() => {

    return meetings
      .filter((m) => m.date >= new Date().toISOString().slice(0, 10))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 5);
  }, [meetings]);

  // Las programaciones semanales no guardan una fecha absoluta: solo
  // weekStartDate (lunes de esa semana) + la franja (timetableSlotId), cuyo
  // día de la semana está en `slots`. Se cruza aquí para calcular la fecha
  // real de cada salida marcada y quedarse con las que aún no han pasado.
  const slotById = useMemo(() => {
    const m = new Map<string, TimetableSlot>();
    slots.forEach((s) => m.set(s.id, s));
    return m;
  }, [slots]);

  // Cada "salida" marcada guarda un documento WeeklyPlan por franja/asignatura
  // (setWeeklyPlanDayStatus recorre todas las franjas de ese día), así que
  // una excursión de todo el día generaba una entrada repetida por cada
  // asignatura. Aquí se agrupan por fecha + tipo + nota (misma salida) en
  // una única entrada, y a partir del rango horario de las franjas cubiertas
  // se deduce si fue todo el día, solo la mañana (8-13h) o solo la tarde
  // (13-18h).
  const upcomingOutings = useMemo(() => {
    const todayIso = new Date().toISOString().slice(0, 10);
    const groups = new Map<string, { plan: WeeklyPlan; date: string; minStart: string; maxEnd: string }>();
    outingPlans.forEach((plan) => {
      const slot = slotById.get(plan.timetableSlotId);
      if (!slot) return;
      const date = isoDateForDayInWeek(plan.weekStartDate, slot.day);
      if (date < todayIso) return;
      const key = `${date}|${plan.dayStatus?.type ?? ''}|${plan.dayStatus?.note ?? ''}`;
      const existing = groups.get(key);
      if (existing) {
        if (slot.startTime < existing.minStart) existing.minStart = slot.startTime;
        if (slot.endTime > existing.maxEnd) existing.maxEnd = slot.endTime;
      } else {
        groups.set(key, { plan, date, minStart: slot.startTime, maxEnd: slot.endTime });
      }
    });
    return Array.from(groups.values())
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 5)
      .map(({ plan, date, minStart, maxEnd }) => {
        const timeOfDay: 'morning' | 'afternoon' | 'allDay' =
          minStart >= '08:00' && maxEnd <= '13:00'
            ? 'morning'
            : minStart >= '13:00' && maxEnd <= '18:00'
              ? 'afternoon'
              : 'allDay';
        return { plan, date, timeOfDay };
      });
  }, [outingPlans, slotById]);

  async function saveWidgets(newWidgets: WidgetConfig[]) {
    const deduped = dedupeWidgets(newWidgets);
    setWidgets(deduped);
    if (user) {
      await updateDoc(doc(db, 'users', user.uid), { dashboardWidgets: deduped }).catch(() => null);
    }
  }

  function toggleWidget(id: WidgetId) {
    const updated = widgets.map((w) => w.id === id ? { ...w, active: !w.active } : w);
    saveWidgets(updated);
  }

  function moveWidget(id: WidgetId, dir: -1 | 1) {
    const sorted = [...widgets].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((w) => w.id === id);
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= sorted.length) return;
    // Swap orders
    const temp = sorted[idx].order;
    sorted[idx] = { ...sorted[idx], order: sorted[newIdx].order };
    sorted[newIdx] = { ...sorted[newIdx], order: temp };
    saveWidgets(sorted);
  }

  const activeWidgets = [...widgets]
    .filter((w) => w.active)
    .sort((a, b) => a.order - b.order);

  if (loading) return <p className="text-sm text-ink-soft">{t('common.loading')}</p>;

  if (!activeYear) {
    return (
      <Card className="max-w-md">
        <p className="text-sm text-ink-soft mb-3">{t('schoolYear.noYears')}</p>
        <Link to="/curso" className="text-accent font-semibold text-sm hover:underline">
          {t('schoolYear.createFirst')}
        </Link>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Cabecera */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {/* ⚠️ font-size fijado inline: la regla global "h1, h2, .font-display"
              en index.css impone font-size: 1.2em (sin capa, gana siempre a
              las utilidades text-* de Tailwind), así que las clases text-*
              no tenían ningún efecto real aquí. Con inline style (máxima
              especificidad) el tamaño sí se aplica de verdad. */}
          <h1 className="font-display text-accent mb-1" style={{ lineHeight: 1.15 }}>
            {/* min-w-0 en el contenedor de arriba es imprescindible: sin él,
                un flex item con texto "white-space: nowrap" dentro nunca se
                encoge por debajo de su ancho natural (min-width:auto por
                defecto en flexbox), así que FitText mediría siempre el ancho
                "deseado" del texto en vez del espacio real disponible y el
                botón de la derecha se saldría de la pantalla. */}
            <FitText maxFontSize={34} minScale={0.6} className="font-display" style={{ color: 'inherit' }}>
              {profile?.displayName ? t('dashboard.greeting', { name: profile.displayName.split(' ')[0] }) : t('app.name')}
            </FitText>
          </h1>
          <p className="text-sm text-ink-soft">
            {activeYear.name} · {formatWeekLabel(weekStart, i18n.language)}
          </p>
        </div>
        <button
          onClick={() => setConfiguring((c) => !c)}
          className="btn-base btn-pill text-xs px-3 py-1.5 mt-1 inline-flex items-center gap-1.5 shrink-0"
          style={{
            background: configuring ? 'var(--accent)' : 'var(--accent-light)',
            color: configuring ? 'white' : 'var(--accent-text)',
          }}
        >
          {configuring ? t('dashboard.ready') : (
            <>
              <IconSettings size={13} />
              {t('dashboard.customize')}
            </>
          )}
        </button>
      </div>

      {/* Panel de configuración */}
      {configuring && (
        <div className="card-pastel p-4 flex flex-col gap-3">
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            {t('dashboard.widgetsHelp')}
          </p>
          <div className="flex flex-col gap-2">
            {[...widgets].sort((a, b) => a.order - b.order).map((w) => (
              <div key={w.id} className="flex items-center gap-3 rounded-xl px-3 py-2"
                style={{ background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
                {/* Toggle */}
                <button
                  onClick={() => toggleWidget(w.id)}
                  style={{
                    width: '36px', height: '20px', borderRadius: '999px', border: 'none',
                    cursor: 'pointer', flexShrink: 0, position: 'relative',
                    background: w.active ? 'var(--accent)' : 'var(--border)',
                    transition: 'background 0.2s',
                  }}
                >
                  <span style={{
                    position: 'absolute', top: '2px', left: '2px',
                    width: '16px', height: '16px', background: 'white',
                    borderRadius: '999px', display: 'block',
                    transform: w.active ? 'translateX(16px)' : 'translateX(0)',
                    transition: 'transform 0.2s',
                  }} />
                </button>
                <span className="flex-1 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {widgetLabel(t, w.id)}
                </span>
                {/* Flechas (también en desktop para claridad) */}
                <div className="flex gap-1">
                  <button onClick={() => moveWidget(w.id, -1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                    style={{ background: 'var(--border)', color: 'var(--text-secondary)' }}>
                    ↑
                  </button>
                  <button onClick={() => moveWidget(w.id, 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                    style={{ background: 'var(--border)', color: 'var(--text-secondary)' }}>
                    ↓
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Widgets activos — drag & drop en desktop */}
      <WidgetContainer
        widgets={activeWidgets}
        onReorder={saveWidgets}
        renderWidget={(id) => {
          if (id === 'today') return (
            <TodayWidget
              todayIndex={todayIndex}
              todaySlots={todaySlots}
              subjectById={subjectById}
              planBySlot={planBySlot}
              weeklyCalendarStyle={profile?.weeklyCalendarStyle ?? 'colorBg'}
              t={t}
            />
          );
          if (id === 'meetings') return (
            <MeetingsWidget meetings={upcomingMeetings} t={t} />
          );
          if (id === 'tasks') return (
            <TasksWidget tasks={tasks} subjects={subjects} t={t} />
          );
          if (id === 'outings') return (
            <OutingsWidget outings={upcomingOutings} subjectById={subjectById} t={t} />
          );
          if (id === 'mural') return (
            <MuralWidget items={muralFavorites} folderById={muralFolderById} configuring={configuring} t={t} />
          );
          return null;
        }}
      />
    </div>
  );
}

// ─── Contenedor con drag & drop ───────────────────────────────────────
function WidgetContainer({
  widgets, onReorder, renderWidget,
}: {
  widgets: WidgetConfig[];
  onReorder: (w: WidgetConfig[]) => void;
  renderWidget: (id: WidgetId) => React.ReactNode;
}) {
  const dragIdx = useRef<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);

  function handleDragStart(idx: number) { dragIdx.current = idx; }
  function handleDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    setDragOver(idx);
  }
  function handleDrop(idx: number) {
    if (dragIdx.current === null || dragIdx.current === idx) { setDragOver(null); return; }
    const reordered = [...widgets];
    const [moved] = reordered.splice(dragIdx.current, 1);
    reordered.splice(idx, 0, moved);
    // Reasignar orders
    const updated = reordered.map((w, i) => ({ ...w, order: i }));
    onReorder(updated);
    dragIdx.current = null;
    setDragOver(null);
  }

  return (
    <div className="flex flex-col gap-4">
      {widgets.map((w, idx) => (
        <div
          key={w.id}
          draggable
          onDragStart={() => handleDragStart(idx)}
          onDragOver={(e) => handleDragOver(e, idx)}
          onDrop={() => handleDrop(idx)}
          onDragEnd={() => setDragOver(null)}
          style={{
            opacity: dragOver === idx ? 0.6 : 1,
            cursor: 'grab',
            transition: 'opacity 0.15s',
          }}
        >
          {renderWidget(w.id)}
        </div>
      ))}
    </div>
  );
}

// ─── Widget: Horario de hoy ───────────────────────────────────────────
function TodayWidget({ todayIndex, todaySlots, subjectById, planBySlot, weeklyCalendarStyle, t }: {
  todayIndex: number;
  todaySlots: TimetableSlot[];
  subjectById: Map<string, Subject>;
  planBySlot: Map<string, WeeklyPlan>;
  weeklyCalendarStyle: WeeklyCalendarStyle;
  t: TFunction;
}) {
  return (
    <Card>
      <h2 className="font-display text-lg mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <IconCalendar size={18} className="text-accent" />
        {t(DAY_KEYS[todayIndex] ?? 'timetable.monday')}
      </h2>
      {todaySlots.length === 0 ? (
        <p className="text-sm text-ink-soft">{t('timetable.noSlot')}</p>
      ) : (
        <div className="flex flex-col gap-2">
          {todaySlots.map((slot) => {
            const subject = slot.subjectId ? subjectById.get(slot.subjectId) : undefined;
            const plan = planBySlot.get(slot.id);
            const colors = subject ? subjectColorClasses[subject.color] : null;
            const isSpecial = !slot.subjectId;
            // Los especiales (patio, guardia...) también tienen su propio
            // color (slot.color) igual que en Horario — antes solo se
            // aplicaba el estilo elegido a las asignaturas y los especiales
            // se quedaban siempre con el mismo aspecto fijo.
            const specialColors = isSpecial ? subjectColorClasses[slot.color ?? DEFAULT_SPECIAL_COLOR] : null;
            const activeColors = colors ?? specialColors;
            const cell = activeColors ? styledSubjectCell(weeklyCalendarStyle, activeColors) : null;
            return (
              <div
                key={slot.id}
                style={cell?.style}
                className={`rounded-2xl overflow-hidden flex items-stretch border ${
                  cell ? `${cell.bg} ${cell.border}` : 'border-transparent bg-accent-light'
                }`}
              >
                {cell?.stripe && activeColors && <span className={`w-1.5 shrink-0 ${activeColors.dot}`} />}
                <div className="flex items-center gap-3 px-3 py-2 flex-1 min-w-0">
                  <span className={`text-xs font-semibold w-12 shrink-0 ${activeColors?.text ?? 'text-accent'}`}>
                    {slot.startTime}
                  </span>
                  <div className={activeColors?.text ?? 'text-ink'}>
                    {subject ? (
                      <p className="text-sm font-semibold">
                        {subjectDisplayName(subject)}
                        {slot.room ? ` · ${slot.room}` : ''}
                      </p>
                    ) : (
                      <p className="text-sm font-semibold">
                        {specialTypeLabel(t, slot)}
                        {slot.room ? ` · ${slot.room}` : ''}
                      </p>
                    )}
                    {plan?.title && <p className="text-xs opacity-80">{plan.title}</p>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

// ─── Widget: Programación semanal ────────────────────────────────────
// ─── Widget: Reuniones próximas ──────────────────────────────────────
function MeetingsWidget({ meetings, t }: { meetings: Meeting[]; t: TFunction }) {
  const monthsShort = t('common.monthsShort', { returnObjects: true }) as string[];
  return (
    <Card>
      <h2 className="font-display text-lg mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <IconUsers size={18} className="text-accent" />
        {t('dashboard.upcomingMeetings')}
      </h2>
      {meetings.length === 0 ? (
        <p className="text-sm text-ink-soft">{t('dashboard.noUpcomingMeetings')}</p>
      ) : (
        <div className="flex flex-col gap-2">
          {meetings.map((m) => (
            <Link key={m.id} to="/reuniones"
              className="flex items-center gap-3 rounded-2xl px-3 py-2 hover:opacity-80 transition"
              style={{ background: 'var(--accent-light)' }}>
              <div className="flex flex-col items-center shrink-0 w-10">
                <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>
                  {m.date.slice(8, 10)}
                </span>
                <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                  {monthsShort[parseInt(m.date.slice(5, 7)) - 1]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                  {m.title}
                </p>
                {m.time && <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{m.time}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </Card>
  );
}

// ─── Widget: Tareas pendientes ─────────────────────────────────────────
function TasksWidget({ tasks, subjects, t }: { tasks: TeacherTask[]; subjects: Subject[]; t: TFunction }) {
  const [filter, setFilter] = useState<Set<string>>(new Set());

  const filterOptions: TagOption[] = useMemo(() => [
    { key: OWN_TASKS_KEY, label: t('tasks.ownTasks') },
    ...subjects.map((s) => ({ key: s.id, label: subjectDisplayName(s) })),
  ], [subjects, t]);

  const pending = useMemo(() => {
    const base = tasks.filter((tk) => !tk.done);
    const filteredList = filter.size === 0
      ? base
      : base.filter((tk) => filter.has(tk.subjectId ?? OWN_TASKS_KEY));
    return [...filteredList].sort(sortByDueDate);
  }, [tasks, filter]);

  const todayIso = new Date().toISOString().slice(0, 10);

  return (
    <Card>
      <h2 className="font-display text-lg mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <IconChecklist size={18} className="text-accent" />
        {t('dashboard.widgetTasks')}
      </h2>
      <TagMultiSelect
        options={filterOptions}
        selected={filter}
        onChange={setFilter}
        placeholder={t('tasks.filterBySubject')}
      />
      {pending.length === 0 ? (
        <p className="text-sm text-ink-soft mt-3">{t('tasks.noPending')}</p>
      ) : (
        <div className="flex flex-col gap-2 mt-3">
          {pending.slice(0, 8).map((task) => {
            const subject = task.subjectId ? subjects.find((s) => s.id === task.subjectId) : undefined;
            const overdue = task.dueDate ? task.dueDate < todayIso : false;
            return (
              <div key={task.id} className="flex items-center gap-3 rounded-xl px-3 py-2" style={{ background: 'var(--bg-input)' }}>
                <button
                  onClick={() => setTaskDone(task.id, true)}
                  aria-label={t('tasks.markDone')}
                  className="w-4.5 h-4.5 rounded border-2 shrink-0"
                  style={{ borderColor: 'var(--accent)', background: 'transparent' }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{task.title}</p>
                  <p className="text-xs" style={{ color: overdue ? 'var(--danger-text)' : 'var(--text-secondary)' }}>
                    {subject ? subjectDisplayName(subject) : t('tasks.ownTasks')}
                    {task.dueDate ? ` · ${task.dueDate}` : ''}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Link to="/tareas" className="text-xs font-semibold mt-3 inline-block hover:underline" style={{ color: 'var(--accent)' }}>
        {t('dashboard.seeAllTasks')}
      </Link>
    </Card>
  );
}

// ─── Widget: Próximas salidas ──────────────────────────────────────────
function OutingsWidget({ outings, subjectById, t }: {
  outings: { plan: WeeklyPlan; date: string; timeOfDay: 'morning' | 'afternoon' | 'allDay' }[];
  subjectById: Map<string, Subject>;
  t: TFunction;
}) {
  const monthsShort = t('common.monthsShort', { returnObjects: true }) as string[];
  return (
    <Card>
      <h2 className="font-display text-lg mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <IconMapPin size={18} className="text-accent" />
        {t('dashboard.widgetOutings')}
      </h2>
      {outings.length === 0 ? (
        <p className="text-sm text-ink-soft">{t('dashboard.noUpcomingOutings')}</p>
      ) : (
        <div className="flex flex-col gap-2">
          {outings.map(({ plan, date, timeOfDay }) => {
            const subject = subjectById.get(plan.subjectId);
            // El fondo (var(--accent-light)) es un pastel claro fijo, igual
            // en claro y oscuro; var(--text-primary)/--text-secondary son
            // adaptativos y en modo oscuro son casi blancos, ilegibles sobre
            // ese fondo claro. Usamos en su lugar var(--accent) (pensado
            // para ir sobre accent-light) y un gris fijo para el secundario.
            return (
              <Link key={plan.id} to="/semanal"
                className="flex items-center gap-3 rounded-2xl px-3 py-2 hover:opacity-80 transition"
                style={{ background: 'var(--accent-light)' }}>
                <div className="flex flex-col items-center shrink-0 w-10">
                  <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>
                    {date.slice(8, 10)}
                  </span>
                  <span className="text-[10px]" style={{ color: '#57606f' }}>
                    {monthsShort[parseInt(date.slice(5, 7)) - 1]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: 'var(--accent)' }}>
                    {plan.dayStatus?.note || (subject ? subjectDisplayName(subject) : t('dashboard.widgetOutings'))}
                  </p>
                  <p className="text-xs truncate" style={{ color: '#57606f' }}>
                    {t(`dashboard.outing${timeOfDay === 'morning' ? 'Morning' : timeOfDay === 'afternoon' ? 'Afternoon' : 'AllDay'}`)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </Card>
  );
}

// ─── Widget: Mural (favoritos) ─────────────────────────────────────────
// El reordenado solo se puede tocar en modo "Personalizar" (mismo toggle
// que el resto del panel de widgets), para que en el uso normal del día a
// día no aparezcan flechas ni se pueda arrastrar por error al tocar una
// nota. Dentro de ese modo: en móvil se usan flechas minimalistas (el
// arrastre nativo HTML5 no funciona bien con dedos); en escritorio, en
// cambio, se oculta las flechas y se activa el arrastre mediante un botón
// "Mover" explícito arriba del widget, así un simple clic para abrir un
// enlace no se confunde nunca con iniciar un drag.
function MuralWidget({ items, folderById, configuring, t }: {
  items: MuralItem[];
  folderById: Map<string, MuralFolder>;
  configuring: boolean;
  t: TFunction;
}) {
  const dragIdx = useRef<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [desktopDragMode, setDesktopDragMode] = useState(false);

  useEffect(() => {
    if (!configuring) setDesktopDragMode(false);
  }, [configuring]);

  const dragEnabled = configuring && desktopDragMode;

  function handleDragStart(idx: number) { dragIdx.current = idx; }
  function handleDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    setDragOver(idx);
  }
  function handleDrop(idx: number) {
    if (dragIdx.current === null || dragIdx.current === idx) { setDragOver(null); return; }
    const reordered = [...items];
    const [moved] = reordered.splice(dragIdx.current, 1);
    reordered.splice(idx, 0, moved);
    void updateMuralFavoritesOrder(reordered.map((i) => i.id));
    dragIdx.current = null;
    setDragOver(null);
  }

  function move(idx: number, dir: -1 | 1) {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= items.length) return;
    const reordered = [...items];
    const [moved] = reordered.splice(idx, 1);
    reordered.splice(newIdx, 0, moved);
    void updateMuralFavoritesOrder(reordered.map((i) => i.id));
  }

  function handleClick(item: MuralItem) {
    if (item.linkUrl) {
      window.open(item.linkUrl, '_blank', 'noopener,noreferrer');
    }
  }

  return (
    <Card>
      <div className="flex items-center justify-between gap-2 mb-3">
        <h2 className="font-display text-lg flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <IconStar size={18} className="text-accent" fill="currentColor" />
          {t('dashboard.widgetMural')}
        </h2>
        {configuring && items.length > 1 && (
          <button
            onClick={() => setDesktopDragMode((d) => !d)}
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-2.5 py-1 shrink-0"
            style={{
              background: desktopDragMode ? 'var(--accent)' : 'var(--accent-light)',
              color: desktopDragMode ? 'white' : 'var(--accent-text)',
            }}
          >
            <IconMove size={12} />
            {t('dashboard.moveItems')}
          </button>
        )}
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-ink-soft">{t('dashboard.noMuralFavorites')}</p>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item, idx) => {
            const folder = item.folderId ? folderById.get(item.folderId) : undefined;
            // La "figura" (la píldora redondeada que envuelve cada favorito) se
            // tiñe del color pastel de su carpeta, para identificar de un
            // vistazo de dónde viene; el texto siempre se queda en el color
            // normal de la interfaz, solo cambia el fondo que lo rodea.
            const rowBgClass = folder ? subjectColorClasses[folder.color].bg : '';
            return (
              <div
                key={item.id}
                draggable={dragEnabled}
                onDragStart={() => dragEnabled && handleDragStart(idx)}
                onDragOver={(e) => dragEnabled && handleDragOver(e, idx)}
                onDrop={() => dragEnabled && handleDrop(idx)}
                onDragEnd={() => setDragOver(null)}
                className={`flex items-center gap-2 rounded-2xl px-3 py-2 ${rowBgClass}`}
                style={{
                  background: rowBgClass ? undefined : 'var(--accent-light)',
                  opacity: dragOver === idx ? 0.6 : 1,
                  cursor: dragEnabled ? 'grab' : 'default',
                  transition: 'opacity 0.15s',
                }}
              >
                <button
                  onClick={() => handleClick(item)}
                  className={`flex-1 min-w-0 text-left ${item.linkUrl ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                    {item.title || t('mural.untitled')}
                  </p>
                  {item.note && (
                    <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>{item.note}</p>
                  )}
                </button>
                {configuring && (
                  <div className="md:hidden flex flex-col gap-0.5 shrink-0">
                    <button
                      onClick={() => move(idx, -1)}
                      aria-label={t('dashboard.moveUp')}
                      className="w-5 h-4 rounded flex items-center justify-center text-[10px]"
                      style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)' }}
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => move(idx, 1)}
                      aria-label={t('dashboard.moveDown')}
                      className="w-5 h-4 rounded flex items-center justify-center text-[10px]"
                      style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)' }}
                    >
                      ↓
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <Link to="/mural" className="text-xs font-semibold mt-3 inline-block hover:underline" style={{ color: 'var(--accent)' }}>
        {t('dashboard.seeMural')}
      </Link>
    </Card>
  );
}
