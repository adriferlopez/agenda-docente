import type { Rubric } from '@/types';

/**
 * Las rúbricas LOMLOE prediseñadas se eliminaron: no tenían Competències
 * Específiques vinculadas a sus criterios (eran genéricas, anteriores al
 * sistema de rúbricas por competencias), lo que impedía que Profi las usara
 * bien en el banco de frases. Ahora todas las rúbricas del docente se crean
 * ligadas a criterios de evaluación propios (manualmente, importadas desde
 * Excel, o generadas con Profi a partir de las CE de la asignatura).
 *
 * Se mantienen estos exports vacíos por compatibilidad, en caso de que algo
 * los siga importando.
 */
export const LOMLOE_RUBRICAS: Rubric[] = [];

export function getLomloRubricas(): Rubric[] {
  return [];
}

export const LOMLOE_COMMUNITIES: string[] = [];
