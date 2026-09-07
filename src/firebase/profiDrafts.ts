import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { PlannedUnitSession } from '@/services/ai';

const COL = 'profiUnitDrafts';

/**
 * Borrador de una planificación de unidad (Situación de Aprendizaje) generada
 * por Profi, guardado automáticamente mientras el docente la revisa/edita,
 * ANTES de "Añadir a la programación semanal". Permite cerrar Profi a medias
 * y retomarlo más tarde (en el mismo dispositivo o en otro) sin perder lo
 * generado ni los cambios hechos. Se borra en cuanto se incorpora a la
 * programación semanal, porque a partir de ahí ya vive como Situación de
 * Aprendizaje real y actividades semanales, no como borrador.
 */
export interface ProfiUnitDraft {
  id: string;
  ownerId: string;
  schoolYearId: string;
  subjectId: string;
  saId: string;
  unitLabel: string;
  sessions: PlannedUnitSession[];
  rubricCopyText: string;
  sessionCount: number;
  ceIds: string[];
  howToWorkByCe: Record<string, string>;
  contentsToWorkOn: string;
  threadIdea: string;
  methodologyIds: string[];
  customMethodology: string;
  materialIds: string[];
  customMaterial: string;
  finalProduct: string;
  hasExam: boolean;
  groupNotes: string;
  startDate: string;
  createdAt: number;
  updatedAt: number;
}

export type ProfiUnitDraftInput = Omit<ProfiUnitDraft, 'id' | 'ownerId' | 'schoolYearId' | 'createdAt' | 'updatedAt'>;

export function subscribeProfiUnitDrafts(
  ownerId: string,
  schoolYearId: string,
  callback: (drafts: ProfiUnitDraft[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(
    collection(db, COL),
    where('ownerId', '==', ownerId),
    where('schoolYearId', '==', schoolYearId)
  );
  // onSnapshot necesita su callback de error explícito: sin él, un permiso
  // de Firestore denegado (p.ej. si las reglas de "profiUnitDrafts" no
  // están desplegadas) falla en silencio y "drafts" se queda vacío para
  // siempre, sin que el docente vea ningún aviso ni el botón "Historial"
  // llegue a aparecer.
  return onSnapshot(
    q,
    (snap) => {
      const drafts = snap.docs
        .map((d) => ({ id: d.id, ...d.data() } as ProfiUnitDraft))
        .sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
      callback(drafts);
    },
    (err) => {
      console.error('Error al leer los borradores de Profi:', err);
      onError?.(err instanceof Error ? err : new Error(String(err)));
    }
  );
}

/** Crea el borrador si `draftId` es null, o lo actualiza (merge) si ya existe. Devuelve el id. */
export async function saveProfiUnitDraft(
  ownerId: string,
  schoolYearId: string,
  draftId: string | null,
  data: ProfiUnitDraftInput
): Promise<string> {
  const ref = draftId ? doc(db, COL, draftId) : doc(collection(db, COL));
  await setDoc(
    ref,
    {
      ownerId,
      schoolYearId,
      ...data,
      updatedAt: serverTimestamp(),
      ...(draftId ? {} : { createdAt: serverTimestamp() }),
    },
    { merge: true }
  );
  return ref.id;
}

export async function deleteProfiUnitDraft(draftId: string): Promise<void> {
  await deleteDoc(doc(db, COL, draftId));
}
