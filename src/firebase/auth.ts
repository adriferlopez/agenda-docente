import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut as fbSignOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import type { UserProfile, Language } from '@/types';

const SUPPORTED_LANGUAGES: Language[] = ['es', 'ca', 'en', 'eu', 'gl'];

/** Detecta el idioma del navegador y lo ajusta a uno de los soportados (fallback 'es'). */
function detectBrowserLanguage(): Language {
  const navLang = (navigator.language || 'es').slice(0, 2).toLowerCase();
  return (SUPPORTED_LANGUAGES as string[]).includes(navLang) ? (navLang as Language) : 'es';
}

export async function registerWithEmail(
  email: string,
  password: string,
  displayName: string,
  language: Language
): Promise<User> {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(cred.user, { displayName });
  }

  const profile: Omit<UserProfile, 'createdAt'> & { createdAt: unknown } = {
    uid: cred.user.uid,
    email: cred.user.email ?? email,
    displayName,
    language,
    createdAt: serverTimestamp(),
  };

  await setDoc(doc(db, 'users', cred.user.uid), profile);
  return cred.user;
}

export async function loginWithEmail(email: string, password: string): Promise<User> {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

/**
 * Inicia sesión con Google. Si es la primera vez que este usuario entra,
 * crea su perfil en Firestore usando el idioma detectado del navegador
 * (no podemos preguntárselo, ya que no hay paso de registro manual).
 */
export async function loginWithGoogle(): Promise<{ user: User; isNewUser: boolean }> {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  const userRef = doc(db, 'users', cred.user.uid);
  const snap = await getDoc(userRef);

  const isNewUser = !snap.exists();

  if (isNewUser) {
    const profile: Omit<UserProfile, 'createdAt'> & { createdAt: unknown } = {
      uid: cred.user.uid,
      email: cred.user.email ?? '',
      displayName: cred.user.displayName ?? '',
      language: detectBrowserLanguage(),
      createdAt: serverTimestamp(),
    };
    await setDoc(userRef, profile);
  }

  return { user: cred.user, isNewUser };
}

export async function sendPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

export async function signOut(): Promise<void> {
  await fbSignOut(auth);
}

export async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    uid,
    email: data.email,
    displayName: data.displayName,
    language: data.language ?? 'es',
    activeSchoolYearId: data.activeSchoolYearId,
    googleCalendarConnected: data.googleCalendarConnected ?? false,
    googleDriveConnected: data.googleDriveConnected ?? false,
    hasGeminiKey: data.hasGeminiKey ?? false,
    createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : Date.now(),
  };
}
