import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../../live';

interface GetRegionsBySlugsParams {
  slugs: string[];
}

export const getRegionsBySlugs = async ({ slugs }: GetRegionsBySlugsParams) => {
  const getRegionsBySlugsQuery = defineQuery(`
    *[_type == 'region' && slug.current in $slugs][]{
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

  const regions = await sanityFetch({
    query: getRegionsBySlugsQuery,
    params: { slugs },
  });

  return regions.data;
};
