import PageContainer from '@/components/ui/page-container';
import RouteContent from './components/RouteContent';
import RouteHero from '../../components/RouteHero';
import { getRouteById } from '@/adapters/pelegrinatges/route/getRouteById';
import { getStagesById } from '@/adapters/pelegrinatges/stage/getStagesById';
import { notFound } from 'next/navigation';
import { regions } from '@/content/pelegrinatges/data/regions';
import { routes } from '@/content/pelegrinatges/data/routes';

export const dynamicParams = false;
export const generateStaticParams = async () =>
  routes.map((route) => ({ route: route.id }));

interface RoutePageParams {
  params: Promise<{ id: string }>;
}

const RoutePage = async ({ params }: RoutePageParams) => {
  const { id } = await params;
  const route = await getRouteById({ routeId: id });

  if (!route) notFound();

  const routeStages = await getStagesById({ stagesIds: route.stages });

  const regionIds = new Set(routeStages.flatMap((stage) => stage.regions));
  const routeRegions = regions.filter((region) => regionIds.has(region.id));

  const routeDistance = routeStages.reduce(
    (acc, curr) => curr.technicalDetails.distance + acc,
    0,
  );
  const routeDuration = routeStages.reduce(
    (acc, curr) => curr.technicalDetails.duration + acc,
    0,
  );
  const routeInitHeight = routeStages[0].technicalDetails.initialHeight;
  const routeFinalHeight =
    routeStages[routeStages.length - 1].technicalDetails.finalHeight;
  const routeMinHeight = Math.min(
    ...routeStages.map((stage) => stage.technicalDetails.minHeight),
  );
  const routeMaxHeight = Math.max(
    ...routeStages.map((stage) => stage.technicalDetails.maxHeight),
  );
  const routeCumAsc = routeStages.reduce(
    (acc, curr) => curr.technicalDetails.cumulativeAscent + acc,
    0,
  );
  const routeCumDes = routeStages.reduce(
    (acc, curr) => curr.technicalDetails.cumulativeDescent + acc,
    0,
  );

  const routeStats = {
    distance: routeDistance,
    duration: routeDuration,
    initialHeight: routeInitHeight,
    finalHeight: routeFinalHeight,
    minHeight: routeMinHeight,
    maxHeight: routeMaxHeight,
    cumulativeAscent: routeCumAsc,
    cumulativeDescent: routeCumDes,
  };

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
          regions={routeRegions}
          stats={routeStats}
        />
      </PageContainer>
    </>
  );
};

export default RoutePage;
