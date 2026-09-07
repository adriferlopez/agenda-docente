import { forwardRef, type SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, className = '', id, children, style, ...rest }, ref) => {
    return (
      <div className={`flex flex-col ${className}`}>
        {label && (
          <label
            htmlFor={id}
            style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.375rem' }}
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          style={{
            background: 'var(--bg-input)',
            color: 'var(--text-primary)',
            borderColor: 'var(--border-input)',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '10px',
            padding: '0.625rem 1rem',
            fontSize: '0.875rem',
            width: '100%',
            outline: 'none',
            ...style,
          }}
          {...rest}
        >
          {children}
        </select>
      </div>
    );
  }
);
Select.displayName = 'Select';
