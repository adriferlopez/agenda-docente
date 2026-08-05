import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  deleteField,
  writeBatch,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { TimetableSlot, TimeSlotDef, WeekDay, SpecialSlotType } from '@/types';

const COL = 'timetableSlots';
const HOURS_COL = 'timeSlotDefs';

// ---------------------------------------------------------------------
// Franjas (clases / sesiones asignadas en el horario)
// ---------------------------------------------------------------------

export function subscribeTimetable(
  ownerId: string,
  schoolYearId: string,
  callback: (slots: TimetableSlot[]) => void
): Unsubscribe {
  const q = query(
    collection(db, COL),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId)
  );
  return onSnapshot(q, (snap) => {
    const slots = snap.docs.map((d) => ({ id: d.id, ...d.data() } as TimetableSlot));
    callback(slots);
  });
}

interface SlotInput {
  day: WeekDay;
  startTime: string;
  endTime: string;
  room?: string;
  subjectId?: string;
  specialType?: SpecialSlotType;
  specialLabel?: string;
}

export async function createTimetableSlot(
  ownerId: string,
  schoolYearId: string,
  data: SlotInput
): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ownerId,
    schoolYearId,
    ...data,
  });
  return ref.id;
}

/**
 * Actualiza una franja. Si se cambia entre "asignatura" y "especial", se
 * limpian explícitamente los campos del tipo anterior para no dejar datos
 * inconsistentes (p.ej. un subjectId residual en una franja de patio).
 */
export async function updateTimetableSlot(slotId: string, data: SlotInput): Promise<void> {
  const payload: Record<string, unknown> = {
    day: data.day,
    startTime: data.startTime,
    endTime: data.endTime,
    room: data.room ?? deleteField(),
  };

  if (data.subjectId) {
    payload.subjectId = data.subjectId;
    payload.specialType = deleteField();
    payload.specialLabel = deleteField();
  } else {
    payload.subjectId = deleteField();
    payload.specialType = data.specialType;
    payload.specialLabel = data.specialLabel ?? deleteField();
  }

  await updateDoc(doc(db, COL, slotId), payload);
}

export async function deleteTimetableSlot(slotId: string): Promise<void> {
  await deleteDoc(doc(db, COL, slotId));
}

// ---------------------------------------------------------------------
// Franjas horarias configurables (horas de inicio/fin por día)
// ---------------------------------------------------------------------

export function subscribeTimeSlotDefs(
  ownerId: string,
  schoolYearId: string,
  callback: (defs: TimeSlotDef[]) => void
): Unsubscribe {
  const q = query(
    collection(db, HOURS_COL),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId)
  );
  return onSnapshot(q, (snap) => {
    const defs = snap.docs
      .map((d) => ({ id: d.id, ...d.data() } as TimeSlotDef))
      .sort((a, b) => a.day - b.day || a.order - b.order);
    callback(defs);
  });
}

export async function addTimeSlotDef(
  ownerId: string,
  schoolYearId: string,
  data: { day: WeekDay; startTime: string; endTime: string; order: number }
): Promise<string> {
  const ref = await addDoc(collection(db, HOURS_COL), {
    ownerId,
    schoolYearId,
    ...data,
  });
  return ref.id;
}

export async function updateTimeSlotDef(
  id: string,
  data: Partial<Pick<TimeSlotDef, 'startTime' | 'endTime'>>
): Promise<void> {
  await updateDoc(doc(db, HOURS_COL, id), data);
}

export async function deleteTimeSlotDef(id: string): Promise<void> {
  await deleteDoc(doc(db, HOURS_COL, id));
}

/**
 * Copia la lista de franjas de un día a otros días, sustituyendo las que
 * ya existieran en esos días. Útil para "aplicar este horario a todos los días".
 */
export async function copyTimeSlotDefsToDays(
  ownerId: string,
  schoolYearId: string,
  sourceDefs: TimeSlotDef[],
  existingDefs: TimeSlotDef[],
  targetDays: WeekDay[]
): Promise<void> {
  const batch = writeBatch(db);

  // Eliminar franjas existentes en los días destino
  existingDefs
    .filter((d) => targetDays.includes(d.day))
    .forEach((d) => batch.delete(doc(db, HOURS_COL, d.id)));

  // Crear las nuevas franjas copiadas
  targetDays.forEach((day) => {
    sourceDefs.forEach((def) => {
      const ref = doc(collection(db, HOURS_COL));
      batch.set(ref, {
        ownerId,
        schoolYearId,
        day,
        startTime: def.startTime,
        endTime: def.endTime,
        order: def.order,
      });
    });
  });

  await batch.commit();
}

/** Crea franjas por defecto (8:00-15:00 cada 55 min, lunes-viernes) para un curso nuevo. */
export async function createDefaultTimeSlotDefs(ownerId: string, schoolYearId: string): Promise<void> {
  const batch = writeBatch(db);
  const hours: { startTime: string; endTime: string }[] = [];
  let h = 8;
  let m = 0;
  for (let i = 0; i < 6; i++) {
    const start = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    m += 55;
    if (m >= 60) {
      m -= 60;
      h += 1;
    }
    const end = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    hours.push({ startTime: start, endTime: end });
  }

  for (let day = 0 as WeekDay; day <= 4; day++) {
    hours.forEach((hour, order) => {
      const ref = doc(collection(db, HOURS_COL));
      batch.set(ref, { ownerId, schoolYearId, day, order, ...hour });
    });
  }

  await batch.commit();
}
