import PageContainer from '@/components/ui/page-container';
import RouteHero from '../../components/RouteHero';
import StageContent from './components/StageContent';
import { getPoisById } from '@/adapters/pelegrinatges/poi/getPoisById';
import { getRegionsById } from '@/adapters/pelegrinatges/region/getRegionsById';
import { getStageById } from '@/adapters/pelegrinatges/stage/getStageById';
import { notFound } from 'next/navigation';
import { stages } from '@/content/pelegrinatges/data/stages';

export const dynamicParams = false;
export const generateStaticParams = async () =>
  stages.map((stage) => ({ stage: stage.id }));

interface StagePageParams {
  params: Promise<{ id: string }>;
}

const StagePage = async ({ params }: StagePageParams) => {
  const { id } = await params;
  const stage = await getStageById({ stageId: id });

  if (!stage) notFound();

  const stageRegions = await getRegionsById({ regionIds: stage.regions });
  const stagePois = await getPoisById({ poisIds: stage.pois });

  return (
    <>
      <RouteHero
        title={`Etapa ${stage.origin} - ${stage.destiny}`}
        origin={stage.origin}
        destiny={stage.destiny}
        type="stage"
        alternativeRoutePoints={stageRegions.map((region) => region.name)}
      />
      <PageContainer className="pb-8">
        <StageContent
          stage={stage}
          regions={stageRegions}
          pois={stagePois}
        />
      </PageContainer>
    </>
  );
};

export default StagePage;
