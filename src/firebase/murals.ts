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
import type { MuralItem } from '@/types';

const COL = 'muralItems';

export function subscribeMuralItems(
  ownerId: string,
  schoolYearId: string,
  callback: (items: MuralItem[]) => void
): Unsubscribe {
  const q = query(collection(db, COL), where('ownerId', '==', ownerId), where('schoolYearId', '==', schoolYearId));
  return onSnapshot(
    q,
    (snap) => {
      const items = snap.docs
        .map((d) => {
          const data = d.data();
          return {
            id: d.id,
            ownerId: data.ownerId,
            schoolYearId: data.schoolYearId,
            title: data.title,
            note: data.note,
            linkUrl: data.linkUrl,
            folderId: data.folderId ?? undefined,
            favorite: data.favorite ?? false,
            favoriteOrder: data.favoriteOrder,
            createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : Date.now(),
            updatedAt: data.updatedAt?.toMillis ? data.updatedAt.toMillis() : Date.now(),
          } as MuralItem;
        })
        .sort((a, b) => b.createdAt - a.createdAt);
      callback(items);
    },
    (err) => console.error('subscribeMuralItems', err)
  );
}

/** Suscripción ligera solo a los favoritos, ordenados para el widget de Inicio. */
export function subscribeFavoriteMuralItems(
  ownerId: string,
  schoolYearId: string,
  callback: (items: MuralItem[]) => void
): Unsubscribe {
  return subscribeMuralItems(ownerId, schoolYearId, (all) => {
    const favorites = all
      .filter((i) => i.favorite)
      .sort((a, b) => {
        const orderA = a.favoriteOrder ?? Number.MAX_SAFE_INTEGER;
        const orderB = b.favoriteOrder ?? Number.MAX_SAFE_INTEGER;
        if (orderA !== orderB) return orderA - orderB;
        return a.createdAt - b.createdAt;
      });
    callback(favorites);
  });
}

export async function createMuralItem(
  ownerId: string,
  schoolYearId: string,
  data: { title: string; note?: string; linkUrl?: string; folderId?: string }
): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ownerId,
    schoolYearId,
    title: data.title,
    ...(data.note ? { note: data.note } : {}),
    ...(data.linkUrl ? { linkUrl: data.linkUrl } : {}),
    ...(data.folderId ? { folderId: data.folderId } : {}),
    favorite: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateMuralItem(
  itemId: string,
  data: Partial<Pick<MuralItem, 'title' | 'note' | 'linkUrl'>> & { folderId?: string | null }
): Promise<void> {
  await updateDoc(doc(db, COL, itemId), {
    ...data,
    ...(data.note === '' ? { note: deleteField() } : {}),
    ...(data.linkUrl === '' ? { linkUrl: deleteField() } : {}),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteMuralItem(itemId: string): Promise<void> {
  await deleteDoc(doc(db, COL, itemId));
}

/**
 * Marca/desmarca un item como favorito (aparece en el widget de Inicio).
 * `nextOrder` se pasa al marcar como favorito (normalmente
 * favoritos.length, para que aparezca el último); al desmarcar se limpia
 * el campo de orden.
 */
export async function setMuralFavorite(itemId: string, favorite: boolean, nextOrder?: number): Promise<void> {
  await updateDoc(doc(db, COL, itemId), {
    favorite,
    favoriteOrder: favorite ? (nextOrder ?? Date.now()) : deleteField(),
    updatedAt: serverTimestamp(),
  });
}

/** Reordena los favoritos (arrastrar y soltar, o flechas) en el widget de Inicio. */
export async function updateMuralFavoritesOrder(itemIds: string[]): Promise<void> {
  const batch = writeBatch(db);
  itemIds.forEach((id, index) => {
    batch.update(doc(db, COL, id), { favoriteOrder: index });
  });
  await batch.commit();
}
