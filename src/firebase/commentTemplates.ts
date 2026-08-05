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
import type { CommentTemplate } from '@/types';

const COL = 'commentTemplates';

export function subscribeCommentTemplates(
  ownerId: string,
  subjectId: string,
  callback: (templates: CommentTemplate[]) => void
): Unsubscribe {
  const q = query(collection(db, COL), where('ownerId', '==', ownerId), where('subjectId', '==', subjectId));
  return onSnapshot(q, (snap) => {
    const templates = snap.docs
      .map((d) => ({ id: d.id, ...d.data() } as CommentTemplate))
      .sort((a, b) => a.title.localeCompare(b.title));
    callback(templates);
  });
}

export async function createCommentTemplate(
  ownerId: string,
  subjectId: string,
  data: { title: string; text: string }
): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ownerId,
    subjectId,
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateCommentTemplate(
  id: string,
  data: Partial<Pick<CommentTemplate, 'title' | 'text'>>
): Promise<void> {
  await updateDoc(doc(db, COL, id), data);
}

export async function deleteCommentTemplate(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
