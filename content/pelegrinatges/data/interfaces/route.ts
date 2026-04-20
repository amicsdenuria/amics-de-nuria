export interface Route {
  id: string;
  origin: string;
  destiny: string;
  alternativeRoutePoints?: string[];
  routeDesc: string[];
  routeMapUrl: string;
  stages: string[]; //lista ids de stages
  notes?: string[];
}
