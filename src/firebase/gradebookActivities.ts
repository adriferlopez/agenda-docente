import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { GradebookActivity } from '@/types';

const COL = 'gradebookActivities';

/** Lectura puntual (no en vivo), usada para calcular la nota de otra asignatura al vuelo. */
export async function getGradebookActivitiesOnce(
  ownerId: string,
  schoolYearId: string,
  subjectId: string,
  termId: string
): Promise<GradebookActivity[]> {
  const q = query(
    collection(db, COL),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId),
    where('subjectId', '==', subjectId),
    where('termId', '==', termId)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as GradebookActivity));
}

/**
 * Todas las actividades evaluables de una asignatura, sin filtrar por
 * trimestre (usado para saber qué Competències Específiques se evalúan de
 * verdad en la asignatura a lo largo de todo el curso, no solo en uno).
 */
export async function getGradebookActivitiesForSubjectOnce(
  ownerId: string,
  schoolYearId: string,
  subjectId: string
): Promise<GradebookActivity[]> {
  const q = query(
    collection(db, COL),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId),
    where('subjectId', '==', subjectId)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as GradebookActivity));
}

export function subscribeGradebookActivities(
  ownerId: string,
  schoolYearId: string,
  subjectId: string,
  termId: string,
  callback: (activities: GradebookActivity[]) => void
): Unsubscribe {
  const q = query(
    collection(db, COL),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId),
    where('subjectId', '==', subjectId),
    where('termId', '==', termId)
  );
  return onSnapshot(q, (snap) => {
    const activities = snap.docs
      .map((d) => ({ id: d.id, ...d.data() } as GradebookActivity))
      .sort((a, b) => a.name.localeCompare(b.name));
    callback(activities);
  });
}

export async function createGradebookActivity(
  ownerId: string,
  schoolYearId: string,
  data: {
    subjectId: string;
    termId: string;
    name: string;
    rubricId: string;
    criterionIds?: string[];
    weight: number;
    scoreType: GradebookActivity['scoreType'];
  }
): Promise<string> {
  const { criterionIds, ...rest } = data;
  const ref = await addDoc(collection(db, COL), {
    ownerId,
    schoolYearId,
    ...rest,
    ...(criterionIds && criterionIds.length > 0 ? { criterionIds } : {}),
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateGradebookActivity(
  id: string,
  data: Partial<Pick<GradebookActivity, 'name' | 'weight' | 'scoreType' | 'rubricId' | 'criterionIds'>>
): Promise<void> {
  await updateDoc(doc(db, COL, id), data);
}

export async function deleteGradebookActivity(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
