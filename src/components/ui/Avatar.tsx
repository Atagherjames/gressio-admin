import React, { useState, useEffect } from 'react';

export interface AvatarProps {
  src?: string | null;
  name?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'rounded';
  className?: string;
}

const sizeClasses = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-14 h-14 text-xl',
  '2xl': 'w-20 h-20 text-2xl',
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = '',
  alt,
  size = 'md',
  shape = 'circle',
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  // Reset error state when src changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  const initials = (name || '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || '?';

  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-2xl';

  return (
    <div
      className={`relative inline-flex items-center justify-center font-bold overflow-hidden select-none shrink-0 bg-[#EEF0FF] text-[#563CF9] border border-[#C5C6FF]/40 ${sizeClasses[size]} ${shapeClass} ${className}`}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt || name || 'User profile'}
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};
