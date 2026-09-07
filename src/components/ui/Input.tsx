import { forwardRef, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react';
import type React from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const baseInputStyle: React.CSSProperties = {
  background: 'var(--bg-input)',
  color: 'var(--text-primary)',
  border: '1px solid var(--border-input)',
  borderRadius: '10px',
  padding: '0.625rem 1rem',
  fontSize: '0.875rem',
  width: '100%',
  outline: 'none',
  /* ✅ Solo opacity en transición (GPU-friendly) */
  transition: 'opacity 120ms ease',
  fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.8125rem',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  display: 'block',
  marginBottom: '0.375rem',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', id, style, ...rest }, ref) => (
    // min-w-0: por defecto, el min-width de un elemento dentro de un
    // contenedor flex/grid es "auto" (= el ancho de su contenido), no 0. Con
    // inputs de ancho intrínseco grande (sobre todo <input type="date">, que
    // el navegador dibuja con un ancho mínimo propio para sus segmentos
    // día/mes/año) eso impedía que se encogieran por debajo de ese ancho
    // dentro de una fila/columna estrecha, y se salían del contenedor
    // (modal, grid) en vez de respetar el 100% ya fijado en baseInputStyle.
    <div className={`flex flex-col min-w-0 ${className}`}>
      {label && <label htmlFor={id} style={labelStyle}>{label}</label>}
      <div className="relative min-w-0">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--text-secondary)' }}>
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          style={{
            ...baseInputStyle,
            minWidth: 0,
            ...(icon ? { paddingLeft: '2.25rem' } : {}),
            ...(error ? { borderColor: '#F87171' } : {}),
            ...style,
          }}
          /* ✅ focus-visible via CSS global, placeholder vía CSS */
          className="placeholder:opacity-40 focus-visible:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
          {...rest}
        />
      </div>
      {error && <span className="text-xs mt-1" style={{ color: 'var(--danger-text)' }}>{error}</span>}
    </div>
  )
);
Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, style, spellCheck = true, ...rest }, ref) => (
    <div className={`flex flex-col ${className}`}>
      {label && <label htmlFor={id} style={labelStyle}>{label}</label>}
      <textarea
        ref={ref}
        id={id}
        spellCheck={spellCheck}
        style={{
          ...baseInputStyle,
          resize: 'none',
          ...(error ? { borderColor: '#F87171' } : {}),
          ...style,
        }}
        className="placeholder:opacity-40 disabled:opacity-50 disabled:cursor-not-allowed"
        {...rest}
      />
      {error && <span className="text-xs mt-1" style={{ color: 'var(--danger-text)' }}>{error}</span>}
    </div>
  )
);
Textarea.displayName = 'Textarea';
