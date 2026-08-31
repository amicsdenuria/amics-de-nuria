import type { ActivityType } from '@/domain/activity/activity.types';

export const activityTypes = {
  sport: {
    id: 'activity-type-sport',
    slug: 'sport',
    name: 'Esport',
  },
  gastronomy: {
    id: 'activity-type-gastronomy',
    slug: 'gastronomy',
    name: 'Gastronomia',
  },
  culture: {
    id: 'activity-type-culture',
    slug: 'culture',
    name: 'Cultura',
  },
  music: {
    id: 'activity-type-music',
    slug: 'music',
    name: 'Música',
  },
  nature: {
    id: 'activity-type-nature',
    slug: 'nature',
    name: 'Natura',
  },
  games: {
    id: 'activity-type-games',
    slug: 'games',
    name: 'Jocs',
  },
  celebration: {
    id: 'activity-type-celebration',
    slug: 'celebration',
    name: 'Festa',
  },
  workshop: {
    id: 'activity-type-workshop',
    slug: 'workshop',
    name: 'Taller',
  },
  other: {
    id: 'activity-type-other',
    slug: 'other',
    name: 'Altre',
  },
} as const satisfies Record<string, ActivityType>;

export const localActivityTypes: ActivityType[] = Object.values(activityTypes);
