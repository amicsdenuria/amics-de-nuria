import PageContainer from '@/components/ui/page-container';
import RouteContent from './components/RouteContent';
import RouteHero from '../../components/RouteHero';
import { getRouteById } from '@/adapters/pelegrinatges/route/getRouteById';
import { getRouteStats } from '@/domain/route/region.service';
import { getStagesBySlugs } from '@/domain/stage/stage.service';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

interface RoutePageParams {
  params: Promise<{ id: string }>;
}

const RoutePage = async ({ params }: RoutePageParams) => {
  const { id } = await params;
  const route = await getRouteById({ routeId: id });

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
