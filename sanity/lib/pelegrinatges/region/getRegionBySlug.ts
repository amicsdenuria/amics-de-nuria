import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../../live';

interface GetRegionBySlugParams {
  slug: string;
}

export const getRegionBySlug = async ({ slug }: GetRegionBySlugParams) => {
  const getRegionBySlugQuery = defineQuery(`
  *[_type == 'region' && slug.current == $slug][0]{
    name,
    "slug": slug.current,
    province,
    img{
      asset->{
        url
      },
      alt
    },
    text
  }
`);
  const region = await sanityFetch({
    query: getRegionBySlugQuery,
    params: { slug },
  });

  return region.data;
};
