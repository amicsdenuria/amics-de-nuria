// import { Poi } from '@/sanity.types';
import { pois as poisData } from '@/content/pelegrinatges/data/pois';
// import { urlFor } from '@/sanity/lib/image';

interface GetPoisByIdParams {
  poisIds: string[];
}
export const getPoisById = async ({ poisIds }: GetPoisByIdParams) => {
  const regionIdsSet = new Set(poisIds);
  const pois = poisData.filter((poi) => regionIdsSet.has(poi.id));

  // const preparePois = (pois: Region[]) => pois.map(poi => {
  //   const ref = poi.img?.asset?._ref
  //   const url = ref ? urlFor(ref) : ''
  //   const alt = poi.img?.alt ?? ''
  //   return {
  //     ...poi,
  //     img: {
  //       url,
  //       alt
  //     }
  //   }
  // })

  // return preparePois(pois);
  return pois;
};
