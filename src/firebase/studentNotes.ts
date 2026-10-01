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
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { StudentNote } from '@/types';
import { encryptNoteField, decryptNoteField } from '@/crypto/notesEncryption';

const COL = 'studentNotes';

/**
 * Anotaciones libres de un alumno/a (apartado Alumnat). No están ligadas a
 * ninguna asignatura: son observaciones/seguimiento del docente sobre la
 * persona, ordenadas de más reciente a más antigua.
 *
 * El contenido (`textCiphertext`/`categoryCiphertext`) viaja y se guarda
 * siempre cifrado de extremo a extremo (ver src/crypto/notesEncryption.ts):
 * esta capa de Firebase nunca ve ni maneja texto en claro, solo bytes
 * cifrados que recibe ya listos del llamante.
 */
export function subscribeStudentNotes(
  ownerId: string,
  studentId: string,
  callback: (notes: StudentNote[]) => void
): Unsubscribe {
  const q = query(collection(db, COL), where('ownerId', '==', ownerId), where('studentId', '==', studentId));
  return onSnapshot(q, (snap) => {
    const notes = snap.docs
      .map((d) => ({ id: d.id, ...d.data() } as StudentNote))
      .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
    callback(notes);
  });
}

export async function addStudentNote(
  ownerId: string,
  schoolYearId: string,
  studentId: string,
  dek: CryptoKey,
  text: string,
  category?: string
): Promise<string> {
  const textField = await encryptNoteField(dek, text);
  const categoryField = category ? await encryptNoteField(dek, category) : null;
  const ref = await addDoc(collection(db, COL), {
    ownerId,
    schoolYearId,
    studentId,
    textCiphertext: textField.ciphertext,
    textIv: textField.iv,
    ...(categoryField ? { categoryCiphertext: categoryField.ciphertext, categoryIv: categoryField.iv } : {}),
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateStudentNote(
  noteId: string,
  dek: CryptoKey,
  text: string,
  category?: string
): Promise<void> {
  const textField = await encryptNoteField(dek, text);
  const categoryField = category ? await encryptNoteField(dek, category) : null;
  await updateDoc(doc(db, COL, noteId), {
    textCiphertext: textField.ciphertext,
    textIv: textField.iv,
    categoryCiphertext: categoryField ? categoryField.ciphertext : deleteField(),
    categoryIv: categoryField ? categoryField.iv : deleteField(),
    // Si la nota venía de antes de activar el cifrado (ver
    // decryptStudentNote), al guardarla se limpian ya sus campos en claro.
    text: deleteField(),
    category: deleteField(),
  });
}

export async function deleteStudentNote(noteId: string): Promise<void> {
  await deleteDoc(doc(db, COL, noteId));
}

/**
 * Descifra una nota para poder mostrarla/editarla. Las notas creadas antes
 * de activar el cifrado (sin `textCiphertext`) todavía tienen el texto en
 * claro en `text`/`category`: se devuelven tal cual, pero marcadas como
 * `legacy` para que el llamante pueda decidir recifrarlas con la DEK actual
 * en cuanto tenga ocasión (ver migrateLegacyStudentNote).
 */
export async function decryptStudentNote(
  dek: CryptoKey,
  note: StudentNote
): Promise<{ text: string; category?: string; legacy: boolean }> {
  if (!note.textCiphertext || !note.textIv) {
    return { text: note.text ?? '', category: note.category, legacy: true };
  }
  const text = await decryptNoteField(dek, { ciphertext: note.textCiphertext, iv: note.textIv });
  const category =
    note.categoryCiphertext && note.categoryIv
      ? await decryptNoteField(dek, { ciphertext: note.categoryCiphertext, iv: note.categoryIv })
      : undefined;
  return { text, category, legacy: false };
}

/** Recifra en Firestore una nota antigua (texto en claro) con la DEK actual del docente. */
export async function migrateLegacyStudentNote(noteId: string, dek: CryptoKey, text: string, category?: string): Promise<void> {
  await updateStudentNote(noteId, dek, text, category);
}
