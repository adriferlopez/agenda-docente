import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteField,
  query,
  where,
  onSnapshot,
  getDocs,
  serverTimestamp,
  writeBatch,
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
        curriculumAreas: data.curriculumAreas,
        order: data.order,
        hidden: data.hidden,
        pgaObjectives: data.pgaObjectives,
        createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : Date.now(),
      } as Subject;
    });
    callback(subjects);
  });
}

export async function createSubject(
  ownerId: string,
  schoolYearId: string,
  data: {
    name: string;
    courseLevel?: string;
    group: string;
    studentGroupId?: string;
    color: SubjectColor;
    curriculumAreas?: string[];
    pgaObjectives?: string;
  }
): Promise<string> {
  const { courseLevel, studentGroupId, curriculumAreas, pgaObjectives, ...rest } = data;
  const ref = await addDoc(collection(db, COL), {
    ownerId,
    schoolYearId,
    ...rest,
    ...(courseLevel ? { courseLevel } : {}),
    ...(studentGroupId ? { studentGroupId } : {}),
    ...(curriculumAreas && curriculumAreas.length > 0 ? { curriculumAreas } : {}),
    ...(pgaObjectives ? { pgaObjectives } : {}),
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateSubjectStudentGroup(subjectId: string, studentGroupId: string | null): Promise<void> {
  await updateDoc(doc(db, COL, subjectId), {
    studentGroupId: studentGroupId ?? deleteField(),
  });
}

export async function updateSubject(
  subjectId: string,
  data: Partial<Pick<Subject, 'name' | 'courseLevel' | 'group' | 'color' | 'studentGroupId' | 'curriculumAreas' | 'hidden' | 'pgaObjectives'>>
): Promise<void> {
  await updateDoc(doc(db, COL, subjectId), data);
}

/** Oculta o vuelve a mostrar una asignatura en el listado de Asignaturas. */
export async function setSubjectHidden(subjectId: string, hidden: boolean): Promise<void> {
  await updateDoc(doc(db, COL, subjectId), { hidden });
}

/**
 * Elimina la asignatura y, en cascada, todo lo que quedaría huérfano
 * apuntando a ella: las franjas del horario (timetableSlots) que la tenían
 * asignada y las programaciones semanales (weeklyPlans) de esas franjas.
 * Sin esto, esas franjas se quedaban en Firestore con un subjectId que ya
 * no existe, y tanto Horario como el widget "Horario de hoy" las seguían
 * mostrando como una casilla rota (sin color de asignatura, con el texto de
 * "Sin clase" aunque en teoría había algo programado ahí).
 */
export async function deleteSubject(subjectId: string, ownerId: string, schoolYearId: string): Promise<void> {
  const slotsQuery = query(
    collection(db, 'timetableSlots'),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId),
    where('subjectId', '==', subjectId)
  );
  const plansQuery = query(
    collection(db, 'weeklyPlans'),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId),
    where('subjectId', '==', subjectId)
  );
  const [slotsSnap, plansSnap] = await Promise.all([getDocs(slotsQuery), getDocs(plansQuery)]);

  const batch = writeBatch(db);
  batch.delete(doc(db, COL, subjectId));
  slotsSnap.forEach((d) => batch.delete(d.ref));
  plansSnap.forEach((d) => batch.delete(d.ref));
  await batch.commit();
}

// Guarda el orden manual (arrastrar y soltar) de una lista de asignaturas.
// Recibe los ids ya en el orden deseado y les asigna order = 0, 1, 2...
export async function updateSubjectsOrder(subjectIds: string[]): Promise<void> {
  const batch = writeBatch(db);
  subjectIds.forEach((id, index) => {
    batch.update(doc(db, COL, id), { order: index });
  });
  await batch.commit();
}
