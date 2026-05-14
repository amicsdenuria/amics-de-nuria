import { DomainStage, TechnicalDetails } from '@/domain/stage/stage.types';
import { InfoIcon, MapIcon, MountainIcon, RouteIcon } from 'lucide-react';
import { TypoH2, TypoP } from '@/components/ui/typo/typoComponents';

import CopyLinkButton from '../../../components/CopyLinkButton';
import { DomainRoute } from '@/domain/route/route.types';
import RouteMap from '../../../components/Map';
import StageTimeline from './StageTimeline';
import Stats from '../../../components/Stats';

interface RouteContentProps {
  route: DomainRoute;
  stages: DomainStage[];
  stats: TechnicalDetails;
}

const RouteContent = ({ route, stages, stats }: RouteContentProps) => {
  const description = route.routeDesc;

  return (
    <div className="flex flex-col gap-y-12">
      <section>
        {/* DESCRIPTION */}
        {description.map((p, i) => (
          <TypoP
            key={i}
            className="text-muted-foreground leading-relaxed"
          >
            {p}
          </TypoP>
        ))}
      </section>

      <section
        id="technical-details"
        className="scroll-m-20"
      >
        <TypoH2 className="flex items-center gap-2 mb-4">
          <MountainIcon className="h-5 w-5" />
          Dades tècniques
          <CopyLinkButton hash="technical-details" />
        </TypoH2>
        <Stats stats={stats} />
      </section>

      {/* MAP */}
      <section
        id="route-map"
        className="scroll-m-20"
      >
        <TypoH2 className="flex items-center gap-2 mb-4">
          <MapIcon className="h-5 w-5" />
          Mapa de la ruta
          <CopyLinkButton hash="route-map" />
        </TypoH2>
        <RouteMap src={route.routeMapUrl} />
      </section>

      {/* NOTES */}
      <section
        id="route-notes"
        className="scroll-m-20"
      >
        <TypoH2 className="flex items-center gap-2 mb-4">
          <InfoIcon className="h-5 w-5" />
          Notes importants
          <CopyLinkButton hash="route-notes" />
        </TypoH2>
        <ul className="list-disc pl-12 py-4 space-y-2">
          {route.notes?.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      </section>

      {/* STAGES */}
      <section
        id="route-stages"
        className="scroll-m-20"
      >
        <TypoH2 className="flex items-center gap-2 mb-4">
          <RouteIcon className="h-5 w-5" />
          Etapes ({stages.length})
          <CopyLinkButton hash="route-stages" />
        </TypoH2>
        <StageTimeline stages={stages} />
      </section>
    </div>
  );
};

export default RouteContent;
