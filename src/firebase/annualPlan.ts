import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { WeeklyPlan } from '@/types';

const COL = 'weeklyPlans';

/**
 * Devuelve todos los planes semanales de un curso escolar que tienen título
 * (es decir, actividades programadas), ordenados por semana.
 * Se usa como base para construir la programación anual.
 */
export async function getAllWeeklyPlansForYear(ownerId: string, schoolYearId: string): Promise<WeeklyPlan[]> {
  const q = query(collection(db, COL), where('ownerId', '==', ownerId), where('schoolYearId', '==', schoolYearId));
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() } as WeeklyPlan))
    .filter((p) => p.title?.trim())
    .sort((a, b) => a.weekStartDate.localeCompare(b.weekStartDate));
}

export async function updatePlanCurriculumAndObjectives(
  planId: string,
  data: { aiObjectives?: string; curriculumItemIds?: string[]; referenceImageUrl?: string }
): Promise<void> {
  await updateDoc(doc(db, COL, planId), data);
}
