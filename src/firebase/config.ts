import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
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
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, 'europe-west1');
