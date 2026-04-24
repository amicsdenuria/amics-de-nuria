export type DomainRegion = {
  id: string;
  name: string;
  slug: string;
  province: string;
  image: {
    url: string;
    alt: string;
  };
  text: string[];
};
