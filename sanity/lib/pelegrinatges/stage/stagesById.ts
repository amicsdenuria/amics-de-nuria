interface StagesByIdParams {
  stagesIds: string[];
}
export const stagesById = async ({ stagesIds }: StagesByIdParams) => {
  console.log(stagesIds);
  return await [];
};
