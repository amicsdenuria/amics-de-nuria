import {
  GetAllRoutesQueryResult,
  GetRouteBySlugQueryResult,
} from '@/sanity.types';

import { stageFromSanity } from '../stage/stage.adapter';
import { DomainRoute } from './route.types';

export const routeFromSanity = (
  data: GetRouteBySlugQueryResult,
): DomainRoute | null => {
  if (!data) return null;

  // Trusting sanity runtime validation
  return {
    id: data.slug!,
    slug: data.slug!,
    origin: data.origin!,
    destiny: data.destiny!,
    alternativeRoutePoints: data.wayPoints,
    routeDesc: data.description!,
    routeMapUrl: data.mapUrl!,
    stages: (data.stages ?? [])
      .map((stage) => stageFromSanity(stage))
      .filter((stage) => stage !== null),
    notes: data.notes,
  };
};

export const routeFromLocal = (data: DomainRoute): DomainRoute => {
  return data;
};

export const routesFromSanity = (
  data: GetAllRoutesQueryResult,
): DomainRoute[] => {
  return data
    .map((route) => routeFromSanity(route))
    .filter((route) => route !== null);
};

export const routesFromLocal = (data: DomainRoute[]): DomainRoute[] => {
  return data;
};
