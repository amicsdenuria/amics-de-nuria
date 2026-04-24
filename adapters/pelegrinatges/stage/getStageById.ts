import { stages } from '@/content/pelegrinatges/data/stages';

interface GetStageByIdParams {
  stageId: string;
}

export const getStageById = async ({ stageId }: GetStageByIdParams) => {
  const stage = stages.find((stage) => stage.id === stageId);

  return stage;
};
