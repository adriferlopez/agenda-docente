import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut as fbSignOut,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
  type User,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { auth, db, functions } from '@/firebase/config';
import type { UserProfile, Language } from '@/types';
import type { Etapa, Comunitat } from '@/data/curriculum/types';

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
  language: Language,
  etapas: Etapa[],
  comunitat: Comunitat
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
    etapas,
    comunitat,
    onboardingSeen: false,
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
      onboardingSeen: false,
      createdAt: serverTimestamp(),
    };
    await setDoc(userRef, profile);
  }

  return { user: cred.user, isNewUser };
}

/**
 * Actualiza el nombre visible del docente, tanto en Firebase Auth (por si
 * se usa en algún sitio como fallback, p. ej. un futuro login con Google)
 * como en el documento de perfil de Firestore, que es de donde lee el
 * resto de la app (sidebar, saludo del panel, etc.).
 */
export async function updateDisplayName(user: User, displayName: string): Promise<void> {
  const trimmed = displayName.trim();
  await updateProfile(user, { displayName: trimmed });
  await setDoc(doc(db, 'users', user.uid), { displayName: trimmed }, { merge: true });
}

export async function sendPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Cambia el correo de acceso de la cuenta. Reautentica con la contraseña
 * actual (imprescindible: Firebase exige un login "reciente" para permitir
 * cambios sensibles) y envía un enlace de verificación al correo nuevo; el
 * cambio real en Firebase Auth no se aplica hasta que el docente lo confirma
 * desde ese enlace. Como esto puede tardar (o pasar en otra sesión),
 * `useAuthListener` sincroniza el perfil de Firestore con el email de
 * Firebase Auth en cada carga, así que no hace falta tocar Firestore aquí.
 * Al preservar el mismo uid, todos los datos del docente (asignaturas,
 * programaciones, notas, etc.) se mantienen intactos sin ninguna migración.
 */
export async function changeEmailRequest(user: User, currentPassword: string, newEmail: string): Promise<void> {
  if (!user.email) throw new Error('no-email');
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
  await verifyBeforeUpdateEmail(user, newEmail);
}

export async function signOut(): Promise<void> {
  await fbSignOut(auth);
}

/**
 * Elimina la cuenta y todos los datos del docente. El borrado real se hace
 * en una Cloud Function con privilegios de administrador (ver
 * functions/src/index.ts, deleteAccount): así no hace falta reautenticar
 * al usuario (Firebase exige un login "reciente" para que el propio
 * cliente pueda borrarse a sí mismo) y se puede limpiar también el
 * documento de perfil, que las reglas de Firestore bloquean borrar
 * directamente desde el cliente.
 */
export async function deleteAccountRequest(): Promise<void> {
  const fn = httpsCallable(functions, 'deleteAccount');
  await fn({});
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
    dashboardWidgets: data.dashboardWidgets,
    etapas: data.etapas,
    comunitat: data.comunitat,
    mobileNavItems: data.mobileNavItems,
    mobileMoreButtonSide: data.mobileMoreButtonSide,
    gradesStudentDisplay: data.gradesStudentDisplay,
    onboardingSeen: data.onboardingSeen,
    hideSubjectsOnHolidays: data.hideSubjectsOnHolidays,
    weeklyCalendarStyle: data.weeklyCalendarStyle,
    createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : Date.now(),
  };
}
