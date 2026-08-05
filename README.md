# Agenda Docente

Aplicación web para profesores: horario escolar, programación semanal y anual,
con asistencia de IA (Gemini) y soporte multi-idioma (ES, CA, EN, EU, GL).

Stack: React 19 + Vite + TypeScript + Tailwind CSS v4 · Firebase (Auth, Firestore,
Storage, Cloud Functions) · Despliegue en Cloudflare Pages.

## 1. Requisitos previos

- Node.js 20+
- Una cuenta de [Firebase](https://console.firebase.google.com/) con un proyecto creado
- (Opcional, recomendado) [Firebase CLI](https://firebase.google.com/docs/cli):
  ```bash
  npm install -g firebase-tools
  firebase login
  ```

## 2. Configurar Firebase

### 2.1 Crear el proyecto y habilitar servicios

En la consola de Firebase, en tu proyecto:

1. **Authentication** → Sign-in method → habilita **Correo electrónico/contraseña**.
2. **Firestore Database** → crea la base de datos (modo producción).
3. **Storage** → crea el bucket (modo producción).
4. **Cloud Functions** → no requiere acción previa, se desplegará desde este repo.
5. En **Configuración del proyecto → Tus apps**, añade una app web y copia la configuración (`apiKey`, `authDomain`, etc.).

### 2.2 Configuración de Firebase en el código

Los valores de `firebaseConfig` (`apiKey`, `authDomain`, `projectId`, etc.) ya
están incrustados directamente en `src/firebase/config.ts`. Esto es seguro:
estos valores identifican el proyecto y no son secretos
(https://firebase.google.com/docs/projects/api-keys); la seguridad real la
dan las reglas de Firestore/Storage (sección 5 más abajo).

Si en algún momento cambias de proyecto Firebase o creas otra app web, edita
directamente ese objeto en `src/firebase/config.ts` con los nuevos valores de
Configuración del proyecto → Tus apps.

**Importante:** la clave de la API de Gemini de cada docente NUNCA se pone en
el código ni en variables de entorno. Se introduce desde la app (Ajustes →
Inteligencia artificial) y se cifra en el servidor — ver sección 3.

### 2.3 Vincular el proyecto local con tu proyecto Firebase

El archivo `.firebaserc` ya apunta a `agenda-escolar-aula-tic`. Si en el futuro
usas otro proyecto Firebase, actualiza el valor `default` ahí (lo ves en
Configuración del proyecto → General).

## 3. Cloud Functions (IA Gemini + cifrado de claves)

Las funciones viven en `functions/`. Implementan:

- `saveGeminiApiKey` / `removeGeminiApiKey`: guardan/eliminan la clave de Gemini
  del usuario, cifrada con AES-256-GCM, en Firestore (`users/{uid}.geminiApiKeyEncrypted`).
- `generateWeeklySuggestions`, `generateActivityObjectives`, `matchCurriculumItems`,
  `spellcheckText`: llaman a la API de Gemini usando la clave del propio usuario,
  descifrada solo en el servidor.

### 3.1 Configurar el secreto de cifrado

Antes de desplegar, define el secreto `GEMINI_ENCRYPTION_KEY` (una cadena
aleatoria larga; sirve cualquier longitud, se deriva a 32 bytes internamente):

```bash
firebase functions:secrets:set GEMINI_ENCRYPTION_KEY
```

Guarda ese valor en un gestor de contraseñas: si lo cambias, las claves de Gemini
ya guardadas dejarán de poder descifrarse.

### 3.2 Instalar dependencias y desplegar

```bash
cd functions
npm install
cd ..
firebase deploy --only functions,firestore:rules,firestore:indexes,storage:rules
```

## 4. Desarrollo local

```bash
npm install
npm run dev
```

La app arranca en `http://localhost:5173`. Para usar las funciones de IA,
necesitas las Cloud Functions desplegadas (paso 3) o el emulador de Firebase
(`firebase emulators:start`).

## 5. Despliegue en Cloudflare (Workers + Static Assets)

Al conectar el repositorio, Cloudflare detecta automáticamente este proyecto
como un **Worker con assets estáticos** (lo verás en Workers & Pages → Compute
→ Workers & Pages, no en la sección clásica "Pages").

1. Sube este repositorio a GitHub/GitLab.
2. En Cloudflare → Workers & Pages → **Create application → Pages → Connect to Git**
   (aunque se cree como "Worker", el flujo de conexión a Git es el mismo).
3. Configura el proyecto:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. No necesitas añadir variables de entorno para Firebase: la configuración ya
   está incrustada en `src/firebase/config.ts` (ver sección 2.2). Si más
   adelante usas Google Calendar/Drive, esas credenciales sí se gestionarían
   aparte.
5. Despliega. El archivo `wrangler.jsonc` ya está incluido y configura
   `not_found_handling: "single-page-application"`, que es lo que hace que
   las rutas de React Router (p. ej. `/horario`, `/semanal`) funcionen al
   recargar la página o entrar directamente por URL.

**Importante:** no añadas un archivo `public/_redirects`. En este modelo
(Workers + assets) esa configuración entra en conflicto con `wrangler.jsonc`
y Cloudflare rechaza el despliegue con un error de "infinite loop".

## 6. Estructura del proyecto

```
src/
  components/      Componentes UI, layout, y específicos de cada módulo
  firebase/         Acceso a Firestore/Auth (capas de datos)
  hooks/            Hooks de React (auth, curso escolar activo...)
  i18n/             Traducciones (es, ca, en, eu, gl)
  pages/            Páginas/rutas de la aplicación
  services/ai.ts    Cliente de las Cloud Functions de IA
  store/            Estado global (Zustand)
  types/            Tipos TypeScript compartidos
  utils/            Utilidades (fechas, Excel de currículum)
functions/          Cloud Functions (Node 20, TypeScript)
firestore.rules     Reglas de seguridad de Firestore
storage.rules       Reglas de seguridad de Storage
firebase.json       Configuración de Firebase CLI
```

## 7. Próximos pasos / integraciones pendientes

- **Google Calendar / Apple Calendar (CalDAV) / Google Drive**: la UI en Ajustes
  está preparada, pero el flujo OAuth real (Google) y CalDAV (Apple) no están
  implementados todavía.
- **Cambio de contraseña / eliminación de cuenta**: botones presentes en Ajustes,
  pendientes de implementar con `reauthenticateWithCredential` / `deleteUser` de
  Firebase Auth.
- **Selector visual de Google Drive (Picker API)**: actualmente los adjuntos se
  añaden pegando la URL de "compartir" de Drive.
