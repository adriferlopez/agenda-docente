import {
  collection,
  doc,
  setDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { WeeklyPlan, DriveAttachment, RubricCriterion } from '@/types';

const COL = 'weeklyPlans';

// El id del documento es determinista: `${timetableSlotId}_${weekStartDate}`
// para que cada sesión semanal tenga como máximo una programación.
export function weeklyPlanId(timetableSlotId: string, weekStartDate: string): string {
  return `${timetableSlotId}_${weekStartDate}`;
}

export function subscribeWeeklyPlans(
  ownerId: string,
  schoolYearId: string,
  weekStartDate: string,
  callback: (plans: WeeklyPlan[]) => void
): Unsubscribe {
  const q = query(
    collection(db, COL),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId),
    where('weekStartDate', '==', weekStartDate)
  );
  return onSnapshot(q, (snap) => {
    const plans = snap.docs.map((d) => ({ id: d.id, ...d.data() } as WeeklyPlan));
    callback(plans);
  });
}

export async function upsertWeeklyPlan(
  ownerId: string,
  schoolYearId: string,
  timetableSlotId: string,
  subjectId: string,
  weekStartDate: string,
  data: Partial<{
    title: string;
    description: string;
    driveAttachments: DriveAttachment[];
    rubric: RubricCriterion[];
    postClassEvaluation: string;
    aiSuggestions: string;
    status: WeeklyPlan['status'];
  }>
): Promise<string> {
  const id = weeklyPlanId(timetableSlotId, weekStartDate);
  const ref = doc(db, COL, id);
  await setDoc(
    ref,
    {
      ownerId,
      schoolYearId,
      timetableSlotId,
      subjectId,
      weekStartDate,
      ...data,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
  return id;
}

export async function updateWeeklyPlanField(
  planId: string,
  data: Record<string, unknown>
): Promise<void> {
  await updateDoc(doc(db, COL, planId), { ...data, updatedAt: serverTimestamp() });
}
