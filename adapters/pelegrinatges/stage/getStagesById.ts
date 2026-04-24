// Sanity
// import { stagesById } from "@/sanity/lib/pelegrinatges/stage/stagesById"

// Local
import { stagesById } from '@/content/pelegrinatges/data/actions/stage/stagesById';

interface GetStagesByIdParams {
  stagesIds: string[];
}

export const getStagesById = async ({ stagesIds }: GetStagesByIdParams) => {
  return await stagesById({ stagesIds });
};
