// Service worker de Agenda Docente IA.
//
// Objetivo: permitir instalar la web como app (icono en pantalla de inicio,
// carga instantánea, algo de uso sin conexión) y dar control real sobre las
// actualizaciones (ver src/pwa.ts) — en vez de depender de la caché normal
// del navegador, sin control ninguno.
//
// Deliberadamente NO intercepta nada que no sea same-origin: todas las
// peticiones a Firebase/Firestore/Cloud Functions/Google pasan de largo sin
// tocarlas, para no interferir jamás con datos en tiempo real ni con el
// login. Solo se cachea lo estático de esta misma web (HTML/JS/CSS/iconos).
const CACHE_NAME = 'agenda-docente-shell-v1';

// Recursos que casi seguro se van a necesitar; el resto se va cacheando solo
// según se visita (ver el fetch handler). Si alguno fallara al precachear no
// bloqueamos la instalación del service worker por eso.
const PRECACHE_URLS = ['/manifest.json', '/favicon.svg', '/apple-touch-icon.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => Promise.all(PRECACHE_URLS.map((url) => cache.add(url).catch(() => null))))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

// El cliente (ver src/pwa.ts) manda este mensaje cuando el docente pulsa
// "Actualizar ahora": esto hace que el nuevo service worker (que está
// "esperando" porque ya había uno controlando la página) pase a controlarla
// de inmediato en vez de esperar a que se cierren todas las pestañas.
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // nunca tocar Firebase/Google/etc.

  // Navegación (abrir la app o recargar una ruta como /semanal): red
  // primero para tener siempre la versión más nueva del HTML cuando hay
  // conexión, con la copia local como respaldo si no la hay.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('/index.html', copy));
          return response;
        })
        .catch(async () => {
          // Si falla la red (o el propio worker de Cloudflare da un error
          // puntual) y tampoco hay nada en caché todavía (p.ej. primera
          // visita), NUNCA hay que dejar que esto resuelva a `undefined`:
          // el navegador exige que respondWith() reciba siempre un objeto
          // Response real, si no lanza "Failed to convert value to
          // 'Response'" en la consola y la navegación falla por completo.
          const cached = (await caches.match('/index.html')) || (await caches.match('/'));
          return (
            cached ||
            new Response('Sin conexión. Vuelve a intentarlo en unos segundos.', {
              status: 503,
              headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            })
          );
        })
    );
    return;
  }

  // JS/CSS del build (dist/assets): el nombre de archivo incluye un hash del
  // contenido, así que son inmutables — cache-first es seguro y evita
  // volver a descargarlos en cada visita.
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            return response;
          })
      )
    );
    return;
  }

  // Resto de estáticos propios (iconos, manifest...): red primero, copia
  // local como respaldo si falla. Igual que arriba: si tampoco hay copia
  // local, se responde con un Response real (nunca `undefined`).
  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      })
      .catch(async () => (await caches.match(request)) || new Response('', { status: 504 }))
  );
});
