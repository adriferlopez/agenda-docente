import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { StudentGroup, Student } from '@/types';

const GROUPS_COL = 'studentGroups';
const STUDENTS_COL = 'students';

// ---------------------------------------------------------------------
// Grupos
// ---------------------------------------------------------------------

export function subscribeStudentGroups(
  ownerId: string,
  schoolYearId: string,
  callback: (groups: StudentGroup[]) => void
): Unsubscribe {
  const q = query(
    collection(db, GROUPS_COL),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId)
  );
  return onSnapshot(q, (snap) => {
    const groups = snap.docs
      .map((d) => ({ id: d.id, ...d.data() } as StudentGroup))
      .sort((a, b) => a.name.localeCompare(b.name));
    callback(groups);
  });
}

export async function createStudentGroup(
  ownerId: string,
  schoolYearId: string,
  name: string
): Promise<string> {
  const ref = await addDoc(collection(db, GROUPS_COL), {
    ownerId,
    schoolYearId,
    name,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function deleteStudentGroup(groupId: string, studentIds: string[]): Promise<void> {
  const batch = writeBatch(db);
  studentIds.forEach((id) => batch.delete(doc(db, STUDENTS_COL, id)));
  batch.delete(doc(db, GROUPS_COL, groupId));
  await batch.commit();
}

// ---------------------------------------------------------------------
// Alumnos
// ---------------------------------------------------------------------

export function subscribeStudents(
  ownerId: string,
  schoolYearId: string,
  callback: (students: Student[]) => void
): Unsubscribe {
  const q = query(
    collection(db, STUDENTS_COL),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId)
  );
  return onSnapshot(q, (snap) => {
    const students = snap.docs
      .map((d) => ({ id: d.id, ...d.data() } as Student))
      .sort((a, b) => a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName));
    callback(students);
  });
}

export async function createStudent(
  ownerId: string,
  schoolYearId: string,
  data: { groupId: string; firstName: string; lastName: string }
): Promise<string> {
  const ref = await addDoc(collection(db, STUDENTS_COL), {
    ownerId,
    schoolYearId,
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/** Crea varios alumnos de golpe (p.ej. tras importar un Excel). */
export async function createStudentsBatch(
  ownerId: string,
  schoolYearId: string,
  groupId: string,
  students: { firstName: string; lastName: string }[]
): Promise<void> {
  const batch = writeBatch(db);
  students.forEach((s) => {
    const ref = doc(collection(db, STUDENTS_COL));
    batch.set(ref, {
      ownerId,
      schoolYearId,
      groupId,
      firstName: s.firstName,
      lastName: s.lastName,
      createdAt: serverTimestamp(),
    });
  });
  await batch.commit();
}

export async function updateStudent(
  studentId: string,
  data: Partial<Pick<Student, 'firstName' | 'lastName' | 'groupId'>>
): Promise<void> {
  await updateDoc(doc(db, STUDENTS_COL, studentId), data);
}

export async function deleteStudent(studentId: string): Promise<void> {
  await deleteDoc(doc(db, STUDENTS_COL, studentId));
}
