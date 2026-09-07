import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore, THEME_COLORS, type ThemeColor } from '@/store/themeStore';

const COLOR_NAME_KEYS: Record<ThemeColor, string> = {
  lavender2: 'theme.colorLavender',
  indigo1: 'theme.colorIndigo',
  turquoise1: 'theme.colorTurquoise',
  mint4: 'theme.colorMint',
  coral1: 'theme.colorCoral',
  sky2: 'theme.colorSky',
  peach2: 'theme.colorPeach',
};

export default function ThemeToggle() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const { color, mode, setColor, setMode, syncError } = useThemeStore();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed right-4 z-50 flex flex-col items-end gap-2"
      style={{ bottom: 'calc(9rem + env(safe-area-inset-bottom))' }}
    >
      {open && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px -8px rgba(0,0,0,0.25)',
          padding: '1rem',
          width: '220px',
          maxWidth: 'calc(100vw - 2rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.875rem',
        }}>
          {/* Modo oscuro */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {t('theme.darkMode')}
            </span>
            <button
              onClick={() => setMode(mode === 'dark' ? 'light' : 'dark', user?.uid)}
              style={{
                position: 'relative', width: '44px', height: '24px',
                borderRadius: '999px', border: 'none', cursor: 'pointer',
                background: mode === 'dark' ? 'var(--accent)' : 'var(--border)',
                transition: 'background 0.2s', flexShrink: 0,
              }}
            >
              <span style={{
                position: 'absolute', top: '2px', left: '2px',
                width: '20px', height: '20px', background: 'white',
                borderRadius: '999px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                transform: mode === 'dark' ? 'translateX(20px)' : 'translateX(0)',
                transition: 'transform 0.2s', display: 'block',
              }} />
            </button>
          </div>

          <div style={{ borderTop: '1px solid var(--border)' }} />

          {/* Colores — 3 columnas */}
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              {t('theme.agendaColor')}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.375rem' }}>
              {THEME_COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id, user?.uid)}
                  title={t(COLOR_NAME_KEYS[c.id])}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
                    padding: '0.5rem 0.25rem',
                    borderRadius: '10px',
                    border: `2px solid ${color === c.id ? 'var(--accent)' : 'transparent'}`,
                    background: color === c.id ? 'var(--accent-light)' : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{
                    width: '22px', height: '22px', borderRadius: '999px',
                    background: c.preview, display: 'block',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
                  }} />
                  <span style={{
                    fontSize: '0.6rem', color: 'var(--text-secondary)',
                    whiteSpace: 'nowrap', overflow: 'hidden',
                    textOverflow: 'ellipsis', maxWidth: '100%',
                  }}>
                    {t(COLOR_NAME_KEYS[c.id])}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {syncError && (
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
              {t('theme.syncError')}
            </p>
          )}
        </div>
      )}

      {/* Botón flotante */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{ background: 'var(--accent)', color: 'white' }}
        aria-label={t('theme.customize')}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
        )}
      </button>
    </div>
  );
}
