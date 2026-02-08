import { Button, SCNButton } from './button';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResponsiveButtonProps extends SCNButton {
  Icon: LucideIcon;
  className?: string;
  iconClassName?: string;
  text?: string;
}

export const ResponsiveButton = ({
  className,
  Icon,
  iconClassName,
  text,
  ...props
}: ResponsiveButtonProps) => {
  return (
    <>
      {/* Mobile: Icon only */}
      <Button
        size="icon"
        className={cn('flex sm:hidden', className)}
        {...props}
      >
        <Icon className={cn('h-4 w-4', iconClassName)} />
        {text && <span className="sr-only">{text}</span>}
      </Button>

      {/* Desktop: Icon + Text */}
      <Button
        className={cn('hidden sm:flex', className)}
        {...props}
      >
        <Icon className={cn('h-4 w-4', iconClassName)} />
        {text && <span>{text}</span>}
      </Button>
    </>
  );
};
