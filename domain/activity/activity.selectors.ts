import type { ActivityDisplayStatus, DomainActivity } from './activity.types';
import { ACTIVITY_TIME_ZONE } from './activity.constants';

export interface AgendaActivitySelection {
  nextActivity: DomainActivity | null;
  upcomingActivities: DomainActivity[];
  archivedActivities: DomainActivity[];
}

const byIdAscending = (first: DomainActivity, second: DomainActivity): number =>
  first.id < second.id ? -1 : first.id > second.id ? 1 : 0;

const byStartDateAscending = (
  first: DomainActivity,
  second: DomainActivity,
): number =>
  first.schedule.startDate.getTime() - second.schedule.startDate.getTime() ||
  byIdAscending(first, second);

const byStartDateDescending = (
  first: DomainActivity,
  second: DomainActivity,
): number =>
  second.schedule.startDate.getTime() - first.schedule.startDate.getTime() ||
  byIdAscending(first, second);

const dayFormatter = new Intl.DateTimeFormat('en', {
  timeZone: ACTIVITY_TIME_ZONE,
  year: 'numeric', month: '2-digit', day: '2-digit',
});
const dayKey = (date: Date): string => {
  const parts = Object.fromEntries(
    dayFormatter.formatToParts(date).map(({ type, value }) => [type, value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
};

export const getActivityEndDate = (activity: DomainActivity): Date | null => {
  const { startDate, endDate, durationMinutes } = activity.schedule;
  if (endDate && Number.isFinite(endDate.getTime())) return endDate;
  if (durationMinutes === undefined || !Number.isFinite(durationMinutes) || durationMinutes < 0) return null;
  const end = new Date(startDate.getTime() + durationMinutes * 60_000);
  return Number.isFinite(end.getTime()) ? end : null;
};

export const isActivityArchived = (activity: DomainActivity, now: Date): boolean =>
  dayKey(getActivityEndDate(activity) ?? activity.schedule.startDate) < dayKey(now);

export const isActivityFinished = (activity: DomainActivity, now: Date): boolean => {
  const end = getActivityEndDate(activity);
  return end ? now.getTime() >= end.getTime() : isActivityArchived(activity, now);
};

export const getActivityDisplayStatus = (activity: DomainActivity, now: Date): ActivityDisplayStatus =>
  activity.status === 'cancelled' ? 'cancelled' : isActivityFinished(activity, now) ? 'finished' : activity.status;

export const getActivityRegistrationUrl = (
  activity: DomainActivity, now: Date,
): string | null => {
  if (isActivityFinished(activity, now) || activity.status === 'cancelled') {
    return null;
  }
  try {
    const url = new URL(activity.registration.registrationUrl ?? '');
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
};

export const selectAgendaActivities = (
  activities: readonly DomainActivity[],
  now: Date,
): AgendaActivitySelection => {
  const upcomingActivities = activities
    .filter((activity) => !isActivityArchived(activity, now))
    .toSorted(byStartDateAscending);

  const archivedActivities = activities
    .filter((activity) => isActivityArchived(activity, now))
    .toSorted(byStartDateDescending);

  const nextActivity =
    upcomingActivities.find(
      (activity) =>
        activity.status !== 'cancelled' && !isActivityFinished(activity, now),
    ) ?? null;

  return { nextActivity, upcomingActivities, archivedActivities };
};
