import { useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  IconHome2, IconTable, IconNotebook, IconFileText,
  IconBooks, IconCalendar, IconSettings, IconLogout, IconLayoutBoard,
  IconGrid,
} from '@/components/ui/icons';
import { IconClipboard, IconGrades, IconChecklist, IconUsers } from '@/components/ui/icons-extra';
import { ALL_NAV_ITEMS, DEFAULT_MOBILE_NAV } from '@/components/layout/navItems';
import { signOut } from '@/firebase/auth';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ProfiChat from '@/components/profi/ProfiChat';
import OnboardingTour from '@/components/onboarding/OnboardingTour';

const mainNavItems = [
  { to: '/', icon: IconHome2, key: 'nav.dashboard' },
  { to: '/horario', icon: IconTable, key: 'nav.timetable' },
  { to: '/semanal', icon: IconNotebook, key: 'nav.weekly' },
  { to: '/tareas', icon: IconChecklist, key: 'nav.tasks' },
  { to: '/anual', icon: IconFileText, key: 'nav.annual' },
  { to: '/asignaturas', icon: IconBooks, key: 'nav.subjects' },
] as const;

const secondaryNavItems = [
  { to: '/notas', icon: IconGrades, key: 'nav.grades' },
  { to: '/alumnat', icon: IconUsers, key: 'nav.students' },
  { to: '/comentarios', icon: IconClipboard, key: 'nav.comments' },
  { to: '/reuniones', icon: IconCalendar, key: 'nav.meetings' },
  { to: '/mural', icon: IconLayoutBoard, key: 'nav.mural' },
] as const;

