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
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { Rubric, GradeEntry, Evaluation } from '@/types';

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

/** Guarda o actualiza la nota de un alumno para una evaluación y rúbrica. */
export async function upsertGradeEntry(
  ownerId: string,
  schoolYearId: string,
  data: {
    studentId: string;
    subjectId: string;
    rubricId: string;
    evaluation: Evaluation;
    scores: Record<string, number>;
    finalScore: number;
    notes?: string;
  }
): Promise<void> {
  // Buscamos si ya existe una entrada para este alumno/asignatura/evaluación/rúbrica
  const q = query(
    collection(db, GRADES_COL),
    where('ownerId', '==', ownerId),
    where('studentId', '==', data.studentId),
    where('subjectId', '==', data.subjectId),
    where('evaluation', '==', data.evaluation),
    where('rubricId', '==', data.rubricId)
  );

  const { getDocs } = await import('firebase/firestore');
  const snap = await getDocs(q);

  const payload = {
    ...data,
    ownerId,
    schoolYearId,
    updatedAt: serverTimestamp(),
  };

  if (!snap.empty) {
    await updateDoc(snap.docs[0].ref, payload);
  } else {
    await addDoc(collection(db, GRADES_COL), payload);
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
