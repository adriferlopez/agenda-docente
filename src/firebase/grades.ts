import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  getDocs,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { Rubric, GradeEntry, Evaluation, QualitativeLevel, GradeEntryStatus } from '@/types';

const RUBRICS_COL = 'rubrics';
const GRADES_COL = 'gradeEntries';

// ---------------------------------------------------------------------
// Rúbricas propias del docente
// ---------------------------------------------------------------------

export function subscribeRubrics(
  ownerId: string,
  schoolYearId: string,
  callback: (rubrics: Rubric[]) => void
): Unsubscribe {
  const q = query(
    collection(db, RUBRICS_COL),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId)
  );
  return onSnapshot(q, (snap) => {
    const rubrics = snap.docs
      .map((d) => ({ id: d.id, ...d.data() } as Rubric))
      .sort((a, b) => a.name.localeCompare(b.name));
    callback(rubrics);
  });
}

/** Lectura puntual (no en vivo) de todas las rúbricas del docente en un curso. */
export async function getRubricsOnce(ownerId: string, schoolYearId: string): Promise<Rubric[]> {
  const q = query(
    collection(db, RUBRICS_COL),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Rubric));
}

export async function createRubric(
  ownerId: string,
  schoolYearId: string,
  data: Omit<Rubric, 'id' | 'ownerId' | 'schoolYearId' | 'isLomloe' | 'createdAt'>
): Promise<string> {
  const ref = await addDoc(collection(db, RUBRICS_COL), {
    ...data,
    ownerId,
    schoolYearId,
    isLomloe: false,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateRubric(
  rubricId: string,
  data: Partial<Pick<Rubric, 'name' | 'criteria' | 'subjectId'>>
): Promise<void> {
  await updateDoc(doc(db, RUBRICS_COL, rubricId), data);
}

export async function deleteRubric(rubricId: string): Promise<void> {
  await deleteDoc(doc(db, RUBRICS_COL, rubricId));
}

// ---------------------------------------------------------------------
// Notas (GradeEntry)
// ---------------------------------------------------------------------

export function subscribeGradeEntries(
  ownerId: string,
  schoolYearId: string,
  subjectId: string,
  evaluation: Evaluation,
  callback: (entries: GradeEntry[]) => void
): Unsubscribe {
  const q = query(
    collection(db, GRADES_COL),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId),
    where('subjectId', '==', subjectId),
    where('evaluation', '==', evaluation)
  );
  return onSnapshot(q, (snap) => {
    const entries = snap.docs.map((d) => ({ id: d.id, ...d.data() } as GradeEntry));
    callback(entries);
  });
}

/** Lectura puntual (no en vivo), usada para calcular la nota de otra asignatura al vuelo. */
export async function getGradeEntriesOnce(
  ownerId: string,
  schoolYearId: string,
  subjectId: string,
  evaluation: Evaluation
): Promise<GradeEntry[]> {
  const q = query(
    collection(db, GRADES_COL),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId),
    where('subjectId', '==', subjectId),
    where('evaluation', '==', evaluation)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as GradeEntry));
}

/** Calcula la nota final ponderada a partir de las puntuaciones por criterio. */
export function calculateFinalScore(
  scores: Record<string, number>,
  criteria: Rubric['criteria']
): number {
  let total = 0;
  let totalWeight = 0;
  for (const criterion of criteria) {
    const score = scores[criterion.id];
    if (score !== undefined) {
      total += score * (criterion.weight / 100);
      totalWeight += criterion.weight / 100;
    }
  }
  if (totalWeight === 0) return 0;
  return Math.round((total / totalWeight) * 100) / 100;
}

/** Devuelve la etiqueta descriptiva según la nota numérica. */
export function gradeLabel(score: number): string {
  if (score < 5) return 'Insuficiente';
  if (score < 6) return 'Suficiente';
  if (score < 7) return 'Bien';
  if (score < 9) return 'Notable';
  return 'Excelente';
}

/**
 * Guarda o actualiza la nota de un alumno para una evaluación y rúbrica.
 * Si se indica `activityId` (nota ligada a una actividad/columna concreta
 * de la libreta), ese es el identificador real de la entrada, porque una
 * misma rúbrica se puede reutilizar en varias actividades. Si no se indica
 * (uso legacy), se identifica por rubricId como antes.
 */
export async function upsertGradeEntry(
  ownerId: string,
  schoolYearId: string,
  data: {
    studentId: string;
    subjectId: string;
    rubricId: string;
    activityId?: string;
    evaluation: Evaluation;
    scores: Record<string, number>;
    finalScore: number;
    qualitativeLevel?: QualitativeLevel;
    // Falta justificada/no justificada o "no hizo la actividad". Si no se
    // indica (undefined), la entrada es una nota normal.
    status?: GradeEntryStatus;
    notes?: string;
  }
): Promise<void> {
  // Buscamos si ya existe una entrada para este alumno/asignatura/evaluación
  // y, si aplica, actividad concreta.
  const conditions = [
    where('ownerId', '==', ownerId),
    where('studentId', '==', data.studentId),
    where('subjectId', '==', data.subjectId),
    where('evaluation', '==', data.evaluation),
    data.activityId ? where('activityId', '==', data.activityId) : where('rubricId', '==', data.rubricId),
  ];
  const q = query(collection(db, GRADES_COL), ...conditions);
  const snap = await getDocs(q);

  const { status, ...rest } = data;

  if (!snap.empty) {
    // updateDoc admite deleteField() para borrar el campo si el docente
    // vuelve a marcar la nota como normal después de haberla marcado como
    // falta/no hecha.
    await updateDoc(snap.docs[0].ref, {
      ...rest,
      ownerId,
      schoolYearId,
      status: status ?? deleteField(),
      updatedAt: serverTimestamp(),
    });
  } else {
    // addDoc no admite deleteField() en un documento nuevo: si no hay
    // status, simplemente no se incluye el campo.
    await addDoc(collection(db, GRADES_COL), {
      ...rest,
      ownerId,
      schoolYearId,
      ...(status ? { status } : {}),
      updatedAt: serverTimestamp(),
    });
  }
}

/** Guarda notas de múltiples alumnos en batch. */
export async function saveGradesBatch(
  ownerId: string,
  schoolYearId: string,
  entries: Array<{
    studentId: string;
    subjectId: string;
    rubricId: string;
    evaluation: Evaluation;
    scores: Record<string, number>;
    finalScore: number;
    notes?: string;
  }>
): Promise<void> {
  // Para simplificar usamos upsertGradeEntry en paralelo
  await Promise.all(
    entries.map((e) => upsertGradeEntry(ownerId, schoolYearId, e))
  );
}
