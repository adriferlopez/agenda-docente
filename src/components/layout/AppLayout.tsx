import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  IconHome2,
  IconTable,
  IconNotebook,
  IconFileText,
  IconBooks,
  IconCalendar,
  IconSettings,
  IconLogout,
} from '@/components/ui/icons';
import { IconUsers, IconClipboard } from '@/components/ui/icons-extra';
import { signOut } from '@/firebase/auth';
import { useAuthStore } from '@/store/authStore';

// Ítems principales: visibles en el bottom nav móvil y en el sidebar desktop.
const mainNavItems = [
  { to: '/', icon: IconHome2, key: 'nav.dashboard' },
  { to: '/horario', icon: IconTable, key: 'nav.timetable' },
  { to: '/semanal', icon: IconNotebook, key: 'nav.weekly' },
  { to: '/anual', icon: IconFileText, key: 'nav.annual' },
  { to: '/asignaturas', icon: IconBooks, key: 'nav.subjects' },
] as const;

// Ítems secundarios: solo en el sidebar desktop (en móvil se accede desde
// los accesos del Dashboard, para no saturar el bottom nav).
const secondaryNavItems = [
  { to: '/alumnos', icon: IconUsers, key: 'nav.students' },
  { to: '/comentarios', icon: IconClipboard, key: 'nav.comments' },
  { to: '/reuniones', icon: IconCalendar, key: 'nav.meetings' },
] as const;

export default function AppLayout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const profile = useAuthStore((s) => s.profile);

  async function handleLogout() {
    await signOut();
    navigate('/login');
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-cloud">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 border-r border-lav-100 bg-white px-4 py-6">
        <div className="px-2 mb-8">
          <h1 className="font-display text-2xl text-lav-600">{t('app.name')}</h1>
          <p className="text-xs text-ink-soft mt-1">{t('app.tagline')}</p>
        </div>

        <nav className="flex-1 flex flex-col gap-1">
          {mainNavItems.map(({ to, icon: Icon, key }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-lav-100 text-lav-600'
                    : 'text-ink-soft hover:bg-lav-50 hover:text-ink'
                }`
              }
            >
              <Icon size={20} />
              {t(key)}
            </NavLink>
          ))}

          <div className="border-t border-lav-100 my-2" />

          {secondaryNavItems.map(({ to, icon: Icon, key }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-lav-100 text-lav-600'
                    : 'text-ink-soft hover:bg-lav-50 hover:text-ink'
                }`
              }
            >
              <Icon size={20} />
              {t(key)}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-1 pt-4 border-t border-lav-100">
          <NavLink
            to="/ajustes"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-lav-100 text-lav-600' : 'text-ink-soft hover:bg-lav-50 hover:text-ink'
              }`
            }
          >
            <IconSettings size={20} />
            {t('nav.settings')}
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium text-ink-soft hover:bg-rose-50 hover:text-rose-600 transition"
          >
            <IconLogout size={20} />
            {t('nav.logout')}
          </button>
          {profile?.displayName && (
            <div className="mt-2 px-4 text-xs text-ink-soft truncate">{profile.displayName}</div>
          )}
        </div>
      </aside>

      {/* Header móvil */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-lav-100 sticky top-0 z-10">
        <h1 className="font-display text-xl text-lav-600">{t('app.name')}</h1>
        <NavLink to="/ajustes" className="text-ink-soft">
          <IconSettings size={22} />
        </NavLink>
      </header>

      {/* Contenido */}
      <main className="flex-1 px-4 py-5 md:px-8 md:py-8 pb-24 md:pb-8 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>

      {/* Bottom nav móvil */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-lav-100 flex justify-around items-center py-1.5 px-1 z-10 overflow-x-auto">
        {mainNavItems.map(({ to, icon: Icon, key }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-1.5 py-1 rounded-xl text-[10px] font-medium transition shrink-0 ${
                isActive ? 'text-lav-600' : 'text-ink-soft'
              }`
            }
          >
            <Icon size={20} />
            <span className="leading-none">{t(key)}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
