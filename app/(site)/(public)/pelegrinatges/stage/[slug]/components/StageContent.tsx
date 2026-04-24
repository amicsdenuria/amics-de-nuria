import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ExternalLinkIcon,
  HotelIcon,
  InfoIcon,
  LocateIcon,
  MapPinIcon,
  MountainIcon,
  RouteIcon,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TypoH2, TypoP } from '@/components/ui/typo/typoComponents';

import { Button } from '@/components/ui/button';
import { DomainStage } from '@/domain/stage/stage.types';
import Image from 'next/image';
import Link from 'next/link';
import StageMedia from './StageMedia';
import Stats from '../../../components/Stats';
import { cn } from '@/lib/utils';

interface RouteContentProps {
  stage: DomainStage;
}

const StageContent = ({ stage }: RouteContentProps) => {
  return (
    <div className="flex flex-col gap-y-12">
      <section>
        {/* DESCRIPTION */}
        <TypoP className="text-muted-foreground leading-relaxed">
          {stage.stageDesc}
        </TypoP>
      </section>

      {/* MEDIA */}
      <section>
        <TypoH2 className="mb-4">Explora el camí</TypoH2>
        <StageMedia
          videoUrl={stage.videoUrl}
          mapUrl={stage.stageMapUrl}
          imgs={stage.imgs}
        />
      </section>

      {/* TECH-DATA, TRAIL LOCATIONS & NOTES */}
      <section className="min-h-60">
        <TypoH2 className="mb-4">Planifica l&apos;etapa</TypoH2>
        <Tabs
          defaultValue="technical-data"
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="technical-data">
              <MountainIcon className="h-5 w-5" />
              Dades tècniques
            </TabsTrigger>
            <TabsTrigger value="trail-locations">
              <RouteIcon className="h-5 w-5" />
              Itinerari
            </TabsTrigger>
            <TabsTrigger value="notes">
              <InfoIcon className="h-5 w-5" />
              <span className="hidden md:block">Notes importants</span>
              <span className="block md:hidden">Notes</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="technical-data">
            <div>
              <Stats stats={stage.technicalDetails} />
            </div>
          </TabsContent>
          <TabsContent value="trail-locations">
            <div>
              <TypoP className="mb-8">
                Recull dels punts principals del recorregut. Cada etapa comença
                i finalitza a l&apos;església del nucli o de la zona.
              </TypoP>
              <ul className="relative ml-6">
                {stage.trailLocations.map((loc, i) => (
                  <li
                    key={loc}
                    className="flex items-start gap-3 pb-4 last:pb-0"
                  >
                    {/* Vertical line */}
                    {i !== stage.trailLocations.length - 1 && (
                      <div className="absolute left-[7px] top-0 w-0.5 h-full bg-border" />
                    )}

                    {/* Dot */}
                    <div className="relative z-10 mt-0.5">
                      <div
                        className={cn(
                          'h-4 w-4 rounded-full border-2',
                          i === 0
                            ? 'bg-emerald-500 border-emerald-500'
                            : i === stage.trailLocations.length - 1
                              ? 'bg-rose-500 border-rose-500'
                              : 'bg-background border-border',
                        )}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          'text-sm',
                          i === 0 || i == stage.trailLocations.length - 1
                            ? 'font-semibold'
                            : 'text-muted-foreground',
                        )}
                      >
                        {loc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="notes">
            <div>
              {stage?.notes?.map((n, i) => <TypoP key={i}>{n}</TypoP>) ?? (
                <TypoP>Sense notes</TypoP>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section className="min-h-64">
        <TypoH2 className="mb-4">Descobreix l&apos;entorn</TypoH2>
        <Tabs
          defaultValue="allocations"
          className="space-y-4"
        >
          <TabsList>
            {stage.allocations && (
              <TabsTrigger value="allocations">
                <HotelIcon className="h-5 w-5" />
                Allotjaments
              </TabsTrigger>
            )}
            <TabsTrigger value="regions">
              <MapPinIcon className="h-5 w-5" />
              Comarques
            </TabsTrigger>
            {stage.pois && (
              <TabsTrigger value="pois">
                <LocateIcon className="h-5 w-5" />
                <span className="hidden md:block">Punts d&apos;interès</span>
                <span className="block md:hidden">P. d&apos;interès</span>
              </TabsTrigger>
            )}
          </TabsList>
          {stage.allocations && (
            <TabsContent value="allocations">
              <ul className="flex flex-col gap-2">
                {stage.allocations.map((allocation) => (
                  <li key={allocation}>
                    <Button
                      asChild
                      variant={'outline'}
                    >
                      <Link
                        href={`https://www.google.com/search?q=${encodeURIComponent(allocation)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLinkIcon />
                        {allocation}
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </TabsContent>
          )}
          <TabsContent value="regions">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stage.regions.map((region) => (
                <Link
                  key={region.slug}
                  href={`/pelegrinatges/region/${region.slug}`}
                >
                  <Card
                    className={cn(
                      'relative w-full pt-0 overflow-hidden',
                      'group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1',
                    )}
                  >
                    <div className="relative aspect-video w-full">
                      <Image
                        src={region.img.url}
                        alt={region.img.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="relative z-20 aspect-video w-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{region.name}</CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
          {stage.pois && (
            <TabsContent value="pois">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stage.pois.map((poi) => (
                  <Link
                    key={poi.slug}
                    href={`/pelegrinatges/poi/${poi.slug}`}
                  >
                    <Card
                      className={cn(
                        'relative w-full pt-0 overflow-hidden',
                        'group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1',
                      )}
                    >
                      <div className="relative aspect-video w-full">
                        <Image
                          src={poi.img.url}
                          alt={poi.img.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="relative z-20 aspect-video w-full object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{poi.name}</CardTitle>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </section>
    </div>
  );
};

export default StageContent;
