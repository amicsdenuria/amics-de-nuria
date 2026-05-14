import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../../live';

export const getCurrentRoute = async () => {
  const getCurrentRouteQuery = defineQuery(`
    *[_type == 'currentRoute'][0]{
      currentRoute->{
        ...,
        "slug": slug.current,
        stages[]->{
          "slug": slug.current
        }
      }
    }.currentRoute
  `);

  const currentRoute = await sanityFetch({
    query: getCurrentRouteQuery,
  });

  return currentRoute.data;
};
