export interface Region {
  id: string;
  name: string;
  province: string;
  img: {
    url: string;
    alt: string;
  };
  text: string[];
}
