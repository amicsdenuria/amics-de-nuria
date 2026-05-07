import { poiFromLocal, poiFromSanity } from './poi.adapter';

import { DomainPoi } from './poi.types';
import { dataSource } from '@/config/site.config';
import { getPoiBySlug as getSanityPoi } from '@/sanity/lib/rutes-itineraris/poi/getPoiBySlug';
import { poisMock } from '@/content/rutes-itineraris/mockData/pois';

const DATA_SOURCE = dataSource.rutesItineraris.pois;

export const getPoiBySlug = async (slug: string): Promise<DomainPoi | null> => {
  if (DATA_SOURCE === 'local') {
    const poi = poisMock.find((p) => p.slug === slug);
    return poi ? poiFromLocal(poi) : null;
  }

  const data = await getSanityPoi({ slug });
  return poiFromSanity(data);
};
