import { ACTIVITY_TIME_ZONE } from './activity.constants';
import type { ActivitySchedule, ScheduleMode } from './activity.types';

export const scheduleLabels = {
  pending: 'Hora pendent de confirmar',
  timed: 'Amb horari',
  allDay: 'Tot el dia',
} as const satisfies Record<ScheduleMode, string>;

const madrid = new Intl.DateTimeFormat('sv-SE', {
  timeZone: ACTIVITY_TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
});
const dayPattern = /^\d{4}-\d{2}-\d{2}$/;
const localPattern = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})$/;
const instantPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})$/;
const madridStamp = (date: Date) => madrid.format(date).replace(' ', 'T');
export const madridDay = (date: Date) => madridStamp(date).slice(0, 10);

// Test the offsets on either side of this day. In an autumn overlap use the
// earlier occurrence. A spring clock time that never occurred has no match.
function madridInstant(day: string, clock: string): Date | undefined {
  const stamp = day + 'T' + clock;
  const utc = Date.parse(stamp + ':00Z');
  if (!Number.isFinite(utc)) return undefined;
  for (const delta of [-86400000, 86400000]) {
    const probe = utc + delta;
    const offset = Date.parse(madridStamp(new Date(probe)) + ':00Z') - probe;
    const result = new Date(utc - offset);
    if (madridStamp(result) === stamp) return result;
  }
}

export function scheduleDateParts(value?: string) {
  if (!value) return { day: '', clock: '' };
  if (dayPattern.test(value)) return { day: value, clock: '' };
  const local = localPattern.exec(value);
  if (local) return { day: local[1], clock: local[2] };
  const instant = new Date(value);
  if (instantPattern.test(value) && Number.isFinite(instant.getTime())) {
    const [day, clock] = madridStamp(instant).split('T');
    return { day, clock };
  }
  return { day: '', clock: '' };
}

export function scheduleInstant(value: unknown, mode: ScheduleMode): Date | undefined {
  if (typeof value !== 'string') return undefined;
  const sourceDay = value.slice(0, 10);
  const dayCheck = new Date(sourceDay + 'T00:00:00Z');
  if (!Number.isFinite(dayCheck.getTime()) || dayCheck.toISOString().slice(0, 10) !== sourceDay) return undefined;
  const { day, clock } = scheduleDateParts(value);
  if (!day) return undefined;
  if (mode === 'timed' && instantPattern.test(value)) return new Date(value);
  return madridInstant(day, mode === 'timed' && clock ? clock : '00:00');
}

export function scheduleCaption(schedule: ActivitySchedule) {
  if (schedule.mode === 'allDay') return scheduleLabels.allDay;
  if (schedule.mode === 'pending') return schedule.endDate && madridDay(schedule.endDate) !== madridDay(schedule.startDate)
    ? 'Horari pendent de confirmar' : scheduleLabels.pending;
}
