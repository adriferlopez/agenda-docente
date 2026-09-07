import {
  collection,
  doc,
  addDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { MuralFolder, PastelFolderColor } from '@/types';

const COL = 'muralFolders';

export function subscribeMuralFolders(
  ownerId: string,
  schoolYearId: string,
  callback: (folders: MuralFolder[]) => void
): Unsubscribe {
  const q = query(
    collection(db, COL),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId)
  );
  return onSnapshot(
    q,
    (snap) => {
      const folders = snap.docs
        .map((d) => ({ id: d.id, ...d.data() } as MuralFolder))
        .sort((a, b) => {
          const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
          const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
          if (orderA !== orderB) return orderA - orderB;
          return a.createdAt - b.createdAt;
        });
      callback(folders);
    },
    (err) => console.error('subscribeMuralFolders', err)
  );
}

export async function createMuralFolder(
  ownerId: string,
  schoolYearId: string,
  data: { name: string; color: PastelFolderColor }
): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ownerId,
    schoolYearId,
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateMuralFolder(
  folderId: string,
  data: Partial<Pick<MuralFolder, 'name' | 'color'>>
): Promise<void> {
  await updateDoc(doc(db, COL, folderId), data);
}

/** Elimina una carpeta; los items del Mural que estaban en ella quedan "sin carpeta"
 * (no se borran, solo se les quita el folderId). */
export async function deleteMuralFolder(folderId: string, itemIdsInFolder: string[]): Promise<void> {
  const batch = writeBatch(db);
  itemIdsInFolder.forEach((id) => batch.update(doc(db, 'muralItems', id), { folderId: null }));
  batch.delete(doc(db, COL, folderId));
  await batch.commit();
}

export async function updateMuralFoldersOrder(folderIds: string[]): Promise<void> {
  const batch = writeBatch(db);
  folderIds.forEach((id, index) => {
    batch.update(doc(db, COL, id), { order: index });
  });
  await batch.commit();
}
