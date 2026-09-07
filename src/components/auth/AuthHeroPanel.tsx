import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AppShowcase from '@/components/auth/AppShowcase';
import { THEME_COLORS } from '@/store/themeStore';

// Ciclo automático por los temas de color reales de la app (mismo array
// que usa el selector de temas en Ajustes), para que la landing "respire"
// sin necesidad de que el visitante haga nada. El atributo data-theme se
// fija en la raíz de este panel (no en <html>, que no está autenticado
// todavía) y las variables CSS de index.css hacen el resto en cascada.
const THEME_CYCLE_MS = 2400;

// Panel hero compartit entre LoginPage i RegisterPage: logotip, eslògan,
// la maqueta interactiva de l'app (AppShowcase) i el copyright. Es manté
// com a component apart perquè les dues pantalles d'autenticació mostrin
// exactament la mateixa carta de presentació.
function WeekGridMotif() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 flex" style={{ opacity: 0.08 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-1" style={{ borderLeft: i === 0 ? 'none' : '1px solid white' }} />
        ))}
      </div>
    </div>
  );
}

export default function AuthHeroPanel() {
  const { t } = useTranslation();
  const [themeIdx, setThemeIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setThemeIdx((i) => (i + 1) % THEME_COLORS.length);
    }, THEME_CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      data-theme={THEME_COLORS[themeIdx].id}
      className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 relative"
      style={{ background: 'var(--bg-sidebar)', transition: 'background-color 1s ease' }}
    >
      <WeekGridMotif />

      <div className="relative card-enter flex flex-col items-center">
        <h1
          className="font-display font-semibold text-center mb-8"
          style={{ color: 'white', transition: 'color 1s ease', fontSize: 'clamp(3.5rem, 6vw, 6.5rem)', lineHeight: 1.1 }}
        >
          {t('app.name')}
        </h1>

        <AppShowcase />
      </div>

      <div className="absolute bottom-8 flex flex-col items-center gap-1.5">
        <p
          className="text-xs"
          style={{ color: 'var(--text-sidebar-soft)', transition: 'color 1s ease' }}
        >
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>
        <p
          className="flex flex-wrap justify-center gap-x-3 text-[11px]"
          style={{ color: 'var(--text-sidebar-soft)', transition: 'color 1s ease' }}
        >
          <Link to="/legal/aviso-legal" className="hover:underline">{t('footer.legalNotice')}</Link>
          <Link to="/legal/privacidad" className="hover:underline">{t('footer.privacy')}</Link>
          <Link to="/legal/cookies" className="hover:underline">{t('footer.cookies')}</Link>
          <Link to="/legal/terminos" className="hover:underline">{t('footer.terms')}</Link>
        </p>
      </div>
    </div>
  );
}
