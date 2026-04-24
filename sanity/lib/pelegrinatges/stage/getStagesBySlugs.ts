import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../../live';

interface GetStagesBySlugsParams {
  slugs: string[];
}

export const getStagesBySlugs = async ({ slugs }: GetStagesBySlugsParams) => {
  const getStagesBySlugsQuery = defineQuery(`
      *[_type == 'stage' && slug.current in $slugs][]{
        ...,
        "slug": slug.current,
        regions[]->{
          "slug": slug.current,
          name,
          img{
            asset->{
              url
            },
            alt
          }
        },
        pois[]->{
          "slug": slug.current,
          name,
          img{
            asset->{
              url
            },
            alt
          }
        },
        imgs[]{
          asset->{
            url
          },
          alt
        }
      }
    `);

  const stages = await sanityFetch({
    query: getStagesBySlugsQuery,
    params: { slugs },
  });

  return stages.data;
};
