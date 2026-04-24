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

export interface StageRegion {
  slug: string;
  name: string;
  img: {
    url: string;
    alt: string;
  };
}

export interface StagePoi {
  slug: string;
  name: string;
  img: {
    url: string;
    alt: string;
  };
}

export interface DomainStage {
  id: string;
  slug: string;
  origin: string;
  destiny: string;
  wayPoints?: string[];
  stageDesc: string;
  stageMapUrl: string;
  videoUrl?: string;
  regions: StageRegion[];
  trailLocations: string[];
  technicalDetails: TechnicalDetails;
  allocations?: string[];
  pois?: StagePoi[];
  imgs?: {
    url: string;
    alt: string;
  }[];
  notes?: string[];
}
