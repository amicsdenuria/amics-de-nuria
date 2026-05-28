import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../../live';

export const getCurrentRoute = async () => {
  const getCurrentRouteQuery = defineQuery(`
    *[_type == 'currentRoute'][0]{
      currentRoute->{
        ...,
        "slug": slug.current,
        stages[]->{
          ...,
          "slug": slug.current,
          regions[]->{
            "slug": slug.current,
            name,
            img{
              asset,
              crop,
              hotspot,
              alt
            }
          },
          pois[]->{
            "slug": slug.current,
            name,
            img{
              asset,
              crop,
              hotspot,
              alt
            }
          },
          imgs[]{
            asset,
            crop,
            hotspot,
            alt
          }
        }
      }
    }.currentRoute
  `);

  const currentRoute = await sanityFetch({
    query: getCurrentRouteQuery,
  });

  return currentRoute.data;
};
