import type { DomainPoi } from '@/domain/poi/poi.types';
import type { DomainRegion } from '@/domain/region/region.types';
import type { DomainRoute } from '@/domain/route/route.types';
import type { DomainStage } from '@/domain/stage/stage.types';
import type { PrimaryPageHeroProps } from '../components/PrimaryPageHero';
import { getImageProps } from '@/sanity/lib/image';

const HERO_IMAGE_SRC = '/hero-muntanya-nuria.webp';
const HERO_IMAGE_ALT = 'Vall de Núria';

const mapPointsDescription = (points?: string[]): string | undefined =>
  points?.length ? points.join(' - ') : undefined;

export const mapRouteHero = (route: DomainRoute): PrimaryPageHeroProps => ({
  pretitle: 'Ruta',
  title: `${route.origin} - ${route.destiny}`,
  description: mapPointsDescription(route.alternativeRoutePoints),
  img: {
    src: HERO_IMAGE_SRC,
    alt: HERO_IMAGE_ALT,
    className: 'object-top',
  },
});

export const mapStageHero = (stage: DomainStage): PrimaryPageHeroProps => ({
  pretitle: 'Etapa',
  title: `${stage.origin} - ${stage.destiny}`,
  description: mapPointsDescription(stage.wayPoints),
  img: {
    src: HERO_IMAGE_SRC,
    alt: HERO_IMAGE_ALT,
    className: 'object-top',
  },
});

export const mapPoiHero = (poi: DomainPoi): PrimaryPageHeroProps => ({
  pretitle: "Punt d'interès",
  title: poi.name,
  description: poi.location,
  img:
    getImageProps(poi.image, {
      fill: true,
      sizes: '100vw',
      targetWidth: 1920,
      targetHeight: 1080,
    }) ?? undefined,
});

export const mapRegionHero = (region: DomainRegion): PrimaryPageHeroProps => ({
  pretitle: 'Comarca',
  title: region.name,
  description: region.province,
  img:
    getImageProps(region.image, {
      fill: true,
      sizes: '100vw',
      targetWidth: 1920,
      targetHeight: 1080,
    }) ?? undefined,
});
