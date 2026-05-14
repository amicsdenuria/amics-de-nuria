import { routeFromLocal, routeFromSanity } from '../route/route.adapter';

import { dataSource } from '@/config/site.config';
import { getCurrentRoute as getSanityCurrentRoute } from '@/sanity/lib/rutes-itineraris/currentRoute/getCurrentRoute';
import { routesMock } from '@/content/rutes-itineraris/mockData/routes';

const DATA_SOURCE = dataSource.rutesItineraris.currentRoute;

export const getCurrentRoute = async () => {
  if (DATA_SOURCE === 'local') {
    const route = routesMock[0];

    return route ? routeFromLocal(route) : null;
  }

  const route = await getSanityCurrentRoute();
  return routeFromSanity(route);
};
