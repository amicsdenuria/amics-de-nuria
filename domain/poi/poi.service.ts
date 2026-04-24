import { poiFromLocal, poiFromSanity } from './poi.adapter';

import { DomainPoi } from './poi.types';
import { getPoiBySlug as getSanityPoi } from '@/sanity/lib/pelegrinatges/poi/getPoiBySlug';
import { poisMock } from '@/content/pelegrinatges/data/pois';

const DATA_SOURCE: 'local' | 'sanity' = 'local';

export const getPoiBySlug = async (slug: string): Promise<DomainPoi | null> => {
  if (DATA_SOURCE === 'local') {
    const poi = poisMock.find((p) => p.slug === slug);
    return poi ? poiFromLocal(poi) : null;
  }

  const data = await getSanityPoi({ slug });
  return poiFromSanity(data);
};
