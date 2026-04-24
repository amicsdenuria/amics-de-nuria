// import { Region } from '@/sanity.types';
import { regions as regionsData } from '@/content/pelegrinatges/data/regions';
// import { urlFor } from '@/sanity/lib/image';

interface GetRegionsByIdParams {
  regionIds: string[];
}
export const getRegionsById = async ({ regionIds }: GetRegionsByIdParams) => {
  const regionIdsSet = new Set(regionIds);
  const regions = regionsData.filter((region) => regionIdsSet.has(region.id));

  // const prepareRegions = (regions: Region[]) => regions.map(region => {
  //   const ref = region.img?.asset?._ref
  //   const url = ref ? urlFor(ref) : ''
  //   const alt = region.img?.alt ?? ''
  //   return {
  //     ...region,
  //     img: {
  //       url,
  //       alt
  //     }
  //   }
  // })

  // return prepareRegions(regions);
  return regions;
};
