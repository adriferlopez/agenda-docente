import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
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
  deleteTimeSlotDef,
} from '@/firebase/timetable';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { subjectColorClasses, styledSubjectCell } from '@/components/ui/subjectColors';
import Modal from '@/components/ui/Modal';
import HourSlotManagerModal from '@/components/timetable/HourSlotManagerModal';
import { IconPlus, IconTrash, IconSettings, IconUpload } from '@/components/ui/icons';
import { IconMove, IconPalette } from '@/components/ui/icons-extra';
import { specialTypeLabel, subjectDisplayName } from '@/utils/timetableDisplay';
import TimetableImportModal from '@/components/timetable/TimetableImportModal';
import type { Subject, TimetableSlot, TimeSlotDef, WeekDay, SpecialSlotType, SubjectColor, WeeklyCalendarStyle } from '@/types';
import { SPECIAL_SLOT_TYPES, SUBJECT_COLORS, WEEKLY_CALENDAR_STYLES } from '@/types';

const DEFAULT_SPECIAL_COLOR: SubjectColor = 'butter';

const DAYS: { value: WeekDay; key: string }[] = [
  { value: 0, key: 'timetable.monday' },
  { value: 1, key: 'timetable.tuesday' },
  { value: 2, key: 'timetable.wednesday' },
  { value: 3, key: 'timetable.thursday' },
  { value: 4, key: 'timetable.friday' },
];

// Altura mínima (px) que debe tener la franja más corta de toda la semana,
// para que siempre quepan sin solaparse al menos la hora y el nombre de la
// asignatura. Antes la altura de cada fila era fija (76px) sin importar
// cuántas franjas cortas hubiera en ese hueco en otros días, así que si un
// día tenía 2-3 franjas de 30-45 min donde otro día tenía una única franja
// larga, esas franjas cortas se aplastaban hasta solaparse visualmente.
const MIN_CELL_PX = 48;
// Ritmo "normal" de píxeles por minuto cuando no hace falta comprimir nada
// (mantiene una altura similar a la de antes para horarios sin franjas
// especialmente cortas).
const BASE_PX_PER_MIN = 0.9;
// Dos límites de franjas de días distintos que caigan a menos de esta
// diferencia (en minutos) se dibujan como una sola línea de referencia en el
// eje de horas — solo para fundir pequeños desajustes (p.ej. 11:28 vs
// 11:30), nunca para fundir franjas realmente distintas.
const BOUNDARY_TOLERANCE_MIN = 8;

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map((n) => parseInt(n, 10) || 0);
  return h * 60 + m;
}

