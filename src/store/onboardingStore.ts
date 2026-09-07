import { create } from 'zustand';

/**
 * Estado global (no persistido) del tour de bienvenida (OnboardingTour).
 * Separado de authStore porque también se usa para reabrirlo manualmente
 * desde Ajustes, sin depender de si el perfil ya lo marcó como visto.
 */
interface OnboardingUIState {
  open: boolean;
  openTour: () => void;
  closeTour: () => void;
}

export const useOnboardingStore = create<OnboardingUIState>((set) => ({
  open: false,
  openTour: () => set({ open: true }),
  closeTour: () => set({ open: false }),
}));
