import {
  ArrowRightIcon,
  MapPinIcon,
  MilestoneIcon,
  RouteIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { DomainRoute } from '@/domain/route/route.types';
import Link from 'next/link';
import { TypoH2 } from '@/components/ui/typo/typoComponents';

interface RouteCardProps {
  route: DomainRoute;
}
const RouteCard = ({ route }: RouteCardProps) => {
  return (
    <Link href={`/rutes-itineraris/route/${route.id}`}>
      <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="flex flex-wrap items-center gap-2">
              <RouteIcon className="h-5 w-5 text-primary" />
              <TypoH2 className="border-none pb-0">
                {route.origin} a {route.destiny}
              </TypoH2>
              {route.alternativeRoutePoints &&
                route.alternativeRoutePoints.length > 0 && (
                  <span className="text-sm text-muted-foreground/60">
                    ({route.alternativeRoutePoints[0]})
                  </span>
                )}
            </CardTitle>
            <ArrowRightIcon className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPinIcon className="h-4 w-4 text-emerald-600" />
            <span className="font-medium">{route.origin}</span>
            <ArrowRightIcon className="h-3 w-3 text-muted-foreground" />
            <MapPinIcon className="h-4 w-4 text-rose-600" />
            <span className="font-medium">{route.destiny}</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {route.alternativeRoutePoints?.map((point) => (
              <Badge
                key={point}
                variant={'secondary'}
                className="text-xs"
              >
                <MilestoneIcon className="h-3 w-3 mr-1" />
                {point}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
            <span>{route.stages.length} etapes</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RouteCard;
