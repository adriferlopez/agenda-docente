import { create } from 'zustand';

interface PwaState {
  // Instancia del service worker registrado, para poder pedirle una
  // comprobación de actualizaciones bajo demanda (botón en Ajustes).
  registration: ServiceWorkerRegistration | null;
  // true cuando hay una versión nueva ya descargada, esperando a que el
  // docente confirme para activarse (ver src/pwa.ts).
  updateAvailable: boolean;
  waitingWorker: ServiceWorker | null;
  // true mientras una comprobación manual está en curso (botón "Buscar
  // actualizaciones" en Ajustes).
  checking: boolean;
  setRegistration: (registration: ServiceWorkerRegistration) => void;
  setUpdateAvailable: (worker: ServiceWorker) => void;
  setChecking: (checking: boolean) => void;
  applyUpdate: () => void;
}

export const usePwaStore = create<PwaState>((set, get) => ({
  registration: null,
  updateAvailable: false,
  waitingWorker: null,
  checking: false,
  setRegistration: (registration) => set({ registration }),
  setUpdateAvailable: (worker) => set({ updateAvailable: true, waitingWorker: worker }),
  setChecking: (checking) => set({ checking }),
  applyUpdate: () => {
    get().waitingWorker?.postMessage('SKIP_WAITING');
  },
}));
