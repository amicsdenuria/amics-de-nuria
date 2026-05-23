import { InfoIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { ResponsiveTooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface TechnicalStatProps {
  icon: ReactNode;
  label: string;
  value: string;
  tooltip?: string;
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info';
}

const TechnicalStat = ({
  icon,
  label,
  value,
  tooltip,
  variant = 'default',
}: TechnicalStatProps) => {
  const variantStyles = {
    default: 'bg-card',
    success: 'bg-emerald-50 dark:bg-emerald-950/30',
    danger: 'bg-rose-50 dark:bg-rose-950/30',
    warning: 'bg-amber-50 dark:bg-amber-950/30',
    info: 'bg-blue-50 dark:bg-blue-950/30',
  };

  const content = (
    <div className={cn('p-4 rounded-lg border', variantStyles[variant])}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1.5">
        {icon}
        <span>{label}</span>
        {tooltip && <InfoIcon className="h-3 w-3" />}
      </div>
      <span className="text-xl font-semibold">{value}</span>
    </div>
  );

  if (tooltip) {
    return (
      <ResponsiveTooltip content={tooltip} contentClassName="max-w-xs">
        {content}
      </ResponsiveTooltip>
    );
  }

  return content;
};

export default TechnicalStat;
