import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { StudentNote } from '@/types';

const COL = 'studentNotes';

/**
 * Anotaciones libres de un alumno/a (apartado Alumnat). No están ligadas a
 * ninguna asignatura: son observaciones/seguimiento del docente sobre la
 * persona, ordenadas de más reciente a más antigua.
 */
export function subscribeStudentNotes(
  ownerId: string,
  studentId: string,
  callback: (notes: StudentNote[]) => void
): Unsubscribe {
  const q = query(collection(db, COL), where('ownerId', '==', ownerId), where('studentId', '==', studentId));
  return onSnapshot(q, (snap) => {
    const notes = snap.docs
      .map((d) => ({ id: d.id, ...d.data() } as StudentNote))
      .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
    callback(notes);
  });
}

export async function addStudentNote(
  ownerId: string,
  schoolYearId: string,
  studentId: string,
  text: string,
  category?: string
): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ownerId,
    schoolYearId,
    studentId,
    text,
    ...(category ? { category } : {}),
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateStudentNote(noteId: string, text: string, category?: string): Promise<void> {
  await updateDoc(doc(db, COL, noteId), { text, category: category ?? deleteField() });
}

export async function deleteStudentNote(noteId: string): Promise<void> {
  await deleteDoc(doc(db, COL, noteId));
}
