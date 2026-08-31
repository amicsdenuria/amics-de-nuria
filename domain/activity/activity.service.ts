import {
  activityFromLocal,
  activitiesFromLocal,
} from './activity.adapter';
import type { DomainActivity } from './activity.types';
import { LOCAL_FEATURED_ACTIVITY_SLUG } from './activity.constants';
import { dataSource } from '@/config/site.config';
import { localActivities } from '@/content/agenda/data/activities';

const ACTIVITIES_DATA_SOURCE = dataSource.agenda.activities;
const FEATURED_ACTIVITY_DATA_SOURCE = dataSource.agenda.featuredActivity;

export const getActivities = async (): Promise<DomainActivity[]> => {
  if (ACTIVITIES_DATA_SOURCE === 'local') {
    return activitiesFromLocal(localActivities);
  }

  return [];
};

export const getActivityBySlug = async (
  slug: string,
): Promise<DomainActivity | null> => {
  if (ACTIVITIES_DATA_SOURCE === 'local') {
    const activity = localActivities.find((item) => item.slug === slug);

    return activity ? activityFromLocal(activity) : null;
  }

  return null;
};

export const getFeaturedActivity = async (): Promise<DomainActivity | null> => {
  if (FEATURED_ACTIVITY_DATA_SOURCE === 'local') {
    const activity = localActivities.find(
      (item) => item.slug === LOCAL_FEATURED_ACTIVITY_SLUG,
    );

    return activity ? activityFromLocal(activity) : null;
  }

  return null;
};
