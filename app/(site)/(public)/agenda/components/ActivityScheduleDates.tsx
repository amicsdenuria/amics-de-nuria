import { CalendarIcon } from 'lucide-react';
import { ACTIVITY_TIME_ZONE } from '@/domain/activity/activity.constants';
import { madridDay, scheduleCaption } from '@/domain/activity/activity.schedule';
import type { ActivitySchedule } from '@/domain/activity/activity.types';

const dates = new Intl.DateTimeFormat('ca-ES', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: ACTIVITY_TIME_ZONE,
});
const hours = new Intl.DateTimeFormat('ca-ES', {
  hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: ACTIVITY_TIME_ZONE,
});

export function ActivityScheduleDates({ schedule, compact = false }: { schedule: ActivitySchedule; compact?: boolean }) {
  const { startDate, endDate, endDateOnly } = schedule;
  const caption = scheduleCaption(schedule);
  const sameDay = endDate && madridDay(startDate) === madridDay(endDate);
  const separateEnd = endDate && !caption && !sameDay;
  const dateLabel = caption && endDate ? dates.formatRange(startDate, endDate) : dates.format(startDate);
  const clockLabel = caption ?? (sameDay && !endDateOnly
    ? `${hours.format(startDate)}–${hours.format(endDate)} h` : `${hours.format(startDate)} h`);

  function field(label: string, day: string, dateTime?: string, clock?: string) {
    return (
      <div className="flex min-w-0 flex-col gap-1">
        <dt className={`flex items-center gap-1.5 text-muted-foreground ${compact ? 'text-xs' : 'text-sm'}`}>
          <CalendarIcon aria-hidden="true" className="size-3.5 shrink-0" />{label}
        </dt>
        <dd className="flex flex-col gap-1">
          <span className={compact ? 'text-sm font-medium' : undefined}>
            {dateTime ? <time dateTime={dateTime}>{day}</time> : day}
          </span>
          {clock && <span className={caption ? 'text-sm text-muted-foreground' : `font-semibold tabular-nums ${compact ? 'text-lg' : 'text-2xl'}`}>{clock}</span>}
        </dd>
      </div>
    );
  }
  return (
    <>
      {field(separateEnd ? 'Inici' : 'Data', dateLabel,
        caption ? (endDate && !sameDay ? undefined : madridDay(startDate)) : startDate.toISOString(), clockLabel)}
      {separateEnd && field('Fi', dates.format(endDate),
        endDateOnly ? madridDay(endDate) : endDate.toISOString(), endDateOnly ? undefined : hours.format(endDate) + ' h')}
    </>
  );
}
