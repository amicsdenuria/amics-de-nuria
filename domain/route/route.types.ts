export interface DomainRoute {
  id: string;
  slug: string;
  origin: string;
  destiny: string;
  alternativeRoutePoints?: string[];
  routeDesc: string[];
  routeMapUrl: string;
  stages: string[];
  notes?: string[];
}
