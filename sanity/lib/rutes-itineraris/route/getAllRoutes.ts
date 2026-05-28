import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../../live';

export const getAllRoutes = async () => {
  const getAllRoutesQuery = defineQuery(`
      *[_type == 'route'][]{
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
    `);

  const routes = await sanityFetch({
    query: getAllRoutesQuery,
  });
  return routes.data;
};
