import type { SchoolYear, Term } from '@/types';

/**
 * Genera 3 trimestres por defecto repartidos entre dos fechas, usados
 * cuando un SchoolYear todavía no tiene `terms` personalizados. Los ids
 * "1"/"2"/"3" coinciden con el legacy EVALUATIONS para compatibilidad con
 * notas antiguas.
 */
export function defaultTerms(startDate: string, endDate: string): Term[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalMs = end.getTime() - start.getTime();
  if (!startDate || !endDate || Number.isNaN(totalMs) || totalMs <= 0) {
    return [
      { id: '1', name: 'Trimestre 1', startDate: startDate || '', endDate: endDate || '' },
      { id: '2', name: 'Trimestre 2', startDate: startDate || '', endDate: endDate || '' },
      { id: '3', name: 'Trimestre 3', startDate: startDate || '', endDate: endDate || '' },
    ];
  }
  const day = 24 * 60 * 60 * 1000;
  const third = totalMs / 3;
  const t1end = new Date(start.getTime() + third);
  const t2start = new Date(t1end.getTime() + day);
  const t2end = new Date(start.getTime() + 2 * third);
  const t3start = new Date(t2end.getTime() + day);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return [
    { id: '1', name: 'Trimestre 1', startDate: fmt(start), endDate: fmt(t1end) },
    { id: '2', name: 'Trimestre 2', startDate: fmt(t2start), endDate: fmt(t2end) },
    { id: '3', name: 'Trimestre 3', startDate: fmt(t3start), endDate: fmt(end) },
  ];
}

/** Trimestres/periodos efectivos de un curso: los personalizados si existen, si no los 3 por defecto. */
export function getEffectiveTerms(year: Pick<SchoolYear, 'startDate' | 'endDate' | 'terms'>): Term[] {
  if (year.terms && year.terms.length > 0) return year.terms;
  return defaultTerms(year.startDate, year.endDate);
}

/**
 * Trimestre al que pertenece una fecha (p.ej. el weekStartDate de una
 * actividad). Si la fecha cae dentro del rango de un trimestre, ese es el
 * bueno. Si no cae en ninguno (p.ex. una actividad planificada fuera de las
 * fechas exactas del curso, o un curso sin fechas bien ajustadas), se
 * asigna al trimestre cronológicamente más cercano en vez de desaparecer
 * silenciosamente de la libreta de notas.
 */
export function termForDate(terms: Term[], date: string): Term | undefined {
  if (terms.length === 0 || !date) return undefined;
  const containing = terms.find((t) => t.startDate && t.endDate && date >= t.startDate && date <= t.endDate);
  if (containing) return containing;

  let closest: Term | undefined;
  let minDist = Infinity;
  for (const term of terms) {
    if (!term.startDate || !term.endDate) continue;
    const dist = date < term.startDate
      ? daysBetween(date, term.startDate)
      : daysBetween(term.endDate, date);
    if (dist < minDist) {
      minDist = dist;
      closest = term;
    }
  }
  return closest ?? terms[0];
}

function daysBetween(a: string, b: string): number {
  const diff = new Date(b).getTime() - new Date(a).getTime();
  return Math.abs(diff) / (24 * 60 * 60 * 1000);
}
