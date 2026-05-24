import { DomainStage, TechnicalDetails } from '@/domain/stage/stage.types';
import { InfoIcon, MapIcon, MountainIcon, RouteIcon } from 'lucide-react';
import { TypoH2Var, TypoP } from '@/components/ui/typo/typoComponents';

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
    <div className="flex flex-col gap-y-12 md:gap-y-24">
      <section className="bg-secondary/40 p-8 rounded-sm shadow-sm max-w-5xl mx-auto">
        {/* DESCRIPTION */}
        {description.map((p, i) => (
          <TypoP
            key={i}
            className="text-muted-foreground leading-relaxed border-l-2 border-accent pl-3 text-base"
          >
            {p}
          </TypoP>
        ))}
      </section>

      <section
        id="technical-details"
        className="scroll-m-20"
      >
        <TypoH2Var className="flex items-center gap-4 mb-4 text-primary">
          <MountainIcon className="h-9 w-9 border-2 border-primary/70 p-1 rounded-sm" />
          Dades tècniques
          <CopyLinkButton hash="technical-details" />
        </TypoH2Var>
        <Stats stats={stats} />
      </section>

      {/* MAP */}
      <section
        id="route-map"
        className="scroll-m-20"
      >
        <TypoH2Var className="flex items-center gap-4 mb-4 text-primary">
          <MapIcon className="h-9 w-9 border-2 border-primary/70 p-1 rounded-sm" />
          Mapa de la ruta
          <CopyLinkButton hash="route-map" />
        </TypoH2Var>
        <RouteMap src={route.routeMapUrl} />
      </section>

      {/* NOTES */}
      {route.notes && route.notes.length > 0 && (
        <section
          id="route-notes"
          className="scroll-m-20"
        >
          <TypoH2Var className="flex items-center gap-4 mb-4 text-primary">
            <InfoIcon className="h-9 w-9 border-2 border-primary/70 p-1 rounded-sm" />
            Notes importants
            <CopyLinkButton hash="route-notes" />
          </TypoH2Var>
          <ul className="list-disc pl-12 py-4 space-y-2">
            {route.notes?.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </section>
      )}

      {/* STAGES */}
      <section
        id="route-stages"
        className="scroll-m-20"
      >
        <TypoH2Var className="flex items-center gap-4 mb-4 text-primary">
          <RouteIcon className="h-9 w-9 border-2 border-primary/70 p-1 rounded-sm" />
          Etapes ({stages.length})
          <CopyLinkButton hash="route-stages" />
        </TypoH2Var>
        <StageTimeline stages={stages} />
      </section>
    </div>
  );
};

export default RouteContent;
