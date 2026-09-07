import type { HTMLAttributes } from 'react';

export default function Card({ className = '', children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`card-pastel card-enter p-5 ${className}`} {...rest}>
      {children}
    </div>
  );
}
