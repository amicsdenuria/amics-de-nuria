import {
  GetStageBySlugQueryResult,
  GetStagesBySlugsQueryResult,
} from '@/sanity.types';

import { DomainStage } from './stage.types';

export const stageFromSanity = (
  data: GetStageBySlugQueryResult,
): DomainStage | null => {
  if (!data) return null;

  // Trusting sanity runtime validation
  return {
    id: data.slug!,
    slug: data.slug!,
    origin: data.origin!,
    destiny: data.destiny!,
    wayPoints: data.wayPoints,
    stageDesc: data.description!,
    stageMapUrl: data.mapUrl!,
    videoUrl: data.videoUrl,
    regions: (data.regions ?? []).map((region) => ({
      slug: region.slug ?? '',
      name: region.name ?? '',
      img: {
        sanity: region.img
          ? {
              asset: region.img.asset,
              crop: region.img.crop,
              hotspot: region.img.hotspot,
            }
          : null,
        alt: region.img?.alt ?? '',
      },
    })),
    pois: data.pois?.map((poi) => ({
      slug: poi.slug ?? '',
      name: poi.name ?? '',
      img: {
        sanity: poi.img
          ? {
              asset: poi.img.asset,
              crop: poi.img.crop,
              hotspot: poi.img.hotspot,
            }
          : null,
        alt: poi.img?.alt ?? '',
      },
    })),
    trailLocations: data.trailLocations ?? [],
    allocations: data.allocations,
    imgs: data.imgs?.map((img) => ({
      sanity: {
        asset: img.asset,
        crop: img.crop,
        hotspot: img.hotspot,
      },
      alt: img.alt ?? '',
    })),
    notes: data.notes,
    technicalDetails: {
      distance: data.technicalDetails?.distance ?? 0,
      duration: data.technicalDetails?.duration ?? 0,
      initialHeight: data.technicalDetails?.initialHeight ?? 0,
      finalHeight: data.technicalDetails?.finalHeight ?? 0,
      minHeight: data.technicalDetails?.minHeight ?? 0,
      maxHeight: data.technicalDetails?.maxHeight ?? 0,
      cumulativeAscent: data.technicalDetails?.cumulativeAscent ?? 0,
      cumulativeDescent: data.technicalDetails?.cumulativeDescent ?? 0,
    },
  };
};

export const stageFromLocal = (data: DomainStage): DomainStage => {
  return data;
};

export const stagesFromSanity = (
  data: GetStagesBySlugsQueryResult,
): DomainStage[] => {
  return data
    .map((stage) => stageFromSanity(stage))
    .filter((region) => region !== null);
};

export const stagesFromLocal = (data: DomainStage[]): DomainStage[] => {
  return data;
};
