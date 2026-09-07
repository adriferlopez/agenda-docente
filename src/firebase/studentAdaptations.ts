import {
  doc,
  setDoc,
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { StudentAdaptation } from '@/types';

const COL = 'studentAdaptations';

/** Id determinista para poder hacer upsert sin buscar primero. */
function adaptationId(subjectId: string, studentId: string): string {
  return `${subjectId}_${studentId}`;
}

export function subscribeStudentAdaptations(
  ownerId: string,
  subjectId: string,
  callback: (adaptations: StudentAdaptation[]) => void
): Unsubscribe {
  const q = query(
    collection(db, COL),
    where('ownerId', '==', ownerId),
    where('subjectId', '==', subjectId)
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as StudentAdaptation)));
  });
}

/**
 * Crea o actualiza la adaptación curricular de un alumno/a para una
 * asignatura. Sustituye siempre el documento completo (no merge), así que
 * hay que pasar el estado deseado entero cada vez.
 */
export async function setStudentAdaptation(
  ownerId: string,
  subjectId: string,
  studentId: string,
  data: { hasAdaptation: boolean; adaptedRubricId?: string }
): Promise<void> {
  const id = adaptationId(subjectId, studentId);
  await setDoc(doc(db, COL, id), {
    ownerId,
    subjectId,
    studentId,
    hasAdaptation: data.hasAdaptation,
    ...(data.hasAdaptation && data.adaptedRubricId ? { adaptedRubricId: data.adaptedRubricId } : {}),
    updatedAt: serverTimestamp(),
  });
}
