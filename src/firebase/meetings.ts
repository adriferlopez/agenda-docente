import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { Meeting } from '@/types';

const COL = 'meetings';

export function subscribeMeetings(
  ownerId: string,
  schoolYearId: string,
  callback: (meetings: Meeting[]) => void
): Unsubscribe {
  const q = query(
    collection(db, COL),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId),
    orderBy('date', 'desc')
  );
  return onSnapshot(q, (snap) => {
    const meetings = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        ownerId: data.ownerId,
        schoolYearId: data.schoolYearId,
        title: data.title,
        date: data.date,
        notes: data.notes ?? '',
        driveAttachments: data.driveAttachments ?? [],
        summarySourceText: data.summarySourceText ?? '',
        aiSummary: data.aiSummary,
        createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : Date.now(),
        updatedAt: data.updatedAt?.toMillis ? data.updatedAt.toMillis() : Date.now(),
      } as Meeting;
    });
    callback(meetings);
  });
}

export async function createMeeting(
  ownerId: string,
  schoolYearId: string,
  data: { title: string; date: string }
): Promise<string> {
  const newRef = doc(collection(db, COL));
  await setDoc(newRef, {
    ownerId,
    schoolYearId,
    title: data.title,
    date: data.date,
    notes: '',
    driveAttachments: [],
    summarySourceText: '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return newRef.id;
}

export async function updateMeeting(
  meetingId: string,
  data: Partial<
    Pick<Meeting, 'title' | 'date' | 'notes' | 'driveAttachments' | 'summarySourceText' | 'aiSummary'>
  >
): Promise<void> {
  await updateDoc(doc(db, COL, meetingId), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteMeeting(meetingId: string): Promise<void> {
  await deleteDoc(doc(db, COL, meetingId));
}
