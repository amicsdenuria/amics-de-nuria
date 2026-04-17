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

export interface Stage {
  id: string;
  origin: string;
  destiny: string;
  stageDesc?: string[];
  stageMapUrl: string;
  videoUrl: string;
  regions: string[]; //lista de ids de regions
  trailLocations: TrailLocations;
  technicalDetails: TechnicalDetails;
  allocations: string[];
  pois: string[]; //lista ids de pois
  imgs: string[];
  notes?: string[];
}

export interface POI {
  id: string;
  name: string;
  img: string;
  text: string[];
}

export interface Region {
  id: string;
  name: string;
  img: string;
  text: string[];
}

export interface TrailLocations {
  locationsList: string[];
  tooltip?: string;
}

export interface TechnicalDetails {
  distance: number;
  duration: number;
  initialHeight: number;
  finalHeight: number;
  minHeight: number;
  maxHeight: number;
  cumulativeAscent: number;
  cumulativeDescent: number;
}
