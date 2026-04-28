import { ArrowUpRightIcon, ExternalLinkIcon, LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SocialLinkCardProps {
  label: string;
  href: string;
  subtitle?: string;
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon;
}

const SocialLinkCard = ({
  label,
  href,
  subtitle,
  variant = 'primary',
  icon: Icon = ExternalLinkIcon,
}: SocialLinkCardProps) => {
  const isPrimary = variant === 'primary';

  return (
    <Link
      className="block group"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Card
        className={cn(
          'py-4 transition-all duration-300',
          'hover:shadow-lg hover:-translate-y-1',
          isPrimary
            ? 'hover:border-primary/30 hover:bg-primary/5'
            : 'bg-secondary/30 border-transparent hover:border-border hover:bg-secondary/50',
        )}
      >
        <CardContent className="flex items-center gap-4 px-5">
          {/* Icon container */}
          <div
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300',
              isPrimary
                ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary',
            )}
          >
            <Icon
              name={label}
              className="h-5 w-5"
            />
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <span
              className={cn(
                'block font-medium transition-colors duration-300',
                isPrimary
                  ? 'text-foreground group-hover:text-primary'
                  : 'text-muted-foreground group-hover:text-foreground',
              )}
            >
              {label}
            </span>
            <span className="block text-sm text-muted-foreground truncate">
              {subtitle}
            </span>
          </div>

          {/* Arrow indicator */}
          <ArrowUpRightIcon
            className={cn(
              'h-5 w-5 slide-out-to-right-0 transition-all duration-300',
              'text-muted-foreground/50 group-hover:text-primary',
              'group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
            )}
          />
        </CardContent>
      </Card>
    </Link>
  );
};

export default SocialLinkCard;
