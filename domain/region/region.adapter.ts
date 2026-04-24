import {
  GetRegionBySlugQueryResult,
  GetRegionsBySlugsQueryResult,
} from '@/sanity.types';

import { DomainRegion } from './region.types';

export const regionFromSanity = (
  data: GetRegionBySlugQueryResult,
): DomainRegion | null => {
  if (!data || !data.name || !data.slug) return null;

  // Trusting sanity runtime validation
  return {
    id: data.slug,
    name: data.name,
    slug: data.slug,
    province: data.province ?? '',
    image: {
      url: data.img?.asset?.url ?? '',
      alt: data.img?.alt ?? '',
    },
    text: data.text ?? [],
  };
};

export const regionFromLocal = (data: DomainRegion): DomainRegion => {
  return data;
};

export const regionsFromSanity = (
  data: GetRegionsBySlugsQueryResult,
): DomainRegion[] => {
  if (!data || !Array.isArray(data)) return [];

  return data
    .map((item) => regionFromSanity(item))
    .filter((region): region is DomainRegion => region !== null);
};

export const regionsFromLocal = (data: DomainRegion[]): DomainRegion[] => {
  return data;
};
