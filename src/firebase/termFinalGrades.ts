import {
  doc,
  setDoc,
  deleteField,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { TermFinalGradeOverride, QualitativeLevel } from '@/types';

const COL = 'termFinalGrades';

function overrideId(subjectId: string, studentId: string, termId: string): string {
  return `${subjectId}_${studentId}_${termId}`;
}

export function subscribeTermFinalGrades(
  ownerId: string,
  subjectId: string,
  termId: string,
  callback: (overrides: TermFinalGradeOverride[]) => void
): Unsubscribe {
  const q = query(
    collection(db, COL),
    where('ownerId', '==', ownerId),
    where('subjectId', '==', subjectId),
    where('termId', '==', termId)
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as TermFinalGradeOverride)));
  });
}

/** Fuerza manualmente la nota final de un alumno en una asignatura/trimestre. */
export async function setTermFinalGradeOverride(
  ownerId: string,
  schoolYearId: string,
  subjectId: string,
  studentId: string,
  termId: string,
  data: { overrideValue?: number; overrideLevel?: QualitativeLevel }
): Promise<void> {
  const id = overrideId(subjectId, studentId, termId);
  // merge:true + deleteField() en el campo no usado: así no se pierde el
  // comentario guardado (comment) al fijar/cambiar la nota manual.
  await setDoc(
    doc(db, COL, id),
    {
      ownerId,
      schoolYearId,
      subjectId,
      studentId,
      termId,
      overrideValue: data.overrideValue !== undefined ? data.overrideValue : deleteField(),
      overrideLevel: data.overrideLevel ? data.overrideLevel : deleteField(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/** Lectura puntual (no en vivo), usada para calcular la nota de otra asignatura al vuelo. */
export async function getTermFinalGradeOverrideOnce(
  subjectId: string,
  studentId: string,
  termId: string
): Promise<TermFinalGradeOverride | null> {
  const snap = await getDoc(doc(db, COL, overrideId(subjectId, studentId, termId)));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as TermFinalGradeOverride;
}

/** Vuelve a usar el cálculo automático (elimina solo el override, conserva el comentario si lo hay). */
export async function clearTermFinalGradeOverride(subjectId: string, studentId: string, termId: string): Promise<void> {
  const id = overrideId(subjectId, studentId, termId);
  await setDoc(
    doc(db, COL, id),
    { overrideValue: deleteField(), overrideLevel: deleteField(), updatedAt: serverTimestamp() },
    { merge: true }
  );
}

/** Guarda (o sobrescribe) el comentario del alumno para esa asignatura/trimestre, visible en la libreta. */
export async function setTermFinalGradeComment(
  ownerId: string,
  schoolYearId: string,
  subjectId: string,
  studentId: string,
  termId: string,
  comment: string
): Promise<void> {
  const id = overrideId(subjectId, studentId, termId);
  await setDoc(
    doc(db, COL, id),
    { ownerId, schoolYearId, subjectId, studentId, termId, comment, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

/** Elimina el comentario guardado, conservando el override de nota si lo hay. */
export async function clearTermFinalGradeComment(subjectId: string, studentId: string, termId: string): Promise<void> {
  const id = overrideId(subjectId, studentId, termId);
  await setDoc(doc(db, COL, id), { comment: deleteField(), updatedAt: serverTimestamp() }, { merge: true });
}
