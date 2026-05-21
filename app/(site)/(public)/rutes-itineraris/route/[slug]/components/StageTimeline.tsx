'use client';

import {
  ArrowDownToLineIcon,
  ArrowUpToLineIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
  ExternalLinkIcon,
  MapIcon,
  MapPinIcon,
  MountainIcon,
  RulerIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react';
import { formatDistance, formatDuration } from '@/lib/routesLib';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DomainStage } from '@/domain/stage/stage.types';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface StageTimelineProps {
  stages: DomainStage[];
}

interface StageTimelineItemProps {
  stage: DomainStage;
  index: number;
  isLast: boolean;
}

const StageTimelineItem = ({
  stage,
  index,
  isLast,
}: StageTimelineItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute lg:hidden left-[19px] top-10 bottom-0 w-0.5 bg-border" />
      )}

      {/* Timeline dot */}
      <div className="absolute left-2.5 top-2.5 z-10">
        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
          <span className="text-xs font-bold text-primary-foreground">
            {index + 1}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="ml-12 pb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left group"
        >
          <div className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-base">
                  {stage.origin} → {stage.destiny}
                </h3>
                {isOpen ? (
                  <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <RulerIcon className="h-4 w-4" />
                  {formatDistance(stage.technicalDetails.distance)}
                </span>
                <span className="flex items-center gap-1.5">
                  <ClockIcon className="h-4 w-4" />
                  {formatDuration(stage.technicalDetails.duration)}
                </span>
                <span className="flex items-center gap-1.5">
                  <TrendingUpIcon className="h-4 w-4 text-emerald-600" />+
                  {stage.technicalDetails.cumulativeAscent}m
                </span>
                <span className="flex items-center gap-1.5">
                  <TrendingDownIcon className="h-4 w-4 text-rose-600" />-
                  {stage.technicalDetails.cumulativeDescent}m
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {stage.regions.map((region) => (
                  <Badge
                    key={region.slug}
                    variant={'secondary'}
                    className="text-xs"
                  >
                    <MapIcon className="h-3 w-3 mr-1" />
                    {region.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </button>

        {/* Expanded content */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <div className="mt-3 p-4 rounded-lg border bg-muted/30 space-y-4">
            {/* Technical details grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-md bg-card">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <MountainIcon className="h-3.5 w-3.5" />
                  Altura inicial
                </div>
                <span className="font-semibold">
                  {stage.technicalDetails.initialHeight}m
                </span>
              </div>
              <div className="p-3 rounded-md bg-card">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <MountainIcon className="h-3.5 w-3.5" />
                  Altura final
                </div>
                <span className="font-semibold">
                  {stage.technicalDetails.finalHeight}m
                </span>
              </div>
              <div className="p-3 rounded-md bg-card">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <ArrowDownToLineIcon className="h-3.5 w-3.5 text-blue-600" />
                  Punt més baix
                </div>
                <span className="font-semibold">
                  {stage.technicalDetails.minHeight}m
                </span>
              </div>
              <div className="p-3 rounded-md bg-card">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <ArrowUpToLineIcon className="h-3.5 w-3.5 text-amber-600" />
                  Punt més alt
                </div>
                <span className="font-semibold">
                  {stage.technicalDetails.maxHeight}m
                </span>
              </div>
            </div>

            {/* Trail locations preview */}
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                Punts del recorregut
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {stage.trailLocations.slice(0, 5).join(' → ')}
                {stage.trailLocations.length > 5 && ' ...'}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button
                asChild
                size="sm"
                variant="default"
              >
                <Link href={`/rutes-itineraris/stage/${stage.id}`}>
                  <ExternalLinkIcon className="h-4 w-4 mr-2" />
                  Veure etapa completa
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StageTimeline = ({ stages }: StageTimelineProps) => {
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-3">
      {stages.map((s, i) => (
        <StageTimelineItem
          key={s.id}
          stage={s}
          index={i}
          isLast={i === stages.length - 1}
        />
      ))}
    </div>
  );
};

export default StageTimeline;
