import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

export interface TagOption {
  key: string;
  label: string;
  /** Texto más corto a mostrar en la etiqueta ya seleccionada (por defecto usa `label`). */
  chipLabel?: string;
  hint?: string;
}

/**
 * Combobox compacto: los elementos marcados se muestran como etiquetas
 * (chips) con una "×" para desmarcarlos, y un desplegable con checkboxes
 * para añadir más. Evita mostrar listas largas de texto siempre visibles.
 */
export default function TagMultiSelect({
  label,
  options,
  selected,
  onChange,
  placeholder,
}: {
  label?: string;
  options: TagOption[];
  selected: Set<string>;
  onChange: (next: Set<string>) => void;
  placeholder?: string;
}) {
  const { t } = useTranslation();
  const effectivePlaceholder = placeholder ?? t('common.addEllipsis');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelStyle, setPanelStyle] = useState<{ top: number; left: number; width: number; maxHeight: number } | null>(null);

  // Calcula la posición del desplegable en coordenadas de viewport
  // (position: fixed) a partir del recuadro del selector. Se hace así,
  // en vez de con position: absolute dentro del árbol normal, porque el
  // panel se monta con un Portal directamente en <body> (ver comentario
  // en Modal.tsx): si no, un ancestro con transform/animación (p.ej. una
  // <Card>) puede quedar por encima del desplegable, o clavarlo dentro de
  // su propio recuadro.
  const updatePosition = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const maxHeight = Math.max(120, Math.min(224, window.innerHeight - rect.bottom - 12));
    setPanelStyle({ top: rect.bottom + 4, left: rect.left, width: rect.width, maxHeight });
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      const insideTrigger = ref.current?.contains(target);
      const insidePanel = panelRef.current?.contains(target);
      if (!insideTrigger && !insidePanel) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function toggle(key: string) {
    const next = new Set(selected);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    onChange(next);
  }

  const selectedOptions = options.filter((o) => selected.has(o.key));

  return (
    <div className="flex flex-col gap-1.5" ref={ref}>
      {label && (
        <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}
      <div className="relative" ref={triggerRef}>
        <div
          className="flex flex-col gap-1.5 rounded-2xl border p-1.5 min-h-[42px] cursor-pointer"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-input)' }}
          onClick={() => setOpen((o) => !o)}
        >
          {selectedOptions.length === 0 && (
            <span className="text-sm px-2 py-1" style={{ color: 'var(--text-secondary)' }}>
              {effectivePlaceholder}
            </span>
          )}
          {selectedOptions.map((o) => (
            <div
              key={o.key}
              title={o.hint}
              className="flex items-center justify-between gap-3 text-sm font-medium rounded-xl pl-3.5 pr-2.5 py-2.5 bg-accent-light text-accent"
            >
              <span className="leading-snug">{o.chipLabel ?? o.label}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(o.key);
                }}
                className="shrink-0 hover:opacity-70 leading-none text-base"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      {open &&
        panelStyle &&
        createPortal(
          <div
            ref={panelRef}
            className="fixed z-[70] overflow-y-auto rounded-xl border shadow-lg"
            style={{
              top: panelStyle.top,
              left: panelStyle.left,
              width: panelStyle.width,
              maxHeight: panelStyle.maxHeight,
              borderColor: 'var(--border)',
              background: 'var(--bg-card)',
            }}
          >
            {options.length === 0 && (
              <p className="text-xs px-3 py-2" style={{ color: 'var(--text-secondary)' }}>
                {t('common.noOptionsAvailable')}
              </p>
            )}
            {options.map((o) => (
              <label
                key={o.key}
                title={o.hint}
                className="flex items-start gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-accent-light"
              >
                <input
                  type="checkbox"
                  checked={selected.has(o.key)}
                  onChange={() => toggle(o.key)}
                  className="mt-0.5 shrink-0"
                />
                <span className="flex-1">{o.label}</span>
              </label>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
