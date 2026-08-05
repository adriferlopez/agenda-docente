import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  writeBatch,
  onSnapshot,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { CurriculumItem } from '@/types';

const COL = 'curriculumItems';

export function subscribeCurriculumItems(
  ownerId: string,
  subjectId: string,
  callback: (items: CurriculumItem[]) => void
): Unsubscribe {
  const q = query(collection(db, COL), where('ownerId', '==', ownerId), where('subjectId', '==', subjectId));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as CurriculumItem)));
  });
}

export async function addCurriculumItem(
  ownerId: string,
  subjectId: string,
  data: { courseLevel: string; code: string; block?: string; description: string }
): Promise<string> {
  const ref = await addDoc(collection(db, COL), { ownerId, subjectId, ...data });
  return ref.id;
}

/**
 * Reemplaza todos los saberes de una asignatura por los importados desde Excel.
 * Se hace en lotes de 450 para respetar el límite de 500 escrituras por batch.
 */
export async function replaceCurriculumItems(
  ownerId: string,
  subjectId: string,
  items: { courseLevel: string; code: string; block?: string; description: string }[]
): Promise<void> {
  // Borrar los existentes
  const existing = await getDocs(
    query(collection(db, COL), where('ownerId', '==', ownerId), where('subjectId', '==', subjectId))
  );

  const chunks: typeof items[] = [];
  const docsToDelete = existing.docs;

  // Borrado por lotes
  for (let i = 0; i < docsToDelete.length; i += 450) {
    const batch = writeBatch(db);
    docsToDelete.slice(i, i + 450).forEach((d) => batch.delete(d.ref));
    await batch.commit();
  }

  // Inserción por lotes
  for (let i = 0; i < items.length; i += 450) {
    chunks.push(items.slice(i, i + 450));
  }
  for (const chunk of chunks) {
    const batch = writeBatch(db);
    chunk.forEach((item) => {
      const ref = doc(collection(db, COL));
      batch.set(ref, { ownerId, subjectId, ...item });
    });
    await batch.commit();
  }
}

export async function deleteCurriculumItem(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
