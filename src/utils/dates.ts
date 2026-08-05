import { startOfWeek, addWeeks, addDays, format, parseISO } from 'date-fns';

/** Devuelve el lunes (ISO) de la semana que contiene la fecha dada. */
export function getWeekStart(date: Date): string {
  const monday = startOfWeek(date, { weekStartsOn: 1 });
  return format(monday, 'yyyy-MM-dd');
}

export function shiftWeek(weekStartDate: string, delta: number): string {
  const date = parseISO(weekStartDate);
  return format(addWeeks(date, delta), 'yyyy-MM-dd');
}

export function dateForDayInWeek(weekStartDate: string, dayIndex: number): string {
  const monday = parseISO(weekStartDate);
  return format(addDays(monday, dayIndex), 'd MMM');
}

export function formatWeekLabel(weekStartDate: string): string {
  const monday = parseISO(weekStartDate);
  const sunday = addDays(monday, 4);
  return `${format(monday, 'd MMM')} - ${format(sunday, 'd MMM yyyy')}`;
}
