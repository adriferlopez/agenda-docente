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
import type { MeetingFolder, PastelFolderColor } from '@/types';

const COL = 'meetingFolders';

export function subscribeMeetingFolders(
  ownerId: string,
  schoolYearId: string,
  callback: (folders: MeetingFolder[]) => void
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
        .map((d) => ({ id: d.id, ...d.data() } as MeetingFolder))
        .sort((a, b) => {
          const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
          const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
          if (orderA !== orderB) return orderA - orderB;
          return a.createdAt - b.createdAt;
        });
      callback(folders);
    },
    // Si el listener se abrió antes de que las reglas de Firestore
    // incluyeran esta colección (p.ej. justo después de desplegar
    // firestore.rules por primera vez), Firestore lo cierra con un error de
    // permisos y deja de entregar actualizaciones en vivo hasta que se
    // vuelve a suscribir (recargar la página). Se registra el error para
    // poder diagnosticarlo si vuelve a pasar.
    (err) => console.error('subscribeMeetingFolders', err)
  );
}

export async function createMeetingFolder(
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

export async function updateMeetingFolder(
  folderId: string,
  data: Partial<Pick<MeetingFolder, 'name' | 'color'>>
): Promise<void> {
  await updateDoc(doc(db, COL, folderId), data);
}

/** Elimina una carpeta; las reuniones que estaban en ella quedan "sin carpeta"
 * (no se borran, solo se les quita el folderId). */
export async function deleteMeetingFolder(folderId: string, meetingIdsInFolder: string[]): Promise<void> {
  const batch = writeBatch(db);
  meetingIdsInFolder.forEach((id) => batch.update(doc(db, 'meetings', id), { folderId: null }));
  batch.delete(doc(db, COL, folderId));
  await batch.commit();
}

export async function updateMeetingFoldersOrder(folderIds: string[]): Promise<void> {
  const batch = writeBatch(db);
  folderIds.forEach((id, index) => {
    batch.update(doc(db, COL, id), { order: index });
  });
  await batch.commit();
}
