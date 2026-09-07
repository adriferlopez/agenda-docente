import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  updatedAt: string;
  children: ReactNode;
}

// Pequeños helpers de presentación reutilizados por las 4 páginas legales,
// para no repetir las mismas clases de Tailwind en cada una.
export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-lg font-semibold mt-3" style={{ color: 'var(--text-primary)' }}>
      {children}
    </h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p style={{ color: 'var(--text-primary)' }}>{children}</p>;
}

export function Ul({ children }: { children: ReactNode }) {
  return <ul className="list-disc pl-5 flex flex-col gap-1">{children}</ul>;
}

/**
 * Layout común para las páginas legales (Aviso Legal, Privacidad, Cookies,
 * Términos). Son páginas públicas (fuera de ProtectedRoute, ver App.tsx):
 * cualquiera debe poder consultarlas sin haber iniciado sesión, tal como
 * exige el artículo 10 LSSICE para el Aviso Legal.
 *
 * El contenido se mantiene solo en castellano (es el idioma en el que se
 * redacta la relación contractual/legal con los usuarios de esta app,
 * pensada para el ámbito educativo español), aunque el resto de la
 * interfaz esté traducida a 5 idiomas.
 */
export default function LegalLayout({ title, updatedAt, children }: Props) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link
          to="/login"
          className="text-sm font-medium hover:underline"
          style={{ color: 'var(--accent)' }}
        >
          ← Volver
        </Link>

        <h1 className="font-display text-3xl font-semibold mt-4 mb-1" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h1>
        <p className="text-xs mb-8" style={{ color: 'var(--text-secondary)' }}>
          Última actualización: {updatedAt}
        </p>

        <div
          className="flex flex-col gap-4 text-sm leading-relaxed legal-prose"
          style={{ color: 'var(--text-primary)' }}
        >
          {children}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-10 pt-6 text-xs" style={{ borderTop: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
          <Link to="/legal/aviso-legal" className="hover:underline">Aviso legal</Link>
          <Link to="/legal/privacidad" className="hover:underline">Privacidad</Link>
          <Link to="/legal/cookies" className="hover:underline">Cookies</Link>
          <Link to="/legal/terminos" className="hover:underline">Términos y condiciones</Link>
        </div>
      </div>
    </div>
  );
}
