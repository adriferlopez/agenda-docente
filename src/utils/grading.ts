import { QUALITATIVE_LEVELS, type QualitativeLevel, type ScoreType } from '@/types';

/** Valor numérico representativo de cada nivel cualitativo, usado para poder
 * reutilizar la misma UI de puntuación 0-10 y los mismos cálculos de peso. */
export const QUALITATIVE_VALUES: Record<QualitativeLevel, number> = {
  NA: 2.5,
  AS: 6,
  AN: 8,
  AE: 9.5,
};

/** Convierte un valor numérico 0-10 al nivel cualitativo cuyo rango lo contiene. */
export function valueToQualitative(value: number): QualitativeLevel {
  if (value < 5) return 'NA';
  if (value < 7) return 'AS';
  if (value < 9) return 'AN';
  return 'AE';
}

/**
 * Media ponderada estándar. Los pesos no necesitan sumar 100: se normalizan
 * por el total, así que da igual si el docente reparte 40/30/30 o 4/3/3.
 */
export function aggregateNumeric(items: { value: number; weight: number }[]): number {
  const totalWeight = items.reduce((s, it) => s + (it.weight || 0), 0);
  if (totalWeight === 0) return 0;
  const weighted = items.reduce((s, it) => s + it.value * (it.weight || 0), 0);
  return Math.round((weighted / totalWeight) * 100) / 100;
}

/**
 * "Moda ponderada": el nivel cualitativo cuyo peso acumulado es mayor. Es lo
 * que pidió el docente para combinar notas NA/AS/AN/AE — no tiene sentido
 * hacer una media aritmética de niveles, así que se elige el más frecuente
 * según el peso de cada actividad/criterio.
 */
export function aggregateQualitative(items: { level: QualitativeLevel; weight: number }[]): QualitativeLevel {
  const totals: Record<QualitativeLevel, number> = { NA: 0, AS: 0, AN: 0, AE: 0 };
  for (const it of items) totals[it.level] += it.weight || 0;
  let best: QualitativeLevel = 'NA';
  let bestVal = -1;
  for (const level of QUALITATIVE_LEVELS) {
    if (totals[level] > bestVal) {
      bestVal = totals[level];
      best = level;
    }
  }
  return best;
}

export type BlendedGrade =
  | { type: 'numeric'; value: number }
  | { type: 'qualitative'; value: QualitativeLevel };

/**
 * Combina las notas finales de varias actividades (con su peso y tipo de
 * nota) en una única nota de trimestre. Si todas son numéricas, media
 * ponderada normal. En cuanto hay alguna actividad cualitativa en la
 * mezcla, se resuelve por moda ponderada (bucketizando a NA/AS/AN/AE las
 * que sean numéricas) porque promediar números con niveles no tiene sentido.
 */
export function computeBlendedGrade(
  activities: { finalScore: number; qualitativeLevel?: QualitativeLevel; weight: number; scoreType: ScoreType }[]
): BlendedGrade | undefined {
  if (activities.length === 0) return undefined;
  const hasQualitative = activities.some((a) => a.scoreType === 'qualitative');
  if (!hasQualitative) {
    return { type: 'numeric', value: aggregateNumeric(activities.map((a) => ({ value: a.finalScore, weight: a.weight }))) };
  }
  const items = activities.map((a) => ({
    level: a.scoreType === 'qualitative' && a.qualitativeLevel ? a.qualitativeLevel : valueToQualitative(a.finalScore),
    weight: a.weight || 1,
  }));
  return { type: 'qualitative', value: aggregateQualitative(items) };
}
