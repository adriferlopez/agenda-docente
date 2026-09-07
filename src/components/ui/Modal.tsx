import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { IconX } from '@/components/ui/icons';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  widthClass?: string;
}

export default function Modal({ open, onClose, title, children, widthClass = 'max-w-md' }: ModalProps) {
  if (!open) return null;

  return createPortal(
    /* ✅ Overlay: animación de opacity (GPU).
       Se monta con un Portal directamente en <body> para que el modal NUNCA
       dependa del árbol de componentes en el que se invoque: si un
       ancestro (p.ej. una <Card>) tiene transform/will-change/filter, crea
       un "containing block" nuevo para todo lo que sea position:fixed dentro
       de él, y el modal quedaría atrapado en ese recuadro en vez de cubrir
       toda la pantalla. El Portal evita ese problema de raíz, para siempre. */
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center px-4 py-6 overflow-y-auto overflow-x-hidden"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* ✅ Panel: animación de translateY + scale + opacity (GPU).
          min-w-0: el panel es un ítem flex del overlay (flex items-center
          justify-center); por defecto el min-width de un ítem flex es
          "auto" (= el ancho mínimo de su contenido), no 0. Si algo dentro
          del formulario tenía un ancho mínimo de contenido mayor que
          max-w-sm/md, el panel podía crecer más allá de esos límites pese a
          tenerlos fijados, y como min-width:auto gana sobre un width
          explícito en flexbox, ni el overflow-x-hidden de aquí abajo lo
          arreglaba: el panel entero (la caja, no solo su contenido) se
          salía de la pantalla. Esta es la causa real del desborde lateral
          en los formularios de Festivos/Excursiones en móvil. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`modal-panel w-full min-w-0 ${widthClass} max-h-[90vh] overflow-y-auto overflow-x-hidden`}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          boxShadow: '0 20px 60px -12px rgba(0,0,0,0.25)',
        }}
      >
        {/* Cabecera fija (sticky) dentro del panel: si el contenido es largo y
            hay que hacer scroll, el título y el botón de cerrar nunca
            desaparecen de la vista. */}
        <div
          className="flex items-center justify-between px-6 pt-6 pb-5 sticky top-0 z-10"
          style={{ background: 'var(--bg-card)', borderRadius: '16px 16px 0 0' }}
        >
          <h2
            id="modal-title"
            className="font-display text-2xl"
            style={{ color: 'var(--text-primary)', fontWeight: 700 }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="btn-base rounded-full p-1.5"
            style={{ color: 'var(--text-secondary)', background: 'var(--border)' }}
          >
            <IconX size={16} />
          </button>
        </div>
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>,
    document.body
  );
}
