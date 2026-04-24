export type DomainPoi = {
  id: string;
  name: string;
  slug: string;
  location: string;
  image: {
    url: string;
    alt: string;
  };
  text: string[];
};
