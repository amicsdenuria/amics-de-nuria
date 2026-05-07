import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../../live';

interface GetStageBySlugParams {
  slug: string;
}
export const getStageBySlug = async ({ slug }: GetStageBySlugParams) => {
  const getStageBySlugQuery = defineQuery(`
      *[_type == 'stage' && slug.current == $slug][0]{
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

  const stage = await sanityFetch({
    query: getStageBySlugQuery,
    params: { slug },
  });

  return stage.data;
};
