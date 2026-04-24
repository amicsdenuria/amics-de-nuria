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
      url: data.img?.asset?.url ?? '',
      alt: data.img?.alt ?? '',
    },
    text: data.text ?? [],
  };
};

export const poiFromLocal = (data: DomainPoi): DomainPoi => {
  return data;
};
