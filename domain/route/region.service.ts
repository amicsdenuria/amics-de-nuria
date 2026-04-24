import { DomainStage, TechnicalDetails } from '../stage/stage.types';

export const getRouteStats = (routeStages: DomainStage[]): TechnicalDetails => {
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

  return routeStats;
};
