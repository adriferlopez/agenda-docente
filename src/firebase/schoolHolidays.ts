import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  deleteField,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { SchoolHoliday, PastelFolderColor } from '@/types';

const COL = 'schoolHolidays';

/**
 * Festivos del centro: fechas concretas, independientes de las franjas
 * horarias (a diferencia de WeeklyPlan.dayStatus). Se usan para destacar
 * el día como festivo en la vista semanal y mensual de Programación
 * semanal, incluso si ese día de la semana no tiene clases programadas.
 */
export function subscribeSchoolHolidays(
  ownerId: string,
  schoolYearId: string,
  callback: (holidays: SchoolHoliday[]) => void
): Unsubscribe {
  const q = query(collection(db, COL), where('ownerId', '==', ownerId), where('schoolYearId', '==', schoolYearId));
  return onSnapshot(q, (snap) => {
    const holidays = snap.docs
      .map((d) => ({ id: d.id, ...d.data() } as SchoolHoliday))
      .sort((a, b) => a.date.localeCompare(b.date));
    callback(holidays);
  });
}

export async function addSchoolHoliday(
  ownerId: string,
  schoolYearId: string,
  date: string,
  label?: string,
  color?: PastelFolderColor
): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ownerId,
    schoolYearId,
    date,
    ...(label ? { label } : {}),
    ...(color ? { color } : {}),
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function deleteSchoolHoliday(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}

/**
 * Edita un festivo ya creado (fecha, etiqueta y/o color). `label`/`color`
 * con valor `null` explícito borran el campo (en vez de dejarlo como
 * estaba), para poder quitar una etiqueta o un color ya puestos.
 */
export async function updateSchoolHoliday(
  id: string,
  updates: { date?: string; label?: string | null; color?: PastelFolderColor | null }
): Promise<void> {
  const data: Record<string, unknown> = {};
  if (updates.date !== undefined) data.date = updates.date;
  if (updates.label !== undefined) data.label = updates.label === null ? deleteField() : updates.label;
  if (updates.color !== undefined) data.color = updates.color === null ? deleteField() : updates.color;
  await updateDoc(doc(db, COL, id), data);
}
