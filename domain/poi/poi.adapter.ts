import { DomainPoi } from './poi.types';
import { GetPoiBySlugQueryResult } from '@/sanity.types';

export const poiFromSanity = (
  data: GetPoiBySlugQueryResult,
): DomainPoi | null => {
  if (!data) return null;

  // Trusting sanity runtime validation
  return {
    id: data.slug!,
    name: data.name!,
    slug: data.slug!,
    location: data.location ?? '',
    image: {
      sanity: data.img
        ? {
            asset: data.img.asset,
            crop: data.img.crop,
            hotspot: data.img.hotspot,
          }
        : null,
      alt: data.img?.alt ?? '',
    },
    text: data.text ?? [],
  };
};

export const poiFromLocal = (data: DomainPoi): DomainPoi => {
  return data;
};