export default function AppLayout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const { loadFromProfile } = useThemeStore();

  const mobileNavToShow = useMemo(() => {
    const selected = profile?.mobileNavItems?.length ? profile.mobileNavItems : DEFAULT_MOBILE_NAV;
    const items = ALL_NAV_ITEMS.filter((item) => selected.includes(item.to));
    return items.length > 0 ? items : ALL_NAV_ITEMS.filter((item) => DEFAULT_MOBILE_NAV.includes(item.to));
  }, [profile?.mobileNavItems]);

  const moreButtonSide = profile?.mobileMoreButtonSide ?? 'right';
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  // Cargar tema del perfil al montar
  useEffect(() => {
    if (user?.uid) {
      loadFromProfile(user.uid);
    }
  }, [user?.uid, loadFromProfile]);

  async function handleLogout() {
    await signOut();
    navigate('/login');
  }

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden" style={{ background: 'var(--bg)' }}>

      {/* ── Sidebar desktop ── */}
      <aside
        className="sidebar hidden md:flex md:flex-col md:w-60 md:shrink-0 px-3 py-6 overflow-y-auto"
        style={{ background: 'var(--bg-sidebar)' }}
      >
        {/* Logo / nombre */}
        <div className="px-3 mb-6">
          {/* Tamaño fijado inline: la regla global de index.css fuerza
              font-size: 1.2em sobre h1/h2 (sin capa, gana a las utilidades
              text-* de Tailwind), así que un cambio de clase aquí no se
              notaba. Con style sí se aplica el tamaño real. */}
          <h1
            className="font-display font-bold"
            style={{ color: 'var(--accent-text)', fontSize: '2rem', lineHeight: 1.15 }}
          >
            {t('app.name')}
          </h1>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-sidebar)' }}>
            {profile?.displayName || t('app.tagline')}
          </p>
        </div>

        {/* Nav principal */}
        <nav className="flex-1 flex flex-col gap-0.5">
          {mainNavItems.map(({ to, icon: Icon, key }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `sidebar-link flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                  isActive ? 'nav-active' : ''
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent)' : 'var(--text-sidebar)',
                background: isActive ? 'var(--accent-light)' : 'transparent',
              })}
            >
              <Icon size={18} />
              <span>{t(key)}</span>
            </NavLink>
          ))}

          {/* Separador */}
          <div className="my-2 mx-3" style={{ borderTop: '1px solid var(--bg-sidebar-hover)' }} />

          {secondaryNavItems.map(({ to, icon: Icon, key }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `sidebar-link-secondary flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                  isActive ? 'nav-active' : ''
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent)' : 'var(--text-sidebar)',
                background: isActive ? 'var(--accent-light)' : 'transparent',
              })}
            >
              <Icon size={18} />
              <span>{t(key)}</span>
            </NavLink>
          ))}
        </nav>

        {/* Pie del sidebar */}
        <div className="flex flex-col gap-0.5 pt-3" style={{ borderTop: '1px solid var(--bg-sidebar-hover)' }}>
          <NavLink
            to="/ajustes"
            className="sidebar-footer-link flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition"
            style={{ color: 'var(--text-sidebar)' }}
          >
            <IconSettings size={18} />
            {t('nav.settings')}
          </NavLink>
          <button
            onClick={handleLogout}
            className="sidebar-logout-link flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition text-left w-full"
            style={{ color: 'var(--text-sidebar)' }}
          >
            <IconLogout size={18} />
            {t('nav.logout')}
          </button>
          <p className="text-[10px] px-3 mt-1" style={{ color: 'var(--text-sidebar)' }}>
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </aside>

      {/* ── Header móvil ── */}
      <header
        className="md:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-10"
        style={{ background: 'var(--bg-sidebar)' }}
      >
        <h1 className="font-display text-lg font-bold" style={{ color: 'var(--accent-text)' }}>
          {t('app.name')}
        </h1>
        <NavLink to="/ajustes" style={{ color: 'var(--text-sidebar)' }}>
          <IconSettings size={22} />
        </NavLink>
      </header>

      {/* ── Contenido principal ── */}
      <main
        className="flex-1 overflow-y-auto px-4 py-5 md:px-8 md:py-8 max-w-6xl mx-auto w-full"
        style={{
          color: 'var(--text-primary)',
          background: 'var(--bg-card)',
          paddingBottom: 'calc(6rem + env(safe-area-inset-bottom))',
        }}
      >
        {/* Transición dinámica entre pantallas: remonta (y por tanto
            reanima) al cambiar de ruta, GPU-only (transform + opacity). */}
        <div key={location.pathname} className="page-transition">
          <Outlet />
        </div>
      </main>

      {/* ── Bottom nav móvil: 4 accesos rápidos personalizables + un botón
          fijo (izquierda o derecha, a elección del docente) que despliega
          el resto del menú en un panel aparte. ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around items-center px-2 z-30"
        style={{
          background: 'var(--bg-card)',
          borderTop: '1px solid var(--border)',
          paddingTop: '0.5rem',
          paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))',
        }}
      >
        {moreButtonSide === 'left' && (
          <MobileMoreButton onClick={() => setMoreMenuOpen((v) => !v)} label={t('nav.more')} active={moreMenuOpen} />
        )}
        {mobileNavToShow.map(({ to, icon: Icon, key }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className="flex items-center justify-center w-12 h-12 rounded-2xl transition shrink-0"
            style={({ isActive }) => ({
              color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              background: isActive ? 'var(--accent-light)' : 'transparent',
            })}
            aria-label={t(key)}
          >
            <Icon size={24} />
          </NavLink>
        ))}
        {moreButtonSide === 'right' && (
          <MobileMoreButton onClick={() => setMoreMenuOpen((v) => !v)} label={t('nav.more')} active={moreMenuOpen} />
        )}
      </nav>

      {/* ── Panel con todas las secciones del menú (móvil) ──
          Se mantiene siempre montado (aunque cerrado) para poder animar la
          entrada/salida con una transición de transform+opacity: sale
          deslizándose desde abajo, y al cerrarlo (con el mismo icono de la
          barra inferior, que ahora actúa de interruptor) se encoge hacia
          ese mismo punto en vez de desaparecer de golpe. */}
      <div
        className={`md:hidden fixed inset-x-0 top-0 z-20 flex flex-col justify-end transition-opacity duration-300 ${
          moreMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          /* La barra de navegación inferior (con el botón que abre/cierra
             este panel) va por encima (z-30) para que siempre se pueda
             volver a pulsar. Antes este panel llegaba hasta el borde real
             de la pantalla, así que la barra tapaba su última fila de
             iconos. Aquí se limita su altura para que se quede justo por
             encima de la barra, sin solaparse con ella. Altura de la barra:
             padding-top 0.5rem + botón 3rem (h-12) + padding-bottom 0.5rem
             + safe-area. */
          bottom: 'calc(4.25rem + env(safe-area-inset-bottom))',
        }}
      >
        <button
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.4)' }}
          aria-label={t('common.close')}
          tabIndex={moreMenuOpen ? 0 : -1}
          onClick={() => setMoreMenuOpen(false)}
        />
        <div
          className={`relative rounded-t-3xl px-4 pt-5 max-h-[75vh] overflow-y-auto origin-bottom transition-transform duration-300 ease-out ${
            moreMenuOpen ? 'translate-y-0 scale-100' : 'translate-y-full scale-95'
          }`}
          style={{
            background: 'var(--bg-card)',
            paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
          }}
        >
          <div className="grid grid-cols-3 gap-2">
            {ALL_NAV_ITEMS.map(({ to, icon: Icon, key }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                tabIndex={moreMenuOpen ? 0 : -1}
                onClick={() => setMoreMenuOpen(false)}
                className="flex flex-col items-center justify-center gap-1.5 rounded-2xl py-3 text-center text-xs font-medium transition"
                style={({ isActive }) => ({
                  color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                  background: isActive ? 'var(--accent-light)' : 'var(--bg-input)',
                })}
              >
                <Icon size={22} />
                {t(key)}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* ── Botón flotante de tema ── */}
      <ThemeToggle />

      {/* ── Profi: asistente docente ── */}
      <ProfiChat />

      {/* ── Tour de bienvenida (usuarios recién registrados, o reabierto desde Ajustes) ── */}
      <OnboardingTour />
    </div>
  );
}

function MobileMoreButton({ onClick, label, active }: { onClick: () => void; label: string; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-12 h-12 rounded-2xl transition shrink-0"
      style={{
        color: active ? 'var(--accent)' : 'var(--text-secondary)',
        background: active ? 'var(--accent-light)' : 'transparent',
      }}
      aria-label={label}
      aria-expanded={active}
    >
      <IconGrid size={22} />
    </button>
  );
}
