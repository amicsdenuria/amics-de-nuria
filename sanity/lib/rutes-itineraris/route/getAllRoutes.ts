import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../../live';

export const getAllRoutes = async () => {
  const getAllRoutesQuery = defineQuery(`
      *[_type == 'route'][]{
        ...,
        "slug": slug.current,
        stages[]->{
          "slug": slug.current
        }
      }
    `);

  const routes = await sanityFetch({
    query: getAllRoutesQuery,
  });
  return routes.data;
};
