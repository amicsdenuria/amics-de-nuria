import type { DomainActivity } from './activity.types';

export interface AgendaActivitySelection {
  nextActivity: DomainActivity | null;
  upcomingActivities: DomainActivity[];
  archivedActivities: DomainActivity[];
}

const byStartDateAscending = (
  first: DomainActivity,
  second: DomainActivity,
): number => first.schedule.startDate.getTime() - second.schedule.startDate.getTime();

const byStartDateDescending = (
  first: DomainActivity,
  second: DomainActivity,
): number => byStartDateAscending(second, first);

export const selectAgendaActivities = (
  activities: readonly DomainActivity[],
  now: Date,
): AgendaActivitySelection => {
  const nowTimestamp = now.getTime();
  const upcomingActivities = activities
    .filter(
      (activity) =>
        activity.schedule.startDate.getTime() >= nowTimestamp &&
        activity.status !== 'finished',
    )
    .toSorted(byStartDateAscending);

  const archivedActivities = activities
    .filter(
      (activity) =>
        activity.schedule.startDate.getTime() < nowTimestamp ||
        activity.status === 'finished',
    )
    .toSorted(byStartDateDescending);

  const nextActivity =
    upcomingActivities.find(
      (activity) =>
        activity.status === 'scheduled' || activity.status === 'full',
    ) ?? null;

  return { nextActivity, upcomingActivities, archivedActivities };
};
