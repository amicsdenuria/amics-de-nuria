import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../../live';

interface GetRouteBySlugParams {
  slug: string;
}

export const getRouteBySlug = async ({ slug }: GetRouteBySlugParams) => {
  const getRouteBySlugQuery = defineQuery(`
      *[_type == 'route' && slug.current == $slug][0]{
        ...,
        "slug": slug.current,
        stages[]->{
          "slug": slug.current
        }
      }
    `);

  const route = await sanityFetch({
    query: getRouteBySlugQuery,
    params: { slug },
  });
  return route.data;
};
