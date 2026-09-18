import { useTranslation } from 'react-i18next';
import { usePwaStore } from '@/store/pwaStore';
import Button from '@/components/ui/Button';
import { IconRefresh } from '@/components/ui/icons';

/**
 * Aviso flotante que aparece cuando el service worker (ver src/pwa.ts) ha
 * detectado y descargado una versión nueva de la app: al pulsar "Actualizar
 * ahora" se activa esa versión y la página se recarga sola. Se monta una
 * única vez en App.tsx, fuera de las rutas, para que se vea en cualquier
 * pantalla (incluido el login).
 */
export default function UpdateBanner() {
  const { t } = useTranslation();
  const updateAvailable = usePwaStore((s) => s.updateAvailable);
  const applyUpdate = usePwaStore((s) => s.applyUpdate);

  if (!updateAvailable) return null;

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-4 py-3 rounded-2xl max-w-[calc(100vw-2rem)]"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: '0 12px 30px -8px rgba(0,0,0,0.3)' }}
      role="status"
    >
      <IconRefresh size={18} className="shrink-0" style={{ color: 'var(--accent)' }} />
      <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{t('pwa.updateAvailable')}</p>
      <Button size="sm" onClick={applyUpdate} className="shrink-0">
        {t('pwa.updateNow')}
      </Button>
    </div>
  );
}
