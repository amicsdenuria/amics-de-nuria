import PageContainer from '@/components/ui/page-container';
import RouteHero from '../../components/RouteHero';
import StageContent from './components/StageContent';
import { getStageBySlug } from '@/domain/stage/stage.service';
import { notFound } from 'next/navigation';

interface StagePageParams {
  params: Promise<{ slug: string }>;
}

const StagePage = async ({ params }: StagePageParams) => {
  const { slug } = await params;
  const stage = await getStageBySlug(slug);

  if (!stage) notFound();

  return (
    <>
      <RouteHero
        title={`Etapa ${stage.origin} - ${stage.destiny}`}
        origin={stage.origin}
        destiny={stage.destiny}
        type="stage"
        alternativeRoutePoints={stage.regions.map((region) => region.name)}
      />
      <PageContainer className="pb-8">
        <StageContent stage={stage} />
      </PageContainer>
    </>
  );
};

export default StagePage;
