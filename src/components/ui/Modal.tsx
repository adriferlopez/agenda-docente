import type { ReactNode } from 'react';
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 px-4 py-6 overflow-y-auto">
      <div className={`w-full ${widthClass} card-pastel p-6 max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-ink">{title}</h2>
          <button
            onClick={onClose}
            className="text-ink-soft hover:text-ink rounded-full p-1 hover:bg-lav-50"
            aria-label="Cerrar"
          >
            <IconX size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
