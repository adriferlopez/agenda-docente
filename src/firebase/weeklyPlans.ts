import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  writeBatch,
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

/**
 * Programaciones semanales marcadas como "salida" (dayStatus.type ===
 * 'outing'), de cualquier semana. El widget "Próximas salidas" del panel de
 * Inicio cruza esto con las franjas horarias (timetableSlots) para calcular
 * la fecha real de cada una (weekStartDate + slot.day) y quedarse solo con
 * las futuras.
 */
export function subscribeOutingWeeklyPlans(
  ownerId: string,
  schoolYearId: string,
  callback: (plans: WeeklyPlan[]) => void
): Unsubscribe {
  const q = query(
    collection(db, COL),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId),
    where('dayStatus.type', '==', 'outing')
  );
  return onSnapshot(q, (snap) => {
    const plans = snap.docs.map((d) => ({ id: d.id, ...d.data() } as WeeklyPlan));
    callback(plans);
  });
}

/**
 * Todas las programaciones semanales de un curso escolar (sin filtrar por
 * semana). Se usa para construir la libreta de notas: las actividades con
 * rúbrica y evaluable=true se agrupan por trimestre según su weekStartDate.
 */
export function subscribeAllWeeklyPlans(
  ownerId: string,
  schoolYearId: string,
  callback: (plans: WeeklyPlan[]) => void
): Unsubscribe {
  const q = query(
    collection(db, COL),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId)
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
    rubricId: string;
    evaluate: boolean;
    postClassEvaluation: string;
    aiSuggestions: string;
    status: WeeklyPlan['status'];
    saLabel: string;
    saId: string;
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

/**
 * Elimina la actividad por completo (documento de Firestore). Al no existir
 * ya, también desaparece automáticamente de Programación anual, que solo
 * muestra las programaciones semanales con título no vacío.
 */
export async function deleteWeeklyPlan(planId: string): Promise<void> {
  await deleteDoc(doc(db, COL, planId));
}

/**
 * Marca (o desmarca, pasando `null`) el motivo por el que no hay clase ese
 * día: ausencia del docente, salida, o festivo. Usa deleteField() explícito
 * para poder QUITAR la marca — a diferencia de upsertWeeklyPlan, que con
 * ignoreUndefinedProperties simplemente omite los campos undefined en vez
 * de borrarlos del documento existente.
 */
export async function setWeeklyPlanDayStatus(
  ownerId: string,
  schoolYearId: string,
  timetableSlotId: string,
  subjectId: string,
  weekStartDate: string,
  dayStatus: WeeklyPlan['dayStatus'] | null
): Promise<void> {
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
      dayStatus: dayStatus ?? deleteField(),
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}

// ── "Mover y desplazar siguientes" ──────────────────────────────────────
// Contenido "de programación" de una sesión: lo que se traslada cuando se
// desplaza en cadena a la siguiente ocurrencia de la asignatura. Se excluye
// deliberadamente lo que es propio de cómo fue la clase en sí
// (postClassEvaluation, aiSuggestions, status, dayStatus), ya que no tiene
// sentido arrastrarlo a una sesión futura que todavía no ha pasado.
export interface WeeklyPlanContent {
  title: string;
  description: string;
  driveAttachments: DriveAttachment[];
  rubric: RubricCriterion[];
  rubricId?: string;
  evaluate?: boolean;
  aiObjectives?: string;
  curriculumItemIds?: string[];
  referenceImageUrl?: string;
  saLabel?: string;
  saId?: string;
}

export const EMPTY_WEEKLY_PLAN_CONTENT: WeeklyPlanContent = {
  title: '',
  description: '',
  driveAttachments: [],
  rubric: [],
};

export function weeklyPlanContentFrom(plan?: WeeklyPlan): WeeklyPlanContent {
  if (!plan) return { ...EMPTY_WEEKLY_PLAN_CONTENT };
  return {
    title: plan.title ?? '',
    description: plan.description ?? '',
    driveAttachments: plan.driveAttachments ?? [],
    rubric: plan.rubric ?? [],
    rubricId: plan.rubricId,
    evaluate: plan.evaluate,
    aiObjectives: plan.aiObjectives,
    curriculumItemIds: plan.curriculumItemIds,
    referenceImageUrl: plan.referenceImageUrl,
    saLabel: plan.saLabel,
    saId: plan.saId,
  };
}

/**
 * Escribe en bloque (batch atómico) el contenido desplazado de una cadena de
 * sesiones de una misma asignatura: cada entrada de `writes` deja su sesión
 * de destino como recién planificada (status 'planned', sin evaluación
 * posterior ni marca de ausencia previas — si tenía dayStatus ya se filtró
 * antes de llegar aquí, en el cálculo de la cadena).
 */
export async function shiftWeeklyPlanChain(
  ownerId: string,
  schoolYearId: string,
  writes: { timetableSlotId: string; subjectId: string; weekStartDate: string; content: WeeklyPlanContent }[]
): Promise<void> {
  const batch = writeBatch(db);
  for (const w of writes) {
    const id = weeklyPlanId(w.timetableSlotId, w.weekStartDate);
    const ref = doc(db, COL, id);
    batch.set(
      ref,
      {
        ownerId,
        schoolYearId,
        timetableSlotId: w.timetableSlotId,
        subjectId: w.subjectId,
        weekStartDate: w.weekStartDate,
        title: w.content.title,
        description: w.content.description,
        driveAttachments: w.content.driveAttachments,
        rubric: w.content.rubric,
        rubricId: w.content.rubricId ?? deleteField(),
        evaluate: w.content.evaluate ?? deleteField(),
        aiObjectives: w.content.aiObjectives ?? deleteField(),
        curriculumItemIds: w.content.curriculumItemIds ?? deleteField(),
        referenceImageUrl: w.content.referenceImageUrl ?? deleteField(),
        saLabel: w.content.saLabel ?? deleteField(),
        saId: w.content.saId ?? deleteField(),
        postClassEvaluation: deleteField(),
        aiSuggestions: deleteField(),
        status: 'planned',
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
  }
  await batch.commit();
}
