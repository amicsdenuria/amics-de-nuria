import PageContainer from '@/components/ui/page-container';
import PrimaryPageHero from '../../../components/PrimaryPageHero';
import StageContent from './components/StageContent';
import { getStageBySlug } from '@/domain/stage/stage.service';
import { notFound } from 'next/navigation';
import { mapStageHero } from '../../heroMappers';

interface StagePageParams {
  params: Promise<{ slug: string }>;
}

const StagePage = async ({ params }: StagePageParams) => {
  const { slug } = await params;
  const stage = await getStageBySlug(slug);

  if (!stage) notFound();

  return (
    <>
      <PrimaryPageHero {...mapStageHero(stage)} />
      <PageContainer className="pt-16 md:pt-24 pb-8">
        <StageContent stage={stage} />
      </PageContainer>
    </>
  );
};

export default StagePage;
