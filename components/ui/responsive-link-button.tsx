import { Button, SCNButton } from './button';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResponsiveLinkButtonProps extends SCNButton {
  Icon: LucideIcon;
  iconClassName?: string;
  href: string;
  text?: string;
  prefetch?: boolean | 'auto' | null;
}

export const ResponsiveLinkButton = ({
  Icon,
  iconClassName,
  text,
  href,
  prefetch = null,
  ...props
}: ResponsiveLinkButtonProps) => {
  return (
    <>
      {/* Mobile: Icon only */}
      <Button
        size="icon"
        className="flex sm:hidden"
        asChild
        {...props}
      >
        <Link
          href={href}
          prefetch={prefetch}
        >
          <Icon className={cn('h-4 w-4', iconClassName)} />
          {text && <span className="sr-only">{text}</span>}
        </Link>
      </Button>

      {/* Desktop: Icon + Text */}
      <Button
        className="hidden sm:flex"
        asChild
        {...props}
      >
        <Link
          href={href}
          prefetch={prefetch}
        >
          <Icon className={cn('h-4 w-4', iconClassName)} />
          {text && <span>{text}</span>}
        </Link>
      </Button>
    </>
  );
};
