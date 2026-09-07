import type { Subject, TimetableSlot, SpecialSlotType } from '@/types';
import type { TFunction } from 'i18next';

/** "Grupo" (campo libre "Curso y grupo" que rellena el docente). */
export function subjectDetails(subject: Subject): string {
  return subject.group ?? '';
}

/**
 * Nombre completo a mostrar como título grande de la asignatura, incluyendo
 * el campo libre "Curso y grupo" (p.ej. "Castellano 2º A"). Se usa en vez de
 * mostrar solo `subject.name` en grande, para poder distinguir de un vistazo
 * dos asignaturas con el mismo nombre pero grupos distintos (p.ej.
 * "Castellano 2º A" vs "Castellano 2º B").
 *
 * OJO: `courseLevel` (las casillas de curso, hasta 3) NO se incluye aquí a
 * propósito. Esas casillas son solo para que Profi/el currículum sepan a qué
 * curso(s) pertenece la asignatura internamente (p.ej. para elegir CE y
 * criteris); si se añadiesen al título, una asignatura con 3 cursos a la vez
 * (p.ej. "Ambients" en varios cursos de Primària) generaría un título
 * kilométrico. El docente controla el título final a través del campo libre
 * "Curso y grupo" (`subject.group`), que puede acotar como quiera.
 */
export function subjectDisplayName(subject: Pick<Subject, 'name' | 'group'>): string {
  return [subject.name, subject.group].filter(Boolean).join(' ');
}

export function specialTypeLabel(t: TFunction, slot: Pick<TimetableSlot, 'specialType' | 'specialLabel'>): string {
  if (slot.specialType === 'otro' && slot.specialLabel) {
    return slot.specialLabel;
  }
  const type: SpecialSlotType = slot.specialType ?? 'otro';
  return t(`timetable.special.${type}`);
}
