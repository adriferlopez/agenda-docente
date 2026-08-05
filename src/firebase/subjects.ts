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
import type { Subject, SubjectColor } from '@/types';

const COL = 'subjects';

export function subscribeSubjects(
  ownerId: string,
  schoolYearId: string,
  callback: (subjects: Subject[]) => void
): Unsubscribe {
  const q = query(
    collection(db, COL),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId)
  );
  return onSnapshot(q, (snap) => {
    const subjects = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        ownerId: data.ownerId,
        schoolYearId: data.schoolYearId,
        name: data.name,
        courseLevel: data.courseLevel,
        group: data.group,
        color: data.color,
        studentGroupId: data.studentGroupId,
        createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : Date.now(),
      } as Subject;
    });
    callback(subjects);
  });
}

export async function createSubject(
  ownerId: string,
  schoolYearId: string,
  data: { name: string; courseLevel?: string; group: string; studentGroupId?: string; color: SubjectColor }
): Promise<string> {
  const { courseLevel, studentGroupId, ...rest } = data;
  const ref = await addDoc(collection(db, COL), {
    ownerId,
    schoolYearId,
    ...rest,
    ...(courseLevel ? { courseLevel } : {}),
    ...(studentGroupId ? { studentGroupId } : {}),
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateSubjectStudentGroup(subjectId: string, studentGroupId: string | null): Promise<void> {
  await updateDoc(doc(db, COL, subjectId), {
    studentGroupId: studentGroupId ?? deleteField(),
  });
}

export async function deleteSubject(subjectId: string): Promise<void> {
  await deleteDoc(doc(db, COL, subjectId));
}
