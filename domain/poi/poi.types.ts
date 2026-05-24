import type { DomainImage } from '../shared/image.types';

export type DomainPoi = {
  id: string;
  name: string;
  slug: string;
  location: string;
  image: DomainImage;
  text: string[];
};
