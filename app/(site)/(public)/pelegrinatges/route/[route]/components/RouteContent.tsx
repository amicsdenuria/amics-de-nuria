import { InfoIcon, MapIcon, MountainIcon, RouteIcon } from 'lucide-react';
import {
  Region,
  Route,
  Stage,
  TechnicalDetails,
} from '@/data/pelegrinatges/interfaces/route';
import { TypoH2, TypoP } from '@/components/ui/typo/typoComponents';

import RouteMap from '../../../components/Map';
import StageTimeline from './StageTimeline';
import Stats from '../../../components/Stats';

interface RouteContentProps {
  route: Route;
  stages: Stage[];
  regions: Region[];
  stats: TechnicalDetails;
}

const RouteContent = ({ route, stages, regions, stats }: RouteContentProps) => {
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

      <section>
        <TypoH2 className="flex items-center gap-2 mb-4">
          <MountainIcon className="h-5 w-5" />
          Dades tècniques
        </TypoH2>
        <Stats stats={stats} />
      </section>

      {/* MAP */}
      <section>
        <TypoH2 className="flex items-center gap-2 mb-4">
          <MapIcon className="h-5 w-5" />
          Mapa de la ruta
        </TypoH2>
        <RouteMap src={route.routeMapUrl} />
      </section>

      {/* NOTES */}
      <section>
        <TypoH2 className="flex items-center gap-2 mb-4">
          <InfoIcon className="h-5 w-5" />
          Notes importants
        </TypoH2>
        <TypoP>
          Cada etapa consta d&apos;informació amb els allotjaments que es poden
          trobar per la zona.
        </TypoP>
        {route.notes?.map((n, i) => (
          <TypoP key={i}>{n}</TypoP>
        ))}
      </section>

      {/* STAGES */}
      <section>
        <TypoH2 className="flex items-center gap-2 mb-4">
          <RouteIcon className="h-5 w-5" />
          Etapes ({stages.length})
        </TypoH2>
        <StageTimeline
          stages={stages}
          regions={regions}
        />
      </section>
    </div>
  );
};

export default RouteContent;
