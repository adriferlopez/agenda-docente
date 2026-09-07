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
import type { ChecklistBoard, ChecklistItem } from '@/types';

const COL = 'checklistBoards';

/**
 * Listas de verificación de un grupo de alumnos (apartado Alumnat /
 * seguimiento de tutoría): cada "board" tiene sus propias columnas (items)
 * y las casillas marcadas por alumno.
 */
export function subscribeChecklistBoards(
  ownerId: string,
  groupId: string,
  callback: (boards: ChecklistBoard[]) => void
): Unsubscribe {
  const q = query(collection(db, COL), where('ownerId', '==', ownerId), where('groupId', '==', groupId));
  return onSnapshot(q, (snap) => {
    const boards = snap.docs
      .map((d) => ({ id: d.id, ...d.data() } as ChecklistBoard))
      .sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0));
    callback(boards);
  });
}

function makeItems(labels: string[]): ChecklistItem[] {
  return labels
    .map((label) => label.trim())
    .filter(Boolean)
    .map((label) => ({ id: crypto.randomUUID(), label }));
}

/**
 * Crea una lista nueva. `itemLabels` puede tener uno o varios elementos: el
 * docente puede añadir las columnas una a una, o pegar varias líneas de
 * golpe (igual que al pegar un listado de alumnos) para crearlas todas a
 * la vez.
 */
export async function createChecklistBoard(
  ownerId: string,
  schoolYearId: string,
  groupId: string,
  name: string,
  itemLabels: string[]
): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ownerId,
    schoolYearId,
    groupId,
    name,
    items: makeItems(itemLabels),
    checks: {},
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function renameChecklistBoard(boardId: string, name: string): Promise<void> {
  await updateDoc(doc(db, COL, boardId), { name, updatedAt: serverTimestamp() });
}

export async function deleteChecklistBoard(boardId: string): Promise<void> {
  await deleteDoc(doc(db, COL, boardId));
}

/** Añade una o varias columnas nuevas (una a una o pegando varias líneas) a una lista ya creada. */
export async function addChecklistItems(boardId: string, existingItems: ChecklistItem[], newLabels: string[]): Promise<void> {
  const newItems = makeItems(newLabels);
  if (newItems.length === 0) return;
  await updateDoc(doc(db, COL, boardId), { items: [...existingItems, ...newItems], updatedAt: serverTimestamp() });
}

export async function renameChecklistItem(boardId: string, items: ChecklistItem[], itemId: string, label: string): Promise<void> {
  const next = items.map((it) => (it.id === itemId ? { ...it, label } : it));
  await updateDoc(doc(db, COL, boardId), { items: next, updatedAt: serverTimestamp() });
}

export async function removeChecklistItem(boardId: string, items: ChecklistItem[], itemId: string): Promise<void> {
  const next = items.filter((it) => it.id !== itemId);
  await updateDoc(doc(db, COL, boardId), { items: next, updatedAt: serverTimestamp() });
}

/** Marca/desmarca la casilla de un alumno en un item concreto (escritura de un solo campo anidado). */
export async function setChecklistCheck(boardId: string, studentId: string, itemId: string, checked: boolean): Promise<void> {
  await updateDoc(doc(db, COL, boardId), {
    [`checks.${studentId}.${itemId}`]: checked,
    updatedAt: serverTimestamp(),
  });
}
