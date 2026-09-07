import { create } from 'zustand';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

// 5 temas pastel claros intercambiables (ver bloques [data-theme] en
// index.css). Cada uno define su propio acento/sidebar/bordes; el
// resto de la interfaz (tipografía, botones, transiciones) es igual
// en todos.
export type ThemeColor = 'lavender2' | 'indigo1' | 'turquoise1' | 'mint4' | 'coral1' | 'sky2' | 'peach2';

export type ThemeMode = 'light' | 'dark';

export const THEME_COLORS: { id: ThemeColor; name: string; preview: string }[] = [
  { id: 'lavender2',  name: 'Lavanda',    preview: '#8A64C0' },
  { id: 'indigo1',    name: 'Indigo',     preview: '#686FC1' },
  { id: 'turquoise1', name: 'Turquesa',   preview: '#378188' },
  { id: 'mint4',      name: 'Menta',      preview: '#36846A' },
  { id: 'coral1',     name: 'Coral',      preview: '#B75C4E' },
  { id: 'sky2',       name: 'Cielo',      preview: '#437CA4' },
  { id: 'peach2',     name: 'Melocotón',  preview: '#A36943' },
];

interface ThemeStore {
  color: ThemeColor;
  mode: ThemeMode;
  /** true si el último guardado en Firestore falló (p.ej. sin conexión).
   * El tema ya se ha aplicado localmente y quedará en localStorage, pero
   * conviene avisar de que puede no persistir en otro dispositivo/sesión
   * hasta que se reintente con conexión. */
  syncError: boolean;
  setColor: (color: ThemeColor, uid?: string) => void;
  setMode: (mode: ThemeMode, uid?: string) => void;
  loadFromProfile: (uid: string) => Promise<void>;
  applyToDOM: () => void;
}

function applyThemeToDOM(color: ThemeColor, mode: ThemeMode) {
  document.documentElement.setAttribute('data-theme', color);
  document.documentElement.setAttribute('data-mode', mode);
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  color: 'lavender2',
  mode: 'light',
  syncError: false,

  applyToDOM() {
    applyThemeToDOM(get().color, get().mode);
  },

  setColor(color, uid) {
    set({ color, syncError: false });
    applyThemeToDOM(color, get().mode);
    localStorage.setItem('theme-color', color);
    if (uid) {
      updateDoc(doc(db, 'users', uid), { 'theme.color': color }).catch(() => set({ syncError: true }));
    }
  },

  setMode(mode, uid) {
    set({ mode, syncError: false });
    applyThemeToDOM(get().color, mode);
    localStorage.setItem('theme-mode', mode);
    if (uid) {
      updateDoc(doc(db, 'users', uid), { 'theme.mode': mode }).catch(() => set({ syncError: true }));
    }
  },

  async loadFromProfile(uid) {
    const localColor = (localStorage.getItem('theme-color') as ThemeColor) || 'lavender2';
    const localMode = (localStorage.getItem('theme-mode') as ThemeMode) || 'light';
    set({ color: localColor, mode: localMode });
    applyThemeToDOM(localColor, localMode);

    try {
      const snap = await getDoc(doc(db, 'users', uid));
      const data = snap.data();
      const color: ThemeColor = data?.theme?.color || localColor;
      const mode: ThemeMode = data?.theme?.mode || localMode;
      set({ color, mode });
      applyThemeToDOM(color, mode);
      localStorage.setItem('theme-color', color);
      localStorage.setItem('theme-mode', mode);
    } catch {
      // Mantener localStorage si falla
    }
  },
}));
