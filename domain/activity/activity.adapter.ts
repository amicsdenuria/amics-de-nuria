import type { DomainActivity } from './activity.types';

export const activityFromLocal = (data: DomainActivity): DomainActivity => {
  return data;
};

export const activitiesFromLocal = (
  data: readonly DomainActivity[],
): DomainActivity[] => {
  return data.map(activityFromLocal);
};
