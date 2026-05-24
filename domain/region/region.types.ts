import type { DomainImage } from '../shared/image.types';

export type DomainRegion = {
  id: string;
  name: string;
  slug: string;
  province: string;
  image: DomainImage;
  text: string[];
};
