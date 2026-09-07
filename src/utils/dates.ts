import { startOfWeek, startOfMonth, addWeeks, addMonths, addDays, format, parseISO, type Locale } from 'date-fns';
import { es, ca, gl, eu, enUS } from 'date-fns/locale';

/**
 * Locale de date-fns para los nombres de mes/día ("d MMM", "LLLL yyyy"...).
 * Sin esto, date-fns usa su locale por defecto (inglés) sin importar el
 * idioma configurado en la app, así que los meses salían siempre en inglés
 * ("1 Aug") aunque la interfaz estuviera en español/català/etc.
 */
const DATE_FNS_LOCALES: Record<string, Locale> = { es, ca, gl, eu, en: enUS };

export function getDateFnsLocale(languageCode?: string): Locale {
  const code = (languageCode ?? 'es').split('-')[0].toLowerCase();
  return DATE_FNS_LOCALES[code] ?? es;
}

/** Suma (o resta, con un valor negativo) días a una fecha ISO (yyyy-MM-dd). */
export function addIsoDays(iso: string, days: number): string {
  return format(addDays(parseISO(iso), days), 'yyyy-MM-dd');
}

/**
 * Lista de fechas ISO entre startIso y endIso, ambas incluidas. Si endIso es
 * anterior a startIso, se devuelve solo startIso (rango degenerado).
 */
export function isoDateRange(startIso: string, endIso: string): string[] {
  if (endIso < startIso) return [startIso];
  const dates: string[] = [];
  let cursor = startIso;
  while (cursor <= endIso) {
    dates.push(cursor);
    cursor = addIsoDays(cursor, 1);
  }
  return dates;
}

/** Devuelve el lunes (ISO) de la semana que contiene la fecha dada. */
export function getWeekStart(date: Date): string {
  const monday = startOfWeek(date, { weekStartsOn: 1 });
  return format(monday, 'yyyy-MM-dd');
}

export function shiftWeek(weekStartDate: string, delta: number): string {
  const date = parseISO(weekStartDate);
  return format(addWeeks(date, delta), 'yyyy-MM-dd');
}

export function dateForDayInWeek(weekStartDate: string, dayIndex: number, languageCode?: string): string {
  const monday = parseISO(weekStartDate);
  return format(addDays(monday, dayIndex), 'd MMM', { locale: getDateFnsLocale(languageCode) });
}

/** Igual que dateForDayInWeek pero en formato ISO (yyyy-MM-dd), para cálculos. */
export function isoDateForDayInWeek(weekStartDate: string, dayIndex: number): string {
  const monday = parseISO(weekStartDate);
  return format(addDays(monday, dayIndex), 'yyyy-MM-dd');
}

export function formatWeekLabel(weekStartDate: string, languageCode?: string): string {
  const monday = parseISO(weekStartDate);
  const sunday = addDays(monday, 4);
  const locale = getDateFnsLocale(languageCode);
  return `${format(monday, 'd MMM', { locale })} - ${format(sunday, 'd MMM yyyy', { locale })}`;
}

/** Devuelve el día 1 (ISO) del mes que contiene la fecha dada. */
export function getMonthStart(date: Date): string {
  return format(startOfMonth(date), 'yyyy-MM-dd');
}

export function shiftMonth(monthStartDate: string, delta: number): string {
  const date = parseISO(monthStartDate);
  return format(addMonths(date, delta), 'yyyy-MM-dd');
}

export function formatMonthLabel(monthStartDate: string, languageCode?: string): string {
  const date = parseISO(monthStartDate);
  return format(date, 'LLLL yyyy', { locale: getDateFnsLocale(languageCode) });
}

/**
 * Cuadrícula de días (ISO) para pintar un calendario mensual: empieza en el
 * lunes de la semana que contiene el día 1 del mes, y termina en el domingo
 * de la semana que contiene el último día del mes (siempre múltiplo de 7).
 */
export function getMonthCalendarDays(monthStartDate: string): string[] {
  const firstOfMonth = parseISO(monthStartDate);
  const gridStart = startOfWeek(firstOfMonth, { weekStartsOn: 1 });
  const lastOfMonth = addDays(startOfMonth(addMonths(firstOfMonth, 1)), -1);
  const gridEnd = startOfWeek(lastOfMonth, { weekStartsOn: 1 });
  const days: string[] = [];
  let cursor = gridStart;
  while (cursor <= gridEnd) {
    for (let i = 0; i < 7; i++) {
      days.push(format(addDays(cursor, i), 'yyyy-MM-dd'));
    }
    cursor = addDays(cursor, 7);
  }
  return days;
}
