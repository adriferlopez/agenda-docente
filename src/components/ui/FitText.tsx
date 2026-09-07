import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

interface FitTextProps {
  children: ReactNode;
  /** Tamaño de fuente máximo, en px (se usa cuando el texto cabe sin problema). */
  maxFontSize: number;
  /** Límite inferior de reducción, como fracción de maxFontSize (0-1). Por defecto 0.5. */
  minScale?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Texto que se muestra siempre en una sola línea, reduciendo automáticamente
 * el tamaño de fuente si no cabe en el ancho disponible (por ejemplo, saludos
 * con nombres largos que de otro modo se partirían en dos líneas en móvil).
 */
export default function FitText({ children, maxFontSize, minScale = 0.5, className, style }: FitTextProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(maxFontSize);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const textEl = textRef.current;
    if (!wrap || !textEl) return;

    function fit() {
      const available = wrap!.clientWidth;
      if (available <= 0) return;

      // Medimos el ancho natural del texto a tamaño máximo.
      textEl!.style.fontSize = `${maxFontSize}px`;
      const natural = textEl!.scrollWidth;
      if (natural <= 0) return;

      if (natural <= available) {
        setFontSize(maxFontSize);
        return;
      }

      // El texto no cabe: lo reducimos proporcionalmente (con un pequeño
      // margen de seguridad para compensar el kerning, que no escala 100%
      // lineal con el tamaño de fuente).
      const ratio = (available / natural) * 0.98;
      const next = Math.max(maxFontSize * minScale, maxFontSize * ratio);
      setFontSize(next);
    }

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, maxFontSize, minScale]);

  return (
    <div ref={wrapRef} style={{ width: '100%', overflow: 'hidden' }}>
      <span
        ref={textRef}
        className={className}
        style={{ ...style, fontSize, whiteSpace: 'nowrap', display: 'inline-block', maxWidth: '100%' }}
      >
        {children}
      </span>
    </div>
  );
}
