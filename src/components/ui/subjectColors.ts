import type { SubjectColor, WeeklyCalendarStyle } from '@/types';

// Mapeo de colores pastel para asignaturas: clases Tailwind precompiladas.
// Veinte colores: doce originales (seis pastel + seis "profundos"
// emparejados por círculo cromático) más ocho nuevos, ver comentario en
// SUBJECT_COLORS (src/types/index.ts).
export const subjectColorClasses: Record<SubjectColor, { bg: string; text: string; border: string; dot: string }> = {
  lav: { bg: 'bg-lav-50', text: 'text-lav-600', border: 'border-lav-200', dot: 'bg-lav-400' },
  plum: { bg: 'bg-plum-50', text: 'text-plum-600', border: 'border-plum-200', dot: 'bg-plum-400' },
  mint: { bg: 'bg-mint-50', text: 'text-mint-600', border: 'border-mint-200', dot: 'bg-mint-400' },
  forest: { bg: 'bg-forest-50', text: 'text-forest-600', border: 'border-forest-200', dot: 'bg-forest-400' },
  peach: { bg: 'bg-peach-50', text: 'text-peach-600', border: 'border-peach-200', dot: 'bg-peach-400' },
  terracotta: { bg: 'bg-terracotta-50', text: 'text-terracotta-600', border: 'border-terracotta-200', dot: 'bg-terracotta-400' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', dot: 'bg-rose-400' },
  fuchsia: { bg: 'bg-fuchsia-50', text: 'text-fuchsia-600', border: 'border-fuchsia-200', dot: 'bg-fuchsia-400' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-200', dot: 'bg-sky-400' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', dot: 'bg-indigo-400' },
  butter: { bg: 'bg-butter-50', text: 'text-butter-600', border: 'border-butter-200', dot: 'bg-butter-400' },
  lime: { bg: 'bg-lime-50', text: 'text-lime-600', border: 'border-lime-200', dot: 'bg-lime-400' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', dot: 'bg-teal-400' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', dot: 'bg-cyan-400' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', dot: 'bg-blue-400' },
  yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200', dot: 'bg-yellow-400' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', dot: 'bg-orange-400' },
  crimson: { bg: 'bg-crimson-50', text: 'text-crimson-600', border: 'border-crimson-200', dot: 'bg-crimson-400' },
  stone: { bg: 'bg-stone-50', text: 'text-stone-600', border: 'border-stone-200', dot: 'bg-stone-400' },
  slate: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', dot: 'bg-slate-400' },
};

/** Traduce el estilo de calendario elegido en Horario/Ajustes
 * (profile.weeklyCalendarStyle) a clases y estilos concretos para una celda
 * de asignatura, reutilizado por Horario, Programación semanal y el widget
 * "Horario de hoy" de Inicio para que las tres vistas se vean consistentes. */
export function styledSubjectCell(
  weeklyCalendarStyle: WeeklyCalendarStyle,
  colors: { bg: string; text: string; border: string; dot: string } | null
) {
  if (!colors) return null;
  const bg =
    weeklyCalendarStyle === 'colorBg'
      ? colors.bg
      : weeklyCalendarStyle === 'colorTitleTheme'
        ? ''
        : 'bg-white';
  const border =
    weeklyCalendarStyle === 'colorBg' || weeklyCalendarStyle === 'colorTitleWhite' ? colors.border : '';
  const style =
    weeklyCalendarStyle === 'colorTitleTheme'
      ? { background: 'var(--bg-input)', borderColor: 'var(--border)' }
      : weeklyCalendarStyle === 'stripe'
        ? { borderColor: 'var(--border)' }
        : undefined;
  return { bg, border, style, stripe: weeklyCalendarStyle === 'stripe' };
}
