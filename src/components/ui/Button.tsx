import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, CSSProperties> = {
  primary:   { background: 'var(--accent)', color: 'white', boxShadow: 'var(--shadow-btn)' },
  secondary: { background: 'var(--accent-light)', color: 'var(--accent-text)', border: '1px solid var(--border)' },
  ghost:     { background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border)' },
  danger:    { background: '#F87171', color: 'white' },
};

const variantClass: Record<Variant, string> = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  ghost:     'btn-ghost',
  danger:    'btn-danger',
};

const sizeStyles: Record<Size, CSSProperties> = {
  sm: { padding: '0.375rem 0.875rem', fontSize: '0.75rem', gap: '0.375rem' },
  md: { padding: '0.625rem 1.25rem',  fontSize: '0.875rem', gap: '0.5rem' },
  lg: { padding: '0.75rem 1.5rem',    fontSize: '1rem',     gap: '0.5rem' },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth,
  className = '',
  style,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`btn-base btn-rounded ${variantClass[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      style={{ ...variantStyles[variant], ...sizeStyles[size], ...style }}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
