import { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export function TypoP({ children, className }: ComponentProps<'p'>) {
  return (
    <p className={cn('leading-7 not-first:mt-6 text-lg', className)}>
      {children}
    </p>
  );
}

export function TypoH2({ children, className }: ComponentProps<'h2'>) {
  return (
    <h2
      className={cn(
        'text-primary',
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
    >
      {children}
    </h2>
  );
}
