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
  img: DomainImage;
}

export interface StagePoi {
  slug: string;
  name: string;
  img: DomainImage;
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
  imgs?: DomainImage[];
  notes?: string[];
}
import type { DomainImage } from '../shared/image.types';
