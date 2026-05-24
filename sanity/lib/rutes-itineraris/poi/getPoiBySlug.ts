import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../../live';

interface GetPoiBySlugParams {
  slug: string;
}

export const getPoiBySlug = async ({ slug }: GetPoiBySlugParams) => {
  const getPoiBySlugQuery = defineQuery(`
      *[_type == 'poi' && slug.current == $slug][0]{
        ...,
        "slug": slug.current,
        img{
          asset,
          crop,
          hotspot,
          alt
        }
      }
    `);

  const poi = await sanityFetch({
    query: getPoiBySlugQuery,
    params: { slug },
  });

  return poi.data;
};
