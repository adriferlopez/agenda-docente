import { doc, setDoc, getDoc, onSnapshot, serverTimestamp, type Unsubscribe } from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { GradeCommentTemplate } from '@/types';

const COL = 'gradeCommentTemplates';

/** Id del documento de una plantilla por asignatura + trimestre. */
function termDocId(subjectId: string, termId: string): string {
  return `${subjectId}__${termId}`;
}

/**
 * Una plantilla de nota por asignatura Y trimestre (cada trimestre puede
 * tener frases distintas). Documentos antiguos (de antes de que existiera
 * esta separación) se guardaron con el id = subjectId a secas, sin
 * trimestre — los tratamos como plantilla "de partida": si el trimestre
 * pedido todavía no tiene su propia plantilla, se usa esa como punto de
 * arranque (sin sobreescribirla) hasta que el docente guarde algo en este
 * trimestre, momento en el que ya queda independiente.
 */
export function subscribeGradeCommentTemplate(
  ownerId: string,
  subjectId: string,
  termId: string,
  callback: (template: GradeCommentTemplate | null) => void
): Unsubscribe {
  const newId = termDocId(subjectId, termId);
  let termData: GradeCommentTemplate | null | undefined;
  let legacyData: GradeCommentTemplate | null | undefined;

  function emit() {
    if (termData === undefined || legacyData === undefined) return;
    if (termData) {
      callback(termData);
    } else if (legacyData) {
      callback({ ...legacyData, id: newId });
    } else {
      callback(null);
    }
  }

  const unsubTerm = onSnapshot(
    doc(db, COL, newId),
    (snap) => {
      termData = snap.exists() && snap.data().ownerId === ownerId
        ? ({ id: snap.id, ...snap.data() } as GradeCommentTemplate)
        : null;
      emit();
    },
    () => {
      termData = null;
      emit();
    }
  );
  const unsubLegacy = onSnapshot(
    doc(db, COL, subjectId),
    (snap) => {
      legacyData = snap.exists() && snap.data().ownerId === ownerId
        ? ({ id: snap.id, ...snap.data() } as GradeCommentTemplate)
        : null;
      emit();
    },
    () => {
      legacyData = null;
      emit();
    }
  );

  return () => {
    unsubTerm();
    unsubLegacy();
  };
}

/** Lectura puntual (no en vivo), usada para generar el comentario de un alumno al vuelo. */
export async function getGradeCommentTemplateOnce(
  subjectId: string,
  termId: string
): Promise<GradeCommentTemplate | null> {
  const newId = termDocId(subjectId, termId);
  const termSnap = await getDoc(doc(db, COL, newId));
  if (termSnap.exists()) {
    return { id: termSnap.id, ...termSnap.data() } as GradeCommentTemplate;
  }
  const legacySnap = await getDoc(doc(db, COL, subjectId));
  if (legacySnap.exists()) {
    return { ...(legacySnap.data() as GradeCommentTemplate), id: newId };
  }
  return null;
}

/**
 * Guarda parcialmente la plantilla (merge): las bandas de frases (desde
 * Comentarios) y las CE prioritarias para Profi (desde Notas) se editan en
 * dos sitios distintos de la app, así que un guardado nunca debe borrar lo
 * que haya escrito el otro. Siempre se guarda en el documento propio del
 * trimestre (nunca en el antiguo documento "general").
 */
export async function setGradeCommentTemplate(
  ownerId: string,
  subjectId: string,
  termId: string,
  data: Partial<Pick<GradeCommentTemplate, 'mode' | 'bands' | 'profiCeIds'>>
): Promise<void> {
  await setDoc(
    doc(db, COL, termDocId(subjectId, termId)),
    {
      ownerId,
      subjectId,
      termId,
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Vacía la plantilla de este trimestre para "empezar de nuevo". No borramos
 * el documento (eso dejaría que, si existe una plantilla antigua "general"
 * sin trimestre, volviera a aparecer como punto de partida) — en su lugar
 * lo sobreescribimos entero con bandas vacías, así este trimestre queda
 * realmente en blanco pase lo que pase con el documento antiguo.
 */
export async function clearGradeCommentTemplate(
  ownerId: string,
  subjectId: string,
  termId: string
): Promise<void> {
  await setDoc(doc(db, COL, termDocId(subjectId, termId)), {
    ownerId,
    subjectId,
    termId,
    mode: 'range',
    bands: [],
    profiCeIds: [],
    updatedAt: serverTimestamp(),
  });
}
