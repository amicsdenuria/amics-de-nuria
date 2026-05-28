import { DomainActivity } from './activity.types';
import { dataSource } from '@/config/site.config';
import { spiritActivity } from '@/content/agenda/data/mockActivity-sortides-esperit';

const DATA_SOURCE = dataSource.agenda.activities;

export const getSpiritActivity = async (): Promise<DomainActivity | null> => {
  if (DATA_SOURCE === 'local') {
    return spiritActivity;
  }

  return null;
};
