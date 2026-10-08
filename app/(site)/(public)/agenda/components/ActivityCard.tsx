import type {
  ActivityDisplayStatus,
  DomainActivity,
} from '@/domain/activity/activity.types';
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { ACTIVITY_TIME_ZONE } from '@/domain/activity/activity.constants';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getActivityDisplayStatus } from '@/domain/activity/activity.selectors';

interface ActivityCardProps {
  activity: DomainActivity;
  now: Date;
  href?: string;
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
  full: 'Completa',
  cancelled: 'Cancel·lada',
  finished: 'Finalitzada',
};
const dateFormatter = new Intl.DateTimeFormat('ca-ES', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: ACTIVITY_TIME_ZONE,
});
const timeFormatter = new Intl.DateTimeFormat('ca-ES', {
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
  timeZone: ACTIVITY_TIME_ZONE,
});

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) return `${minutes} min`;
  return remainingMinutes === 0
    ? `${hours} h`
    : `${hours} h ${remainingMinutes} min`;
}

function ScheduleDate({ label, date }: { label: string; date: Date }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <CalendarIcon
          aria-hidden="true"
          className="size-3.5"
        />
        {label}
      </dt>
      <dd>
        <time
          dateTime={date.toISOString()}
          className="flex flex-col gap-1"
        >
          <span className="text-sm font-medium">
            {dateFormatter.format(date)}
          </span>
          <span className="text-lg font-semibold tabular-nums">
            {timeFormatter.format(date)}
          </span>
        </time>
      </dd>
    </div>
  );
}

export function ActivityCard({ activity, now, href }: ActivityCardProps) {
  const { schedule, location, price, participants } = activity;
  const displayStatus = getActivityDisplayStatus(activity, now);
  const isCancelled = displayStatus === 'cancelled';
  const card = (
    <Card
      className={cn(
        'gap-5 border-border/60 py-5',
        isCancelled && 'border-dashed bg-muted/30 text-muted-foreground/50',
        href &&
          'h-full transition-shadow hover:border-primary/30 hover:shadow-md',
      )}
    >
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

        {/* DESC */}
        <p
          className={cn(
            'line-clamp-3 text-sm leading-relaxed',
            isCancelled ? 'text-muted-foreground/50' : 'text-muted-foreground',
          )}
        >
          {activity.description}
        </p>

        {/* SCHED */}
        <dl className="grow grid grid-cols-1 gap-x-6 gap-y-4 rounded-lg bg-muted/40 p-4 sm:grid-cols-2">
          <ScheduleDate
            label="Inici"
            date={schedule.startDate}
          />
          {schedule.endDate && (
            <ScheduleDate
              label="Fi"
              date={schedule.endDate}
            />
          )}
          {schedule.durationMinutes !== undefined && (
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
      className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {card}
    </Link>
  ) : (
    card
  );
}
