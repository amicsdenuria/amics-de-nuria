import {
  ArrowRightIcon,
  MapPinIcon,
  RouteIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { getRouteRegions, getRouteStats } from '@/domain/route/route.service';

import { Badge } from '@/components/ui/badge';
import { DomainRoute } from '@/domain/route/route.types';
import Link from 'next/link';
import { formatDistance } from '@/lib/routesLib';

interface RouteCardProps {
  route: DomainRoute;
}
const RouteCard = ({ route }: RouteCardProps) => {
  const stats = getRouteStats(route.stages);
  const regions = getRouteRegions(route.stages);
  const maxRegionsToShow = 5;
  const visibleRegions = regions.slice(0, maxRegionsToShow);
  const remainingCount = regions.length - maxRegionsToShow;

  return (
    <Link href={`/rutes-itineraris/route/${route.id}`}>
      <Card className="group cursor-pointer border-border/60 py-0 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
        <CardContent className="flex h-full flex-col gap-4 p-5">
          <div className="flex items-start justify-between">
            {/* Title: Origin → Destiny */}
            <div className="text-nowrap flex flex-wrap items-center gap-2">
              <RouteIcon className="size-4 shrink-0 text-primary" />
              <h3 className="font-serif text-lg font-semibold text-primary">
                {route.origin}
              </h3>
              <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground" />
              <h3 className="font-serif text-lg font-semibold text-primary">
                {route.destiny}
              </h3>
            </div>

            {/* Type badge + Status */}
            <div className="min-w-fit flex items-start justify-between gap-3">
              <Badge
                // variant="outline"
                className="text-xs font-normal"
              >
                Ruta
              </Badge>
            </div>
          </div>

          {/* Alternative route points */}
          {route.alternativeRoutePoints &&
            route.alternativeRoutePoints.length > 0 && (
              <p className="text-sm text-muted-foreground">
                via {route.alternativeRoutePoints.join(' - ')}
              </p>
            )}

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-sm text-foreground">
              <MapPinIcon className="size-3.5 text-muted-foreground" />
              <span>{formatDistance(stats.distance)}</span>
            </div>

            <div className="h-3 w-px bg-border" />

            <div className="flex items-center gap-1.5 text-sm text-foreground">
              <span className="font-medium">{route.stages.length}</span>
              <span className="text-muted-foreground">etapes</span>
            </div>

            <div className="h-3 w-px bg-border" />

            <div className="flex items-center gap-1.5 text-sm text-foreground">
              <TrendingUpIcon className="size-3.5 text-muted-foreground" />
              <span>{`${stats.cumulativeAscent} m`}</span>
            </div>

            <div className="h-3 w-px bg-border" />

            <div className="flex items-center gap-1.5 text-sm text-foreground">
              <TrendingDownIcon className="size-3.5 text-muted-foreground" />
              <span>{`${stats.cumulativeDescent} m`}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="mb-6 border-t">
          {/* Regions badges */}
          <div className="flex flex-wrap items-center gap-2">
            {visibleRegions.map((region) => (
              <Badge
                key={region.slug}
                variant="secondary"
                className="text-xs font-normal"
              >
                {region.name}
              </Badge>
            ))}
            {remainingCount > 0 && (
              <Badge
                variant="outline"
                className="text-xs font-normal"
              >
                +{remainingCount}
              </Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RouteCard;
