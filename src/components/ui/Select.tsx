import { forwardRef, type SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, className = '', id, children, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-ink-soft">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={`w-full rounded-2xl border border-lav-200 bg-white px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-lav-300 transition ${className}`}
          {...rest}
        >
          {children}
        </select>
      </div>
    );
  }
);
Select.displayName = 'Select';
