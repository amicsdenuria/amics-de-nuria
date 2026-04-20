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

export interface Stage {
  id: string;
  origin: string;
  destiny: string;
  stageDesc?: string[];
  stageMapUrl: string;
  videoUrl: string;
  regions: string[]; //lista de ids de regions
  trailLocations: string[];
  technicalDetails: TechnicalDetails;
  allocations: string[];
  pois: string[]; //lista ids de pois
  imgs: string[];
  notes?: string[];
}
