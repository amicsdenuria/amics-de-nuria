import {
  ArrowDownToLineIcon,
  ArrowUpToLineIcon,
  ClockIcon,
  MountainIcon,
  RulerIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react';
import { formatDistance, formatDuration } from '@/lib/routesLib';

import { TechnicalDetails } from '@/data/pelegrinatges/interfaces/route';
import TechnicalStat from './TechnicalStat';

interface StatsProps {
  stats: TechnicalDetails;
}

const Stats = ({ stats }: StatsProps) => {
  const {
    distance,
    duration,
    cumulativeAscent,
    cumulativeDescent,
    initialHeight,
    finalHeight,
    minHeight,
    maxHeight,
  } = stats;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <TechnicalStat
          icon={<RulerIcon className="h-4 w-4" />}
          label="Distància"
          value={formatDistance(distance)}
        />
        <TechnicalStat
          icon={<ClockIcon className="h-4 w-4" />}
          label="Durada"
          value={formatDuration(duration)}
          tooltip="Durada aproximada, calculada sobre una mitjana de 3,5 km/h"
        />
        <TechnicalStat
          icon={<TrendingUpIcon className="h-4 w-4 text-emerald-600" />}
          label="Desnivell positiu"
          value={`+${cumulativeAscent}m`}
          tooltip="Suma de tot el desnivell positiu (de pujada) de tot el recorregut"
          variant="success"
        />
        <TechnicalStat
          icon={<TrendingDownIcon className="h-4 w-4 text-rose-600" />}
          label="Desnivell negatiu"
          value={`-${cumulativeDescent}m`}
          tooltip="Suma de tot el desnivell negatiu (de baixada) de tot el recorregut"
          variant="danger"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">
        <TechnicalStat
          icon={<MountainIcon className="h-4 w-4" />}
          label="Altura inicial"
          value={`${initialHeight}m`}
        />
        <TechnicalStat
          icon={<MountainIcon className="h-4 w-4" />}
          label="Altura final"
          value={`${finalHeight}m`}
        />
        <TechnicalStat
          icon={<ArrowDownToLineIcon className="h-4 w-4 text-blue-600" />}
          label="Punt més baix"
          value={`${minHeight}m`}
          tooltip="Punt més baix de l'etapa"
          variant="info"
        />
        <TechnicalStat
          icon={<ArrowUpToLineIcon className="h-4 w-4 text-amber-600" />}
          label="Punt més alt"
          value={`${maxHeight}m`}
          tooltip="Punt més alt de l'etapa"
          variant="warning"
        />
      </div>
      {/* minHeight: {
        value: 177,
        tooltip: "",
      }, */}
      {/* maxHeight: {
        value: 801,
        tooltip: "",
      }, */}
    </div>
  );
};

export default Stats;
