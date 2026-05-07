import {
  regionFromLocal,
  regionFromSanity,
  regionsFromLocal,
  regionsFromSanity,
} from './region.adapter';

import { dataSource } from '@/config/site.config';
import { getRegionBySlug as getSanityRegion } from '@/sanity/lib/rutes-itineraris/region/getRegionBySlug';
import { getRegionsBySlugs as getSanityRegions } from '@/sanity/lib/rutes-itineraris/region/getRegionsBySlugs';
import { regionsMock } from '@/content/rutes-itineraris/mockData/regions';

const DATA_SOURCE = dataSource.rutesItineraris.regions;

export const getRegionBySlug = async (slug: string) => {
  if (DATA_SOURCE === 'local') {
    const region = regionsMock.find((r) => r.slug === slug);
    return region ? regionFromLocal(region) : null;
  }

  const data = await getSanityRegion({ slug });
  return regionFromSanity(data);
};

export const getRegionsBySlugs = async (slugs: string[]) => {
  if (DATA_SOURCE === 'local') {
    const slugsSet = new Set(slugs);
    const regions = regionsMock.filter((r) => slugsSet.has(r.slug));
    return regionsFromLocal(regions);
  }

  const data = await getSanityRegions({ slugs });
  return regionsFromSanity(data);
};
