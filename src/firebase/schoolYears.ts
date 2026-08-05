import {
  collection,
  doc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { SchoolYear } from '@/types';

const COL = 'schoolYears';

export function subscribeSchoolYears(
  ownerId: string,
  callback: (years: SchoolYear[]) => void
): Unsubscribe {
  const q = query(collection(db, COL), where('ownerId', '==', ownerId), orderBy('startDate', 'desc'));
  return onSnapshot(q, (snap) => {
    const years = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        ownerId: data.ownerId,
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : Date.now(),
      } as SchoolYear;
    });
    callback(years);
  });
}

export async function createSchoolYear(
  ownerId: string,
  data: { name: string; startDate: string; endDate: string }
): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ownerId,
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function setActiveSchoolYear(uid: string, schoolYearId: string): Promise<void> {
  await updateDoc(doc(db, 'users', uid), { activeSchoolYearId: schoolYearId });
}
