import {
  activityFromLocal,
  activitiesFromLocal,
} from './activity.adapter';
import type { DomainActivity } from './activity.types';
import { LOCAL_CURRENT_SPIRIT_ACTIVITY_ID, LOCAL_FEATURED_ACTIVITY_SLUG } from './activity.constants';
import { dataSource } from '@/config/site.config';
import { localActivities } from '@/content/agenda/data/activities';
import { getAgendaVerification } from '@/content/agenda/data/verificationActivities';
import { activityFromSanity, activitiesFromSanity } from './activity.sanity-adapter';
import {
  getSanityActivities,
  getSanityActivityBySlug,
  getSanityCurrentSpiritActivity,
  getSanityFeaturedActivity,
} from '@/sanity/lib/agenda/activities';

const ACTIVITIES_DATA_SOURCE = dataSource.agenda.activities;
const FEATURED_ACTIVITY_DATA_SOURCE = dataSource.agenda.featuredActivity;
const CURRENT_SPIRIT_ACTIVITY_DATA_SOURCE = dataSource.agenda.currentSpiritActivity;

export const getAgendaNow = (): Date => getAgendaVerification()?.now ?? new Date();
const getLocalActivities = (): DomainActivity[] =>
  getAgendaVerification()?.activities ?? localActivities;

export const getActivities = async (): Promise<DomainActivity[]> => {
  if (ACTIVITIES_DATA_SOURCE === 'local') {
    return activitiesFromLocal(getLocalActivities());
  }

  return activitiesFromSanity(await getSanityActivities());
};

export const getActivityBySlug = async (
  slug: string,
): Promise<DomainActivity | null> => {
  if (ACTIVITIES_DATA_SOURCE === 'local') {
    const activity = getLocalActivities().find((item) => item.slug === slug);

    return activity ? activityFromLocal(activity) : null;
  }

  return activityFromSanity(await getSanityActivityBySlug(slug));
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

  return activityFromSanity(await getSanityFeaturedActivity());
};

export const getCurrentSpiritActivity = async (): Promise<DomainActivity | null> => {
  let activity: DomainActivity | null;
  if (CURRENT_SPIRIT_ACTIVITY_DATA_SOURCE === 'local') {
    const verification = getAgendaVerification();
    const selectedId = verification ? verification.currentSpiritId : LOCAL_CURRENT_SPIRIT_ACTIVITY_ID;
    const selected = getLocalActivities().find((item) => item.id === selectedId);
    activity = selected ? activityFromLocal(selected) : null;
  } else {
    activity = activityFromSanity(await getSanityCurrentSpiritActivity());
  }
  return activity?.isSpiritActivity ? activity : null;
};
