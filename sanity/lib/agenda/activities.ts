import { AGENDA_SINGLETON_IDS } from '@/sanity/agenda.constants';
import { sanityFetch } from '../live';
import {
  activitiesQuery,
  activityBySlugQuery,
  currentSpiritActivityQuery,
  featuredActivityQuery,
} from './queries';

// Public Agenda always reads published content, including when Studio has drafts.
const published = { perspective: 'published', stega: false } as const;

export const getSanityActivities = async () =>
  (await sanityFetch({ query: activitiesQuery, ...published })).data;

export const getSanityActivityBySlug = async (slug: string) =>
  (await sanityFetch({ query: activityBySlugQuery, params: { slug }, ...published })).data;

export const getSanityFeaturedActivity = async () =>
  (await sanityFetch({
    query: featuredActivityQuery,
    params: { singletonId: AGENDA_SINGLETON_IDS.featuredActivity },
    ...published,
  })).data;

export const getSanityCurrentSpiritActivity = async () =>
  (await sanityFetch({
    query: currentSpiritActivityQuery,
    params: { singletonId: AGENDA_SINGLETON_IDS.currentSpiritActivity },
    ...published,
  })).data;
