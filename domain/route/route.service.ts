import {
  DomainStage,
  StageRegion,
  TechnicalDetails,
} from '../stage/stage.types';
import {
  routeFromLocal,
  routeFromSanity,
  routesFromLocal,
  routesFromSanity,
} from './route.adapter';

import { dataSource } from '@/config/site.config';
import { getAllRoutes as getSanityAllRoutes } from '@/sanity/lib/rutes-itineraris/route/getAllRoutes';
import { getRouteBySlug as getSanityRoute } from '@/sanity/lib/rutes-itineraris/route/getRouteBySlug';
import { routesMock } from '@/content/rutes-itineraris/mockData/routes';

const DATA_SOURCE = dataSource.rutesItineraris.routes;

export const getRouteBySlug = async (slug: string) => {
  if (DATA_SOURCE === 'local') {
    const route = routesMock.find((r) => r.slug === slug);

    return route ? routeFromLocal(route) : null;
  }

  const route = await getSanityRoute({ slug });
  return routeFromSanity(route);
};

export const getAllRoutes = async () => {
  if (DATA_SOURCE === 'local') {
    return routesFromLocal(routesMock);
  }

  const routes = await getSanityAllRoutes();
  return routesFromSanity(routes);
};

export const getRouteStats = (routeStages: DomainStage[]): TechnicalDetails => {
  if (routeStages.length === 0) {
    return {
      distance: 0,
      duration: 0,
      initialHeight: 0,
      finalHeight: 0,
      minHeight: 0,
      maxHeight: 0,
      cumulativeAscent: 0,
      cumulativeDescent: 0,
    };
  }

  const routeDistance = routeStages.reduce(
    (acc, curr) => curr.technicalDetails.distance + acc,
    0,
  );
  const routeDuration = routeStages.reduce(
    (acc, curr) => curr.technicalDetails.duration + acc,
    0,
  );
  const routeInitHeight = routeStages[0].technicalDetails.initialHeight;
  const routeFinalHeight =
    routeStages[routeStages.length - 1].technicalDetails.finalHeight;
  const routeMinHeight = Math.min(
    ...routeStages.map((stage) => stage.technicalDetails.minHeight),
  );
  const routeMaxHeight = Math.max(
    ...routeStages.map((stage) => stage.technicalDetails.maxHeight),
  );
  const routeCumAsc = routeStages.reduce(
    (acc, curr) => curr.technicalDetails.cumulativeAscent + acc,
    0,
  );
  const routeCumDes = routeStages.reduce(
    (acc, curr) => curr.technicalDetails.cumulativeDescent + acc,
    0,
  );

  const routeStats = {
    distance: routeDistance,
    duration: routeDuration,
    initialHeight: routeInitHeight,
    finalHeight: routeFinalHeight,
    minHeight: routeMinHeight,
    maxHeight: routeMaxHeight,
    cumulativeAscent: routeCumAsc,
    cumulativeDescent: routeCumDes,
  };

  return routeStats;
};

export const getRouteRegions = (routeStages: DomainStage[]): StageRegion[] => {
  const regionsMap = new Map<string, StageRegion>();

  routeStages.forEach((stage) => {
    stage.regions.forEach((region) => {
      regionsMap.set(region.slug, region);
    });
  });

  return Array.from(regionsMap.values());
};
