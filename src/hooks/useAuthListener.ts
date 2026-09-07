import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import { fetchUserProfile } from '@/firebase/auth';
import { useAuthStore } from '@/store/authStore';
import i18n from '@/i18n';

export function useAuthListener() {
  const setUser = useAuthStore((s) => s.setUser);
  const setProfile = useAuthStore((s) => s.setProfile);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        let profile = await fetchUserProfile(user.uid);
        // El cambio de email de acceso (ver changeEmailRequest en
        // firebase/auth.ts) solo se aplica en Firebase Auth cuando el
        // docente confirma el enlace enviado al correo nuevo, algo que
        // puede pasar en otra sesión/dispositivo. Al recargar la app
        // comparamos con el email real de Auth y sincronizamos Firestore
        // (de donde lee el resto de la app) si ya se ha confirmado.
        if (profile && user.email && profile.email !== user.email) {
          await updateDoc(doc(db, 'users', user.uid), { email: user.email }).catch(() => null);
          profile = { ...profile, email: user.email };
        }
        setProfile(profile);
        if (profile?.language) {
          i18n.changeLanguage(profile.language);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setProfile, setLoading]);
}
