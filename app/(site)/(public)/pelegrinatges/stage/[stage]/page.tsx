import PageContainer from '@/components/ui/page-container';
import RouteHero from '../../components/RouteHero';
import StageContent from './components/StageContent';
import { notFound } from 'next/navigation';
import { pois } from '@/content/pelegrinatges/data/pois';
import { regions } from '@/content/pelegrinatges/data/regions';
import { stages } from '@/content/pelegrinatges/data/stages';

export const dynamicParams = false;
export const generateStaticParams = async () =>
  stages.map((stage) => ({ stage: stage.id }));

interface StagePageParams {
  params: Promise<{ stage: string }>;
}

const StagePage = async ({ params }: StagePageParams) => {
  const { stage: id } = await params;
  const stage = stages.find((stage) => stage.id === id);

  if (!stage) notFound();

  const stageRegions = stage.regions
    .map((stageRegion) => regions.find((region) => region.id === stageRegion))
    .filter((region) => region !== undefined);

  const stagePois = stage.pois
    .map((stagePOI) => pois.find((poi) => poi.id === stagePOI))
    .filter((p) => p !== undefined);

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
