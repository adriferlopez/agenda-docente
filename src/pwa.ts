import { usePwaStore } from '@/store/pwaStore';

/**
 * Registra el service worker (public/sw.js) y conecta su ciclo de vida con
 * pwaStore, para poder mostrar un aviso de "hay una versión nueva" (ver
 * UpdateBanner.tsx) y ofrecer un botón manual de "Buscar actualizaciones"
 * en Ajustes. Se llama una única vez, desde main.tsx.
 *
 * Si el navegador no soporta service workers (o falla el registro, p.ej. en
 * algunos modos privados), la app sigue funcionando exactamente igual: esto
 * es una mejora opcional, nunca un requisito para usarla.
 */
export function registerServiceWorker(): void {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        usePwaStore.getState().setRegistration(registration);

        // Puede que ya hubiera una versión nueva esperando desde antes de
        // que esta pestaña terminara de cargar (p.ej. se instaló mientras
        // el docente estaba en otra pestaña de la app).
        if (registration.waiting && navigator.serviceWorker.controller) {
          usePwaStore.getState().setUpdateAvailable(registration.waiting);
        }

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            // "installed" + ya había un controller = actualización real (no
            // la primera vez que se instala el service worker en el
            // dispositivo, que no necesita ningún aviso).
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              usePwaStore.getState().setUpdateAvailable(newWorker);
            }
          });
        });
      })
      .catch(() => {
        // Ver comentario de arriba: no bloqueamos nada si esto falla.
      });

    // Cuando el nuevo service worker toma el control (tras pulsar
    // "Actualizar ahora", ver pwaStore.applyUpdate), recargamos la página
    // una única vez para que se sirvan los ficheros nuevos.
    let reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (reloading) return;
      reloading = true;
      window.location.reload();
    });
  });
}

/**
 * Comprobación manual (botón "Buscar actualizaciones" en Ajustes). Pide al
 * navegador que vuelva a descargar sw.js y compare byte a byte con el que
 * ya tiene instalado; si hay cambios, dispara el mismo flujo de
 * "updatefound" de arriba y aparecerá el aviso de actualización disponible.
 * Devuelve si se encontró una actualización (para poder mostrar "ya tienes
 * la última versión" en caso contrario).
 */
export async function checkForUpdate(): Promise<boolean> {
  const { registration, setChecking } = usePwaStore.getState();
  if (!registration) return false;
  setChecking(true);
  try {
    await registration.update();
  } catch {
    // Sin conexión, por ejemplo: no hay nada nuevo que comprobar ahora mismo.
  } finally {
    setChecking(false);
  }
  return usePwaStore.getState().updateAvailable;
}
