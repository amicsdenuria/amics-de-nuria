import { stages } from '../../stages';

interface StagesByIdParams {
  stagesIds: string[];
}

export const stagesById = async ({ stagesIds }: StagesByIdParams) => {
  const stagesIdsSet = new Set(stagesIds);

  return await stages.filter((stage) => stagesIdsSet.has(stage.id));
};
