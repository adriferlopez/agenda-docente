import {
  collection,
  doc,
  addDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  getDocs,
  serverTimestamp,
  writeBatch,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { LearningSituation, WeeklyPlan } from '@/types';

const COL = 'learningSituations';

export function subscribeLearningSituations(
  ownerId: string,
  schoolYearId: string,
  subjectId: string,
  callback: (situations: LearningSituation[]) => void
): Unsubscribe {
  const q = query(
    collection(db, COL),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId),
    where('subjectId', '==', subjectId)
  );
  return onSnapshot(q, (snap) => {
    const situations = snap.docs.map((d) => ({ id: d.id, ...d.data() } as LearningSituation));
    callback(situations);
  });
}

/** Todas las SA del curso escolar (todas las asignaturas), para el selector global "Objetivos generales de la SA". */
export function subscribeAllLearningSituations(
  ownerId: string,
  schoolYearId: string,
  callback: (situations: LearningSituation[]) => void
): Unsubscribe {
  const q = query(collection(db, COL), where('ownerId', '==', ownerId), where('schoolYearId', '==', schoolYearId));
  return onSnapshot(q, (snap) => {
    const situations = snap.docs.map((d) => ({ id: d.id, ...d.data() } as LearningSituation));
    callback(situations);
  });
}

export async function createLearningSituation(
  ownerId: string,
  schoolYearId: string,
  subjectId: string,
  name: string
): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ownerId,
    schoolYearId,
    subjectId,
    name: name.trim(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateLearningSituation(
  id: string,
  data: Partial<Pick<LearningSituation, 'name' | 'objectives' | 'methodology' | 'resources' | 'diversityAttention' | 'sabers' | 'evaluationCriteria' | 'ceMatrixOverrides'>>
): Promise<void> {
  await updateDoc(doc(db, COL, id), { ...data, updatedAt: serverTimestamp() });
}

/** Borra la SA y desvincula (saId -> undefined) las actividades que la referenciaban, sin borrar las actividades. */
export async function deleteLearningSituation(ownerId: string, schoolYearId: string, id: string): Promise<void> {
  const q = query(
    collection(db, 'weeklyPlans'),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId),
    where('saId', '==', id)
  );
  const snap = await getDocs(q);
  const batch = writeBatch(db);
  snap.docs.forEach((d) => batch.update(d.ref, { saId: null }));
  batch.delete(doc(db, COL, id));
  await batch.commit();
}

/**
 * Migración automática, silenciosa e idempotente: convierte las actividades
 * antiguas agrupadas solo por texto libre (`saLabel`, coincidencia exacta
 * entre actividades consecutivas de la misma asignatura) en Situaciones de
 * Aprendizaje reales, creando un LearningSituation por cada grupo detectado
 * y enlazando esas actividades por `saId`. No borra `saLabel` ni toca
 * ninguna actividad que ya tenga `saId` o que no tenga `saLabel`. Es segura
 * de llamar en cada carga de Programación anual: si ya se migró, no
 * encuentra nada pendiente y no hace ninguna escritura.
 */
export async function migrateLegacySaLabels(
  ownerId: string,
  schoolYearId: string,
  plansBySubject: Map<string, WeeklyPlan[]>
): Promise<void> {
  // Nada que migrar: ninguna actividad tiene saLabel sin saId. Comprobación
  // rápida antes de hacer ninguna lectura extra a Firestore.
  const anyPending = [...plansBySubject.values()].some((plans) =>
    plans.some((p) => !p.saId && p.saLabel?.trim())
  );
  if (!anyPending) return;

  const batch = writeBatch(db);
  let hasWrites = false;

  for (const [subjectId, plans] of plansBySubject.entries()) {
    const sorted = [...plans].sort((a, b) => a.weekStartDate.localeCompare(b.weekStartDate));
    const existingSnap = await getDocs(
      query(collection(db, COL), where('ownerId', '==', ownerId), where('schoolYearId', '==', schoolYearId), where('subjectId', '==', subjectId))
    );
    const existingByName = new Map(
      existingSnap.docs.map((d) => [d.data().name as string, { id: d.id, ...d.data() } as LearningSituation])
    );

    let lastLabel: string | undefined;
    let currentSituationId: string | undefined;
    for (const plan of sorted) {
      const label = plan.saLabel?.trim() || '';
      if (!label) {
        lastLabel = '';
        currentSituationId = undefined;
        continue;
      }
      if (label !== lastLabel) {
        lastLabel = label;
        const existing = existingByName.get(label);
        if (existing) {
          currentSituationId = existing.id;
        } else {
          const ref = doc(collection(db, COL));
          batch.set(ref, {
            ownerId,
            schoolYearId,
            subjectId,
            name: label,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
          existingByName.set(label, { id: ref.id } as LearningSituation);
          currentSituationId = ref.id;
          hasWrites = true;
        }
      }
      if (!plan.saId && currentSituationId) {
        batch.update(doc(db, 'weeklyPlans', plan.id), { saId: currentSituationId });
        hasWrites = true;
      }
    }
  }

  if (hasWrites) await batch.commit();
}
