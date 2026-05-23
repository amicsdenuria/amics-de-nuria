import PageContainer from '@/components/ui/page-container';
import PrimaryPageHero from '../../../components/PrimaryPageHero';
import StageContent from './components/StageContent';
import { getStageBySlug } from '@/domain/stage/stage.service';
import { mapStageHero } from '../../heroMappers';
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
      <PrimaryPageHero {...mapStageHero(stage)} />
      <PageContainer className="py-16 md:py-24">
        <StageContent stage={stage} />
      </PageContainer>
    </>
  );
};

export default StagePage;
