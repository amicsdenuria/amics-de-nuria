import { getRouteBySlug, getRouteStats } from '@/domain/route/route.service';

import PageContainer from '@/components/ui/page-container';
import PrimaryPageHero from '../../../components/PrimaryPageHero';
import RouteContent from './components/RouteContent';
import { getStagesBySlugs } from '@/domain/stage/stage.service';
import { mapRouteHero } from '../../heroMappers';
import { notFound } from 'next/navigation';

interface RoutePageParams {
  params: Promise<{ slug: string }>;
}

const RoutePage = async ({ params }: RoutePageParams) => {
  const { slug } = await params;
  const route = await getRouteBySlug(slug);

  if (!route) notFound();

  const routeStages = await getStagesBySlugs(route.stages);
  const orderedRouteStages = route.stages
    .map((slug) => routeStages.find((s) => s.slug === slug))
    .filter((stage) => stage !== undefined);
  const routeStats = getRouteStats(orderedRouteStages);

  return (
    <>
      <PrimaryPageHero {...mapRouteHero(route)} />
      <PageContainer className="py-16 md:py-24">
        {/* CONTENT */}
        <RouteContent
          route={route}
          stages={orderedRouteStages}
          stats={routeStats}
        />
      </PageContainer>
    </>
  );
};

export default RoutePage;
