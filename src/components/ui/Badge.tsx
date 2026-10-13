import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'emerald' | 'amber' | 'rose' | 'indigo' | 'slate' | 'sky';
  className?: string;
}

export const Badge = ({
  children,
  variant = 'slate',
  className = '',
}: BadgeProps) => {
  const variantStyles = {
    indigo: 'bg-[#EEF0FF] text-[#563CF9] border-[#C5C6FF]/60 ring-1 ring-[#563CF9]/10 font-bold',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/60 ring-1 ring-emerald-500/10',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/60 ring-1 ring-amber-500/10',
    rose: 'bg-rose-50 text-rose-700 border-rose-200/60 ring-1 ring-rose-500/10',
    sky: 'bg-sky-50 text-sky-700 border-sky-200/60 ring-1 ring-sky-500/10',
    slate: 'bg-slate-100 text-slate-700 border-slate-200 ring-1 ring-slate-400/10',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
};
