import type { ActivityDisplayStatus, DomainActivity } from '@/domain/activity/activity.types';
import { getActivityDisplayStatus, selectAgendaActivities } from '@/domain/activity/activity.selectors';

export type ActivityPeriod = 'all' | 'upcoming' | 'archived';
export type ActivityBrowserItem = Pick<DomainActivity,
  'id' | 'slug' | 'title' | 'description' | 'type' | 'status' | 'location' | 'organizer' | 'participants' | 'price'
> & {
  schedule: { startDate: string; endDate?: string; durationMinutes?: number };
  period: Exclude<ActivityPeriod, 'all'>;
  displayStatus: ActivityDisplayStatus;
};

export function parseActivityPeriod(value: string | string[] | undefined): ActivityPeriod {
  return value === 'upcoming' || value === 'archived' ? value : 'all';
}

export function toActivityBrowserItems(activities: DomainActivity[], now: Date): ActivityBrowserItem[] {
  const { upcomingActivities, archivedActivities } = selectAgendaActivities(activities, now);
  const serialize = (activity: DomainActivity, period: ActivityBrowserItem['period']): ActivityBrowserItem => ({
    id: activity.id, slug: activity.slug, title: activity.title, description: activity.description,
    type: activity.type, status: activity.status,
    location: { name: activity.location.name, city: activity.location.city, isOnline: activity.location.isOnline },
    organizer: { name: activity.organizer.name },
    participants: { maxParticipants: activity.participants.maxParticipants }, price: activity.price,
    schedule: {
      startDate: activity.schedule.startDate.toISOString(),
      endDate: activity.schedule.endDate?.toISOString(), durationMinutes: activity.schedule.durationMinutes,
    },
    period, displayStatus: getActivityDisplayStatus(activity, now),
  });
  return [
    ...upcomingActivities.map((activity) => serialize(activity, 'upcoming')),
    ...archivedActivities.map((activity) => serialize(activity, 'archived')),
  ];
}

export function toActivityCardData(item: ActivityBrowserItem): DomainActivity {
  return {
    ...item, isSpiritActivity: false, registration: {},
    schedule: {
      ...item.schedule, startDate: new Date(item.schedule.startDate),
      endDate: item.schedule.endDate ? new Date(item.schedule.endDate) : undefined,
    },
  };
}

export const normalizeActivitySearch = (value: string): string =>
  value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('ca').trim();

export function activitySearchText(item: ActivityBrowserItem): string {
  return normalizeActivitySearch([
    item.title, item.description, item.type.name, item.location.name,
    item.location.city, item.location.isOnline ? 'Online' : '', item.organizer.name,
  ].join(' '));
}
