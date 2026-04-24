import {
  stageFromLocal,
  stageFromSanity,
  stagesFromLocal,
  stagesFromSanity,
} from './stage.adapter';

import { dataSource } from '@/config/site.config';
import { getStageBySlug as getSanityStage } from '@/sanity/lib/pelegrinatges/stage/getStageBySlug';
import { getStagesBySlugs as getSanityStages } from '@/sanity/lib/pelegrinatges/stage/getStagesBySlugs';
import { stagesMock } from '@/content/pelegrinatges/mockData/stages';

const DATA_SOURCE = dataSource.pelegrinatges.stages;

export const getStageBySlug = async (slug: string) => {
  if (DATA_SOURCE === 'local') {
    const stage = stagesMock.find((s) => s.slug === slug);
    return stage ? stageFromLocal(stage) : null;
  }

  const data = await getSanityStage({ slug });
  return stageFromSanity(data);
};

export const getStagesBySlugs = async (slugs: string[]) => {
  if (DATA_SOURCE === 'local') {
    const stages = stagesMock;
    return stagesFromLocal(stages);
  }

  const data = await getSanityStages({ slugs });
  return stagesFromSanity(data);
};
