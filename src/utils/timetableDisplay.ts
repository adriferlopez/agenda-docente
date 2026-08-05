import type { Subject, TimetableSlot, SpecialSlotType } from '@/types';
import type { TFunction } from 'i18next';

/** "Nombre · Curso Grupo" o "Nombre · Grupo" si no hay curso, etc. */
export function subjectDetails(subject: Subject): string {
  return [subject.courseLevel, subject.group].filter(Boolean).join(' ');
}

export function specialTypeLabel(t: TFunction, slot: TimetableSlot): string {
  if (slot.specialType === 'otro' && slot.specialLabel) {
    return slot.specialLabel;
  }
  const type: SpecialSlotType = slot.specialType ?? 'otro';
  return t(`timetable.special.${type}`);
}
