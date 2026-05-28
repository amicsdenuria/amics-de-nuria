import type { DomainStage } from '../stage/stage.types';

export interface DomainRoute {
  id: string;
  slug: string;
  origin: string;
  destiny: string;
  alternativeRoutePoints?: string[];
  routeDesc: string[];
  routeMapUrl: string;
  stages: DomainStage[];
  notes?: string[];
}
