import type {
  ActivityDisplayStatus,
  DomainActivity,
} from '@/domain/activity/activity.types';
import { ClockIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { ActivityScheduleDates } from './ActivityScheduleDates';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getActivityDisplayStatus } from '@/domain/activity/activity.selectors';
import OptimizedImage from '@/components/OptimizedImage';
import { getImageProps } from '@/sanity/lib/image';

interface ActivityCardProps {
  activity: DomainActivity;
  now: Date;
  href?: string;
  prefetch?: boolean;
  imageSizes?: string;
}

const statusVariants: Record<
  ActivityDisplayStatus,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  scheduled: 'default',
  full: 'secondary',
  cancelled: 'destructive',
  finished: 'outline',
};
const statusLabels: Record<ActivityDisplayStatus, string> = {
  scheduled: 'Agendada',
  full: 'Sense places',
  cancelled: 'Cancel·lada',
  finished: 'Finalitzada',
};
function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) return `${minutes} min`;
  return remainingMinutes === 0
    ? `${hours} h`
    : `${hours} h ${remainingMinutes} min`;
}

export function ActivityCard({ activity, now, href, prefetch,
  imageSizes = '(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw',
}: ActivityCardProps) {
  const { schedule, location, price, participants } = activity;
  const displayStatus = getActivityDisplayStatus(activity, now);
  const isCancelled = displayStatus === 'cancelled';
  const imageSizing = {
    fill: true as const, sizes: imageSizes, targetWidth: 1200, targetHeight: 675,
  };
  const image = getImageProps(activity.content?.mainImage, imageSizing)
    ?? getImageProps({ url: '/activity-default.webp', alt: '' }, imageSizing);
  const card = (
    <Card
      className={cn(
        'gap-5 overflow-hidden border-border/60 pt-0 pb-5',
        isCancelled && 'border-dashed bg-muted/30 text-muted-foreground/50',
        href &&
          'h-full transition-shadow hover:border-primary/30 hover:shadow-md',
      )}
    >
      {image ? (
        <div className="relative aspect-video w-full shrink-0">
          <OptimizedImage {...image} className={cn('object-cover', isCancelled && 'opacity-50')} />
        </div>
      ) : null}
      <CardHeader className="flex flex-row items-start justify-between gap-3 px-5">
        <CardTitle className="min-w-0 flex-1">
          <h3
            className={cn(
              'font-serif text-lg leading-snug text-pretty line-clamp-1',
              isCancelled
                ? 'text-muted-foreground/50 line-through'
                : 'text-primary',
            )}
          >
            {activity.title}
          </h3>
        </CardTitle>
        <div className="flex max-w-1/2 shrink-0 flex-wrap justify-end gap-2">
          <Badge variant="outline">{activity.type.name}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5 px-5">
        {/* UBI */}
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPinIcon
            aria-hidden="true"
            className="mt-0.5 size-3.5 shrink-0"
          />
          <span
            className={cn(
              isCancelled
                ? 'text-muted-foreground/50'
                : 'text-muted-foreground',
            )}
          >
            {location.isOnline ? 'Online' : location.name}
            {location.city && !location.isOnline && `, ${location.city}`}
          </span>
        </div>

        {/* INTRO */}
        <p
          className={cn(
            'line-clamp-3 text-sm leading-relaxed',
            isCancelled ? 'text-muted-foreground/50' : 'text-muted-foreground',
          )}
        >
          {activity.intro}
        </p>

        {/* SCHED */}
        <dl className="grow grid grid-cols-1 gap-x-6 gap-y-4 rounded-lg bg-muted/40 p-4 sm:grid-cols-2">
          <ActivityScheduleDates schedule={schedule} compact />
          {schedule.mode !== 'allDay' && schedule.durationMinutes !== undefined && (
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ClockIcon
                  aria-hidden="true"
                  className="size-3.5"
                />
                Durada
              </dt>
              <dd className="text-sm font-medium">
                {formatDuration(schedule.durationMinutes)}
              </dd>
            </div>
          )}
        </dl>
      </CardContent>
      <CardFooter className="flex-wrap justify-between gap-3 border-t px-5 [.border-t]:pt-4">
        <span className="text-sm font-medium">
          {price.isFree ? 'Gratuïta' : `${price.amount?.toFixed(2)} €`}
        </span>
        {displayStatus !== 'scheduled' ? (
          <Badge variant={statusVariants[displayStatus]}>
            {statusLabels[displayStatus]}
          </Badge>
        ) : participants.maxParticipants ? (
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <UsersIcon
              aria-hidden="true"
              className="size-3.5"
            />
            Màx. {participants.maxParticipants}
          </span>
        ) : null}
      </CardFooter>
    </Card>
  );
  return href ? (
    <Link
      href={href}
      prefetch={prefetch}
      className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {card}
    </Link>
  ) : (
    card
  );
}
