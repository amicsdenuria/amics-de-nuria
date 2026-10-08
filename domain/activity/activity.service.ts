import {
  activityFromLocal,
  activitiesFromLocal,
} from './activity.adapter';
import type { DomainActivity } from './activity.types';
import { LOCAL_FEATURED_ACTIVITY_SLUG } from './activity.constants';
import { dataSource } from '@/config/site.config';
import { localActivities } from '@/content/agenda/data/activities';
import { getAgendaVerification } from '@/content/agenda/data/verificationActivities';
import { selectLatestSpiritActivity } from './activity.selectors';

const ACTIVITIES_DATA_SOURCE = dataSource.agenda.activities;
const FEATURED_ACTIVITY_DATA_SOURCE = dataSource.agenda.featuredActivity;

export const getAgendaNow = (): Date => getAgendaVerification()?.now ?? new Date();
const getLocalActivities = (): DomainActivity[] =>
  getAgendaVerification()?.activities ?? localActivities;

export const getActivities = async (): Promise<DomainActivity[]> => {
  if (ACTIVITIES_DATA_SOURCE === 'local') {
    return activitiesFromLocal(getLocalActivities());
  }

  return [];
};

export const getActivityBySlug = async (
  slug: string,
): Promise<DomainActivity | null> => {
  if (ACTIVITIES_DATA_SOURCE === 'local') {
    const activity = getLocalActivities().find((item) => item.slug === slug);

    return activity ? activityFromLocal(activity) : null;
  }

  return null;
};

export const getFeaturedActivity = async (): Promise<DomainActivity | null> => {
  if (FEATURED_ACTIVITY_DATA_SOURCE === 'local') {
    const verification = getAgendaVerification();
    const featuredSlug = verification ? verification.featuredSlug : LOCAL_FEATURED_ACTIVITY_SLUG;
    const activity = getLocalActivities().find(
      (item) => item.slug === featuredSlug,
    );

    return activity ? activityFromLocal(activity) : null;
  }

  return null;
};

export const getLatestSpiritActivity = async (): Promise<DomainActivity | null> =>
  selectLatestSpiritActivity(await getActivities());
