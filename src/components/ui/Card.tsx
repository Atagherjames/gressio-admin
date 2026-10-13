import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '', ...props }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 shadow-xs p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
