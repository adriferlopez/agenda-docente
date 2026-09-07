import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, getFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

// Configuración de Firebase para esta app web. Estos valores (apiKey,
// authDomain, etc.) NO son secretos por diseño en Firebase
// (https://firebase.google.com/docs/projects/api-keys): identifican el
// proyecto y van incluidos en el código que se ejecuta en el navegador.
// La seguridad real de los datos la dan las Firestore/Storage Security
// Rules (ver /firestore.rules y /storage.rules), no ocultar esta config.
const firebaseConfig = {
  apiKey: 'AIzaSyCyiapz3GsbhdCUkq9AbDnVdvyPJ8nhv_Q',
  authDomain: 'agenda-escolar-aula-tic.firebaseapp.com',
  projectId: 'agenda-escolar-aula-tic',
  storageBucket: 'agenda-escolar-aula-tic.firebasestorage.app',
  messagingSenderId: '864990710622',
  appId: '1:864990710622:web:0a45e752218d21999d1dcf',
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
// ignoreUndefinedProperties: evita que addDoc/setDoc lancen un error cuando
// un objeto incluye campos opcionales en `undefined` (patrón habitual en
// esta app: `campo: valor || undefined`). Sin esto, crear documentos con
// algún campo vacío (p.ej. una franja "guardia"/"patio" sin aula) fallaba
// silenciosamente porque Firestore rechaza `undefined` por defecto.
// localCache (persistentLocalCache + IndexedDB): sin esto, un guardado
// hecho justo antes de cerrar la pestaña/app (p.ej. desde el multitarea del
// móvil) se pierde si el escrito no ha llegado aún al servidor. Con caché
// persistente, el escrito queda en IndexedDB del dispositivo y se reintenta
// solo en cuanto vuelve a haber conexión, sobreviva o no la pestaña.
// persistentMultipleTabManager evita que falle si el docente tiene la app
// abierta en más de una pestaña/ventana a la vez.
export const db = (() => {
  try {
    return initializeFirestore(app, {
      ignoreUndefinedProperties: true,
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
    });
  } catch {
    // Ya inicializado (p.ej. hot-reload en desarrollo), o el navegador no
    // soporta IndexedDB persistente (algunos modos privados): reutilizar
    // la instancia existente / caer a la config por defecto.
    return getFirestore(app);
  }
})();
export const storage = getStorage(app);
export const functions = getFunctions(app, 'europe-west1');
