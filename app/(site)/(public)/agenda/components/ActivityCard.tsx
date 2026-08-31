import {
  ActivityStatus,
  DomainActivity,
} from '@/domain/activity/activity.types';
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface ActivityCardProps {
  activity: DomainActivity;
  href?: string;
}

const statusVariants: Record<
  ActivityStatus,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  scheduled: 'default',
  full: 'secondary',
  cancelled: 'destructive',
  finished: 'outline',
};

const statusLabels: Record<ActivityStatus, string> = {
  scheduled: 'Agendada',
  full: 'Completa',
  cancelled: 'Cancel·lada',
  finished: 'Finalitzada',
};

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ca-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  if (hours === 0) return `${minutes} min`;
  const mins = minutes % 60;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}

export function ActivityCard({ activity, href = '#' }: ActivityCardProps) {
  const { schedule, location, price, participants } = activity;

  return (
    <Link href={href}>
      <Card className="group cursor-pointer border-border/60 py-0 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
        <CardContent className="flex h-full flex-col gap-4 p-5">
          <div className="flex items-start justify-between">
            {/* Title */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-serif text-lg font-semibold text-primary leading-snug text-pretty">
                {activity.title}
              </h3>
            </div>

            {/* Type badge + Status */}
            <div className="flex items-start justify-between gap-3 min-w-fit">
              <div className="space-x-2">
                <Badge
                  variant="outline"
                  className="text-xs font-normal"
                >
                  {activity.type.name}
                </Badge>
                {activity.status !== 'scheduled' && (
                  <Badge
                    variant={statusVariants[activity.status]}
                    className="text-xs"
                  >
                    {statusLabels[activity.status]}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Info row */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5 text-foreground">
              <CalendarIcon className="size-3.5 text-muted-foreground" />
              <span>{formatDate(schedule.startDate)}</span>
            </div>
            {schedule.durationMinutes && (
              <>
                <div className="h-3 w-px bg-border" />
                <div className="flex items-center gap-1.5 text-foreground">
                  <ClockIcon className="size-3.5 text-muted-foreground" />
                  <span>{formatDuration(schedule.durationMinutes)}</span>
                </div>
              </>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPinIcon className="size-3.5 shrink-0" />
            <span className="truncate">
              {location.isOnline ? 'Online' : location.name}
              {location.city && !location.isOnline && `, ${location.city}`}
            </span>
          </div>
        </CardContent>

        <CardFooter className="mb-6 border-t">
          {/* Footer: Price + Participants */}
          <div className="w-full flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-foreground">
              {price.isFree ? 'Gratuïta' : `${price.amount?.toFixed(2)} €`}
            </span>
            {participants.maxParticipants && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <UsersIcon className="size-3.5" />
                <span>Màx. {participants.maxParticipants}</span>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
