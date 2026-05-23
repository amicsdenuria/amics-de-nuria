import { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export function TypoP({ children, className }: ComponentProps<'p'>) {
  return (
    <p className={cn('leading-7 not-first:mt-6 text-lg', className)}>
      {children}
    </p>
  );
}

export function TypoPVar({ children, className }: ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'max-w-2xl font-light leading-relaxed text-muted-foreground',
        className,
      )}
    >
      {children}
    </p>
  );
}

export function TypoH2Var({ children, className }: ComponentProps<'h2'>) {
  return (
    <h2
      className={cn(
        'scroll-m20 text-3xl md:text-4xl font-light tracking-tight text-foreground',
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function TypoH3Var({ children, className }: ComponentProps<'h3'>) {
  return (
    <h3
      className={cn(
        'scroll-m20 text-2xl md:text-3xl font-light tracking-tight text-foreground',
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function TypoH2({ children, className }: ComponentProps<'h2'>) {
  return (
    <h2
      className={cn(
        'text-primary',
        'scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function TypoSmall({ children, className }: ComponentProps<'span'>) {
  return (
    <span className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </span>
  );
}
