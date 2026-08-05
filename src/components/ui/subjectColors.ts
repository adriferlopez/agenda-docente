import type { SubjectColor } from '@/types';

// Mapeo de colores pastel para asignaturas: clases Tailwind precompiladas
export const subjectColorClasses: Record<SubjectColor, { bg: string; text: string; border: string; dot: string }> = {
  lav: { bg: 'bg-lav-50', text: 'text-lav-600', border: 'border-lav-200', dot: 'bg-lav-400' },
  mint: { bg: 'bg-mint-50', text: 'text-mint-600', border: 'border-mint-200', dot: 'bg-mint-400' },
  peach: { bg: 'bg-peach-50', text: 'text-peach-600', border: 'border-peach-200', dot: 'bg-peach-400' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', dot: 'bg-rose-400' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-200', dot: 'bg-sky-400' },
  butter: { bg: 'bg-butter-50', text: 'text-butter-600', border: 'border-butter-200', dot: 'bg-butter-400' },
};
