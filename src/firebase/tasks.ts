import {
  collection,
  doc,
  addDoc,
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
import type { TeacherTask } from '@/types';

const COL = 'teacherTasks';

export function subscribeTasks(
  ownerId: string,
  schoolYearId: string,
  callback: (tasks: TeacherTask[]) => void
): Unsubscribe {
  const q = query(
    collection(db, COL),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId)
  );
  return onSnapshot(q, (snap) => {
    const tasks = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        ownerId: data.ownerId,
        schoolYearId: data.schoolYearId,
        title: data.title,
        subjectId: data.subjectId,
        dueDate: data.dueDate,
        done: !!data.done,
        completedAt: data.completedAt?.toMillis ? data.completedAt.toMillis() : data.completedAt,
        createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : Date.now(),
        updatedAt: data.updatedAt?.toMillis ? data.updatedAt.toMillis() : Date.now(),
      } as TeacherTask;
    });
    callback(tasks);
  });
}

export async function createTask(
  ownerId: string,
  schoolYearId: string,
  data: { title: string; subjectId?: string; dueDate?: string }
): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ownerId,
    schoolYearId,
    title: data.title,
    ...(data.subjectId ? { subjectId: data.subjectId } : {}),
    ...(data.dueDate ? { dueDate: data.dueDate } : {}),
    done: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateTask(
  taskId: string,
  data: { title?: string; subjectId?: string | null; dueDate?: string | null }
): Promise<void> {
  const payload: Record<string, unknown> = { updatedAt: serverTimestamp() };
  if (data.title !== undefined) payload.title = data.title;
  if (data.subjectId !== undefined) payload.subjectId = data.subjectId === null ? deleteField() : data.subjectId;
  if (data.dueDate !== undefined) payload.dueDate = data.dueDate === null ? deleteField() : data.dueDate;
  await updateDoc(doc(db, COL, taskId), payload);
}

/** Marca/desmarca una única tarea como hecha (la mueve dentro/fuera del archivo de "tareas realizadas"). */
export async function setTaskDone(taskId: string, done: boolean): Promise<void> {
  await updateDoc(doc(db, COL, taskId), {
    done,
    completedAt: done ? serverTimestamp() : deleteField(),
    updatedAt: serverTimestamp(),
  });
}

/** Igual que setTaskDone pero para varias tareas a la vez (recuperar todas / deshacer recuperar todas). */
export async function setTasksDoneBatch(taskIds: string[], done: boolean): Promise<void> {
  if (taskIds.length === 0) return;
  const batch = writeBatch(db);
  taskIds.forEach((id) => {
    batch.update(doc(db, COL, id), {
      done,
      completedAt: done ? serverTimestamp() : deleteField(),
      updatedAt: serverTimestamp(),
    });
  });
  await batch.commit();
}

export async function deleteTask(taskId: string): Promise<void> {
  await deleteDoc(doc(db, COL, taskId));
}

/** Elimina permanentemente varias tareas (usado por "eliminar todas permanentemente" en el archivo). */
export async function deleteTasksBatch(taskIds: string[]): Promise<void> {
  if (taskIds.length === 0) return;
  const batch = writeBatch(db);
  taskIds.forEach((id) => batch.delete(doc(db, COL, id)));
  await batch.commit();
}
