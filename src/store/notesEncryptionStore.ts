import { create } from 'zustand';

/**
 * Estado en memoria (nunca persistido) de la clave de cifrado de datos
 * (DEK) usada para las anotaciones de alumnado. A propósito NO se guarda en
 * localStorage/sessionStorage ni en ningún sitio del disco: así, al cerrar
 * la pestaña, recargar la página o cerrar sesión, la clave desaparece y hay
 * que volver a desbloquear las notas con la frase secreta (o el código de
 * recuperación). Ver src/crypto/notesEncryption.ts para el resto del
 * diseño de cifrado.
 */
interface NotesEncryptionState {
  dek: CryptoKey | null;
  unlocked: boolean;
  setDek: (dek: CryptoKey) => void;
  lock: () => void;
}

export const useNotesEncryptionStore = create<NotesEncryptionState>((set) => ({
  dek: null,
  unlocked: false,
  setDek: (dek) => set({ dek, unlocked: true }),
  lock: () => set({ dek: null, unlocked: false }),
}));
