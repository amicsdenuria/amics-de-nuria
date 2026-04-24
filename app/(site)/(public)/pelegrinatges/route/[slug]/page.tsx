import { getRouteBySlug, getRouteStats } from '@/domain/route/route.service';

import PageContainer from '@/components/ui/page-container';
import RouteContent from './components/RouteContent';
import RouteHero from '../../components/RouteHero';
import { getStagesBySlugs } from '@/domain/stage/stage.service';
import { notFound } from 'next/navigation';

interface RoutePageParams {
  params: Promise<{ slug: string }>;
}

const RoutePage = async ({ params }: RoutePageParams) => {
  const { slug } = await params;
  const route = await getRouteBySlug(slug);

  if (!route) notFound();

  const routeStages = await getStagesBySlugs(route.stages);
  const routeStats = getRouteStats(routeStages);

  return (
    <>
      <RouteHero
        title={`Ruta ${route.origin} - ${route.destiny}`}
        origin={route.origin}
        destiny={route.destiny}
        alternativeRoutePoints={route.alternativeRoutePoints}
      />
      <PageContainer className="pb-8">
        {/* CONTENT */}
        <RouteContent
          route={route}
          stages={routeStages}
          stats={routeStats}
        />
      </PageContainer>
    </>
  );
};

export default RoutePage;