function minutesToTime(min: number): string {
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

interface TimeScale {
  minStart: number;
  pxPerMin: number;
  // Instantes (en minutos) donde dibujar una línea horizontal + etiqueta de
  // hora en el eje izquierdo — el límite de inicio o fin de alguna franja de
  // algún día, sin fundir franjas realmente distintas entre sí.
  boundaries: number[];
}

/** Construye la escala de tiempo→píxeles de toda la semana a partir de TODAS
 * las franjas de TODOS los días (y sus posibles horas de fin personalizadas
 * en `slots`), de modo que cada franja ocupe una altura proporcional a su
 * duración real — con un ritmo de píxeles por minuto lo bastante alto para
 * que la franja más corta de toda la semana siga siendo legible. */
function buildTimeScale(hourDefs: TimeSlotDef[], slots: TimetableSlot[]): TimeScale {
  const points = new Set<number>();
  let minStart = Infinity;
  let minDuration = Infinity;

  for (const d of hourDefs) {
    const start = toMinutes(d.startTime);
    const matchingSlot = slots.find((s) => s.day === d.day && s.startTime === d.startTime);
    const end = toMinutes(matchingSlot?.endTime || d.endTime);
    if (end <= start) continue;
    points.add(start);
    points.add(end);
    minStart = Math.min(minStart, start);
    minDuration = Math.min(minDuration, end - start);
  }

  if (!isFinite(minStart) || points.size === 0) {
    return { minStart: 0, pxPerMin: BASE_PX_PER_MIN, boundaries: [] };
  }

  // Ritmo necesario para que la franja más corta llegue a MIN_CELL_PX,
  // nunca por debajo del ritmo normal (para no estirar de más un horario
  // sin franjas cortas). Un suelo de 15 min evita que un dato mal
  // introducido (p.ej. 1 minuto) dispare la escala de forma absurda.
  const neededPxPerMin = MIN_CELL_PX / Math.max(15, minDuration);
  const pxPerMin = Math.max(BASE_PX_PER_MIN, neededPxPerMin);

  const sorted = Array.from(points).sort((a, b) => a - b);
  const boundaries: number[] = [];
  for (const p of sorted) {
    if (boundaries.length === 0 || p - boundaries[boundaries.length - 1] >= BOUNDARY_TOLERANCE_MIN) {
      boundaries.push(p);
    }
  }

  return { minStart, pxPerMin, boundaries };
}

function minutesToPx(scale: TimeScale, min: number): number {
  return (min - scale.minStart) * scale.pxPerMin;
}

export default function TimetablePage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const { activeYear } = useSchoolYears();
  const weeklyCalendarStyle: WeeklyCalendarStyle = profile?.weeklyCalendarStyle ?? 'colorBg';

  async function handleChangeCalendarStyle(next: WeeklyCalendarStyle) {
    if (profile) setProfile({ ...profile, weeklyCalendarStyle: next });
    if (user) await updateDoc(doc(db, 'users', user.uid), { weeklyCalendarStyle: next }).catch(() => null);
  }

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [slots, setSlots] = useState<TimetableSlot[]>([]);
  const [hourDefs, setHourDefs] = useState<TimeSlotDef[]>([]);
  const [editing, setEditing] = useState<{ day: WeekDay; hourDef: TimeSlotDef; slot?: TimetableSlot } | null>(null);
  const [configuringDay, setConfiguringDay] = useState<WeekDay | null>(null);
  const [creatingDefaults, setCreatingDefaults] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showStyleMenu, setShowStyleMenu] = useState(false);

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

  // Escala de tiempo→píxeles compartida por todos los días de la vista de
  // escritorio: cada franja ocupa una altura proporcional a su duración
  // real, con un mínimo garantizado para que las franjas cortas no se
  // aplasten cuando otro día tiene una franja larga en ese mismo hueco.
  const timeScale = useMemo(() => buildTimeScale(hourDefs, slots), [hourDefs, slots]);
  const totalHeight = timeScale.boundaries.length > 0
    ? minutesToPx(timeScale, timeScale.boundaries[timeScale.boundaries.length - 1])
    : 0;
  // Segmentos del eje de horas (uno por cada hueco entre dos límites
  // consecutivos), con la altura real de ese hueco para que la línea y la
  // hora de inicio queden a la altura correcta.
  const axisSegments = useMemo(() => {
    const b = timeScale.boundaries;
    const segs: { top: number; height: number; label: string }[] = [];
    for (let i = 0; i < b.length - 1; i++) {
      segs.push({
        top: minutesToPx(timeScale, b[i]),
        height: minutesToPx(timeScale, b[i + 1]) - minutesToPx(timeScale, b[i]),
        label: minutesToTime(b[i]),
      });
    }
    return segs;
  }, [timeScale]);

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
          <h1 className="font-display text-2xl text-accent mb-1">{t('timetable.title')}</h1>
          <p className="text-sm text-ink-soft">{t('timetable.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Selector de estilo de calendario: antes era una franja ancha de
              cabecera (etiqueta + desplegable grande) que ocupaba media
              fila. Se sustituye por un botón compacto con icono de paleta
              (sigue siendo identificable como "cambiar apariencia" sin
              texto) que abre un pequeño desplegable con las 4 opciones. */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowStyleMenu((v) => !v)}
              className="w-9 h-9 rounded-full flex items-center justify-center transition shrink-0"
              style={{
                background: showStyleMenu ? 'var(--accent-light)' : 'var(--bg-input)',
                color: showStyleMenu ? 'var(--accent)' : 'var(--text-secondary)',
                border: '1px solid var(--border)',
              }}
              aria-label={t('weekly.calendarStyle.label')}
              aria-expanded={showStyleMenu}
              title={t('weekly.calendarStyle.help')}
            >
              <IconPalette size={17} />
            </button>
            {/* Siempre montado (igual que el menú "todo el menú" de móvil),
                con clases condicionales en vez de montarse/desmontarse: así
                se puede animar tanto la entrada como la salida (deslizado +
                encogido hacia el botón), no solo la entrada. */}
            <button
              type="button"
              className={`fixed inset-0 z-10 transition-opacity duration-200 ${
                showStyleMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
              style={{ background: 'transparent' }}
              aria-label={t('common.close')}
              tabIndex={showStyleMenu ? 0 : -1}
              onClick={() => setShowStyleMenu(false)}
            />
            {/* Anclado a la izquierda del botón (no a la derecha): el botón
                suele quedar cerca del borde izquierdo de la cabecera, así
                que anclar por la derecha hacía que el desplegable (210px) se
                saliera de la pantalla por la izquierda. Con left-0 se
                extiende hacia la derecha, donde siempre hay sitio. */}
            <div
              className={`absolute left-0 top-full mt-2 z-20 rounded-2xl p-1.5 flex flex-col gap-0.5 shadow-lg max-w-[calc(100vw-2rem)] origin-top-left transition-all duration-200 ease-out ${
                showStyleMenu ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
              }`}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', width: '210px' }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide px-2.5 pt-1 pb-1.5" style={{ color: 'var(--text-secondary)' }}>
                {t('weekly.calendarStyle.label')}
              </p>
              {WEEKLY_CALENDAR_STYLES.map((s) => (
                <button
                  key={s}
                  type="button"
                  tabIndex={showStyleMenu ? 0 : -1}
                  onClick={() => { handleChangeCalendarStyle(s); setShowStyleMenu(false); }}
                  className="text-left text-xs font-medium rounded-xl px-2.5 py-1.5 transition"
                  style={{
                    color: weeklyCalendarStyle === s ? 'var(--accent)' : 'var(--text-primary)',
                    background: weeklyCalendarStyle === s ? 'var(--accent-light)' : 'transparent',
                  }}
                >
                  {t(`weekly.calendarStyle.${s}`)}
                </button>
              ))}
            </div>
          </div>
          <Button
            variant="secondary"
            icon={<IconUpload size={16} />}
            onClick={() => setShowImport(true)}
          >
            Importar Word / Excel
          </Button>
        </div>
      </div>

      {subjects.length === 0 && (
        <Card className="text-sm text-ink-soft">
          {t('subjects.noSubjects')} —{' '}
          <a href="/asignaturas" className="text-accent font-semibold hover:underline">
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
          {/* Vista desktop: cada día es una columna independiente donde cada
              franja se dibuja proporcionalmente a su duración real (en vez de
              una tabla con una fila por cada hora de inicio distinta, que
              duplicaba/partía franjas cuando un día tenía horarios ligeramente
              distintos a los demás). */}
          <div className="hidden md:block overflow-x-auto">
            <div className="flex gap-2 min-w-[760px]">
              <div className="w-16 shrink-0">
                <div className="h-[38px]" />
                <div className="relative" style={{ height: totalHeight }}>
                  {axisSegments.map((seg, i) => (
                    <div
                      key={i}
                      className="absolute left-0 right-0 border-t border-theme text-[10px] text-ink-soft text-right pr-2 pt-0.5"
                      style={{ top: seg.top, height: seg.height }}
                    >
                      {seg.label}
                    </div>
                  ))}
                </div>
              </div>
              {DAYS.map((d) => {
                const dayDefs = hourDefs
                  .filter((h) => h.day === d.value)
                  .sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));
                return (
                  <div key={d.value} className="flex-1 min-w-[130px]">
                    <div className="h-[38px] flex items-center justify-center gap-1.5 text-sm font-semibold text-ink-soft">
                      {t(d.key)}
                      <button
                        onClick={() => setConfiguringDay(d.value)}
                        className="text-ink-soft hover:text-accent"
                        aria-label={t('timetable.configureHours')}
                      >
                        <IconSettings size={14} />
                      </button>
                    </div>
                    <div
                      className="relative rounded-2xl overflow-hidden border border-theme bg-theme-card"
                      style={{ height: totalHeight }}
                    >
                      {timeScale.boundaries.map((b) => (
                        <div
                          key={b}
                          className="absolute left-0 right-0 border-t border-theme"
                          style={{ top: minutesToPx(timeScale, b) }}
                        />
                      ))}
                      {dayDefs.length === 0 && (
                        <p className="absolute inset-0 flex items-center justify-center text-xs text-ink-soft px-2 text-center">
                          {t('timetable.noHourSlots')}
                        </p>
                      )}
                      {dayDefs.map((hourDef) => {
                        const slot = getSlot(d.value, hourDef.startTime);
                        const effectiveEnd = slot?.endTime || hourDef.endTime;
                        const top = minutesToPx(timeScale, toMinutes(hourDef.startTime));
                        const bottom = minutesToPx(timeScale, toMinutes(effectiveEnd));
                        const height = Math.max(MIN_CELL_PX, bottom - top);
                        const subject = slot?.subjectId ? subjectById.get(slot.subjectId) : undefined;
                        const colors = subject ? subjectColorClasses[subject.color] : null;
                        const isSpecial = slot && !slot.subjectId;
                        const specialColors = isSpecial
                          ? subjectColorClasses[slot.color ?? DEFAULT_SPECIAL_COLOR]
                          : null;
                        const activeColors = subject && colors ? colors : specialColors;
                        const cell = styledSubjectCell(weeklyCalendarStyle, activeColors);
                        const isEmpty = !(activeColors && cell);
                        return (
                          <button
                            key={hourDef.id}
                            onClick={() => setEditing({ day: d.value, hourDef, slot })}
                            style={{ position: 'absolute', top: top + 1, height: height - 2, left: 2, right: 2, ...(cell?.style ?? {}) }}
                            aria-label={isEmpty ? t('timetable.noSlot') : undefined}
                            className={`rounded-xl text-left overflow-hidden transition flex ${
                              isEmpty
                                ? // Franja sin clase asignada: sin rectángulo ni texto (el
                                  // docente ya ve el hueco por su posición en la línea de
                                  // tiempo); solo un tinte muy sutil al pasar el ratón para
                                  // que siga siendo descubrible que se puede pulsar aquí.
                                  'border border-transparent hover:border-dashed hover:border-theme hover:bg-accent-light/40'
                                : `border hover:shadow-sm hover:z-10 ${cell!.bg} ${cell!.border}`
                            }`}
                          >
                            {cell?.stripe && activeColors && (
                              <span className={`w-1 shrink-0 ${activeColors.dot}`} />
                            )}
                            {!isEmpty && (
                              <span className="flex-1 min-w-0 p-2">
                                <p className="text-[9px] opacity-60 leading-none mb-0.5">
                                  {hourDef.startTime}–{effectiveEnd}
                                </p>
                                {subject ? (
                                  <div className={colors!.text}>
                                    <p className="text-xs font-semibold leading-tight">{subjectDisplayName(subject)}</p>
                                    {slot?.room && (
                                      <p className="text-[10px] opacity-80 leading-tight">{slot.room}</p>
                                    )}
                                  </div>
                                ) : (
                                  <div className={specialColors!.text}>
                                    <p className="text-xs font-semibold leading-tight">{specialTypeLabel(t, slot!)}</p>
                                    {slot!.room && <p className="text-[10px] opacity-80">{slot!.room}</p>}
                                  </div>
                                )}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
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
                      className="text-ink-soft hover:text-accent"
                      aria-label={t('timetable.configureHours')}
                    >
                      <IconSettings size={16} />
                    </button>
                  </div>
                  {dayDefs.length === 0 && <p className="text-xs text-ink-soft">{t('timetable.noHourSlots')}</p>}
                  <div className="flex flex-col gap-2">
                    {dayDefs.map((hourDef) => {
                      const slot = getSlot(d.value, hourDef.startTime);
                      const effectiveEnd = slot?.endTime || hourDef.endTime;
                      const subject = slot?.subjectId ? subjectById.get(slot.subjectId) : undefined;
                      const colors = subject ? subjectColorClasses[subject.color] : null;
                      const isSpecial = slot && !slot.subjectId;
                      const specialColors = isSpecial
                        ? subjectColorClasses[slot.color ?? DEFAULT_SPECIAL_COLOR]
                        : null;
                      const activeColors = subject && colors ? colors : specialColors;
                      const cell = styledSubjectCell(weeklyCalendarStyle, activeColors);
                      const isEmpty = !(activeColors && cell);
                      if (isEmpty) {
                        // Sin clase asignada: sin rectángulo ni texto, solo un
                        // hueco pulsable del mismo alto para poder añadir una
                        // clase ahí, sin ensuciar la lista visualmente.
                        return (
                          <button
                            key={hourDef.id}
                            onClick={() => setEditing({ day: d.value, hourDef, slot })}
                            aria-label={t('timetable.noSlot')}
                            className="w-full rounded-2xl border border-transparent text-left overflow-hidden flex items-stretch min-h-[2.75rem] hover:border-dashed hover:border-theme hover:bg-accent-light/40 transition"
                          />
                        );
                      }
                      return (
                        <button
                          key={hourDef.id}
                          onClick={() => setEditing({ day: d.value, hourDef, slot })}
                          style={cell?.style}
                          className={`w-full rounded-2xl border text-left overflow-hidden flex items-stretch ${cell!.bg} ${cell!.border}`}
                        >
                          {cell?.stripe && activeColors && (
                            <span className={`w-1.5 shrink-0 ${activeColors.dot}`} />
                          )}
                          <span className="flex-1 min-w-0 flex items-center gap-3 p-3">
                            <span className="text-xs text-ink-soft w-14 shrink-0 leading-tight">
                              {hourDef.startTime}<br />
                              <span className="opacity-60">{effectiveEnd}</span>
                            </span>
                            {subject ? (
                              <div className={colors!.text}>
                                <p className="text-sm font-semibold">{subjectDisplayName(subject)}</p>
                              </div>
                            ) : (
                              <div className={specialColors!.text}>
                                <p className="text-sm font-semibold">{specialTypeLabel(t, slot!)}</p>
                              </div>
                            )}
                          </span>
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
          allSlots={slots}
          allHourDefs={hourDefs}
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

      {showImport && (
        <TimetableImportModal
          ownerId={user!.uid}
          schoolYearId={activeYear.id}
          language={profile?.language ?? 'es'}
          existingSubjects={subjects}
          existingSlots={slots}
          existingDefs={hourDefs}
          onClose={() => setShowImport(false)}
          onDone={() => setShowImport(false)}
        />
      )}
    </div>
  );
}

function SlotModal({
  editing,
  subjects,
  allSlots,
  allHourDefs,
  ownerId,
  schoolYearId,
  onClose,
}: {
  editing: { day: WeekDay; hourDef: TimeSlotDef; slot?: TimetableSlot };
  subjects: Subject[];
  allSlots: TimetableSlot[];
  allHourDefs: TimeSlotDef[];
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
  const [specialColor, setSpecialColor] = useState<SubjectColor>(slot?.color ?? DEFAULT_SPECIAL_COLOR);
  const [endTime, setEndTime] = useState(slot?.endTime ?? hourDef.endTime);
  const [room, setRoom] = useState(slot?.room ?? '');
  const [saving, setSaving] = useState(false);

  // ── Mover/intercambiar esta franja con otro día u hora ──────────────
  // Antes, para cambiar una clase de sitio había que borrarla de una franja
  // y volver a crearla en otra: al ser un documento nuevo, perdía todo lo ya
  // escrito en la programación semanal (que cuelga del id de la franja).
  // Aquí se reutiliza el mismo documento (updateTimetableSlot conserva el
  // id), así que toda la programación semanal/anual ya asociada se mueve
  // automáticamente con él. Si el destino ya tiene otra clase, se
  // intercambian las posiciones de ambas franjas (cada una conserva su
  // propio id y, por tanto, su propia programación).
  const [moveTargetDay, setMoveTargetDay] = useState<WeekDay>(day);
  const [moveTargetHourDefId, setMoveTargetHourDefId] = useState('');
  const [moving, setMoving] = useState(false);
  const [moveError, setMoveError] = useState('');

  const hourDefsForMoveDay = allHourDefs.filter(
    (d) => d.day === moveTargetDay && !(moveTargetDay === day && d.startTime === hourDef.startTime)
  );
  const targetHourDef = hourDefsForMoveDay.find((d) => d.id === moveTargetHourDefId);
  const targetSlot = targetHourDef
    ? allSlots.find((s) => s.day === moveTargetDay && s.startTime === targetHourDef.startTime)
    : undefined;
  const targetSlotSubject = targetSlot?.subjectId ? subjects.find((s) => s.id === targetSlot.subjectId) : undefined;
  const targetSlotLabel = targetSlot
    ? targetSlotSubject
      ? subjectDisplayName(targetSlotSubject)
      : specialTypeLabel(t, targetSlot)
    : '';

  async function handleMove() {
    if (!slot || !targetHourDef) return;
    setMoving(true);
    setMoveError('');
    try {
      const ownDuration = toMinutes(slot.endTime) - toMinutes(hourDef.startTime);
      const newOwnEnd = minutesToTime(toMinutes(targetHourDef.startTime) + Math.max(ownDuration, 5));
      await updateTimetableSlot(slot.id, {
        day: moveTargetDay,
        startTime: targetHourDef.startTime,
        endTime: newOwnEnd,
        room: slot.room,
        subjectId: slot.subjectId,
        specialType: slot.specialType,
        specialLabel: slot.specialLabel,
        color: slot.color,
      });
      if (targetSlot) {
        const otherDuration = toMinutes(targetSlot.endTime) - toMinutes(targetHourDef.startTime);
        const newOtherEnd = minutesToTime(toMinutes(hourDef.startTime) + Math.max(otherDuration, 5));
        await updateTimetableSlot(targetSlot.id, {
          day,
          startTime: hourDef.startTime,
          endTime: newOtherEnd,
          room: targetSlot.room,
          subjectId: targetSlot.subjectId,
          specialType: targetSlot.specialType,
          specialLabel: targetSlot.specialLabel,
          color: targetSlot.color,
        });
      }
      onClose();
    } catch (err) {
      setMoveError(err instanceof Error ? err.message : String(err));
    } finally {
      setMoving(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const base = { day, startTime: hourDef.startTime, endTime, room: room || undefined };
      const data =
        kind === 'subject'
          ? { ...base, subjectId }
          : {
              ...base,
              specialType,
              specialLabel: specialType === 'otro' ? specialLabel : undefined,
              color: specialColor,
            };

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

  const [deletingHourDef, setDeletingHourDef] = useState(false);

  async function handleDelete() {
    if (!slot) return;
    await deleteTimetableSlot(slot.id);
    onClose();
  }

  // Elimina la franja horaria en sí (no una clase asignada, que no la hay
  // aquí) — para cuando se ha colado un hueco vacío que no debería existir
  // en el horario de ese día.
  async function handleDeleteHourDef() {
    setDeletingHourDef(true);
    try {
      await deleteTimeSlotDef(hourDef.id);
      onClose();
    } finally {
      setDeletingHourDef(false);
    }
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
                kind === 'subject' ? 'bg-accent text-white border-accent' : 'bg-theme-card text-ink-soft border-theme'
              }`}
            >
              {t('timetable.typeSubject')}
            </button>
            <button
              type="button"
              onClick={() => setKind('special')}
              className={`flex-1 text-sm font-semibold rounded-2xl px-3 py-2 border transition ${
                kind === 'special' ? 'bg-butter-400 text-white border-butter-400' : 'bg-theme-card text-ink-soft border-theme'
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
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {subjectDisplayName(s)}
              </option>
            ))}
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
            <div>
              <label className="text-sm font-medium text-ink-soft block mb-1.5">{t('subjects.color')}</label>
              <div className="flex gap-2 flex-wrap">
                {SUBJECT_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSpecialColor(c)}
                    className={`w-8 h-8 rounded-full ${subjectColorClasses[c].dot} ${
                      specialColor === c ? 'ring-2 ring-offset-2 ring-ink' : ''
                    }`}
                    aria-label={c}
                  />
                ))}
              </div>
            </div>
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

        {slot && (
          <div className="rounded-xl px-3 py-3 flex flex-col gap-2" style={{ background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              {t('timetable.moveTitle')}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t('timetable.moveHelp')}</p>
            <div className="grid grid-cols-2 gap-2">
              <Select
                label={t('timetable.day')}
                value={String(moveTargetDay)}
                onChange={(e) => { setMoveTargetDay(Number(e.target.value) as WeekDay); setMoveTargetHourDefId(''); }}
              >
                {DAYS.map((d) => (
                  <option key={d.value} value={d.value}>{t(d.key)}</option>
                ))}
              </Select>
              <Select
                label={t('timetable.hour')}
                value={moveTargetHourDefId}
                onChange={(e) => setMoveTargetHourDefId(e.target.value)}
              >
                <option value="">{t('timetable.selectHour')}</option>
                {hourDefsForMoveDay.map((d) => (
                  <option key={d.id} value={d.id}>{d.startTime}–{d.endTime}</option>
                ))}
              </Select>
            </div>
            {hourDefsForMoveDay.length === 0 && (
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t('timetable.moveNoHours')}</p>
            )}
            {targetSlot && (
              <p className="text-xs text-butter-600">{t('timetable.moveSwapHint', { name: targetSlotLabel })}</p>
            )}
            {moveError && <p className="text-xs text-rose-600">{moveError}</p>}
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleMove}
              disabled={!targetHourDef || moving}
              icon={<IconMove size={14} />}
              className="self-start"
            >
              {moving ? t('common.loading') : targetSlot ? t('timetable.swapButton') : t('timetable.moveButton')}
            </Button>
          </div>
        )}

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
          {!slot && (
            <Button
              type="button"
              variant="danger"
              onClick={handleDeleteHourDef}
              disabled={deletingHourDef}
              icon={<IconTrash size={16} />}
              className="ml-auto"
            >
              {deletingHourDef ? t('common.loading') : t('timetable.removeHourSlot')}
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}
