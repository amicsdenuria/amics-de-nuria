import type { DomainActivity } from './activity.types';

export const activityFromLocal = (data: DomainActivity): DomainActivity | null => {
  const requiredText = [
    data.id, data.slug, data.title, data.description,
    data.type?.id, data.type?.slug, data.type?.name,
    data.location?.name, data.organizer?.name,
  ];
  if (
    requiredText.some((value) => typeof value !== 'string' || !value.trim()) ||
    !['scheduled', 'full', 'cancelled'].includes(data.status) ||
    !(data.schedule?.startDate instanceof Date) ||
    !Number.isFinite(data.schedule.startDate.getTime()) ||
    typeof data.location?.isOnline !== 'boolean' ||
    typeof data.price?.isFree !== 'boolean' ||
    (!data.price.isFree && (
      typeof data.price.amount !== 'number' ||
      !Number.isFinite(data.price.amount) || data.price.amount < 0
    ))
  ) return null;
  return { ...data, isSpiritActivity: data.isSpiritActivity === true };
};

export const activitiesFromLocal = (
  data: readonly DomainActivity[],
): DomainActivity[] => {
  return data.map(activityFromLocal).filter((activity) => activity !== null);
};
