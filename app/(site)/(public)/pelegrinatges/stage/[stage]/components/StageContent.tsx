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
import { POI, Region, Stage } from '@/data/interfaces/route';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TypoH2, TypoP } from '@/components/ui/typo/typoComponents';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import StageMedia from './StageMedia';
import Stats from '../../../components/Stats';
import { cn } from '@/lib/utils';

interface RouteContentProps {
  stage: Stage;
  regions: Region[];
  pois: POI[];
}

const StageContent = ({ stage, regions, pois }: RouteContentProps) => {
  const description = stage.stageDesc;

  return (
    <div className="flex flex-col gap-y-12">
      {description && (
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
      )}

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
      <div>
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
              Notes importants
            </TabsTrigger>
          </TabsList>
          <TabsContent value="technical-data">
            <section>
              <Stats stats={stage.technicalDetails} />
            </section>
          </TabsContent>
          <TabsContent value="trail-locations">
            <section>
              <ol className="list-decimal pl-12 space-y-2">
                {stage.trailLocations.locationsList.map((loc) => (
                  <li key={loc}>{loc}</li>
                ))}
              </ol>
            </section>
          </TabsContent>
          <TabsContent value="notes">
            <section>
              {stage?.notes?.map((n, i) => <TypoP key={i}>{n}</TypoP>) ?? (
                <TypoP>Sense notes</TypoP>
              )}
            </section>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <TypoH2 className="mb-4">Descobreix l&apos;entorn</TypoH2>
        <Tabs
          defaultValue="allocations"
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="allocations">
              <HotelIcon className="h-5 w-5" />
              Allotjaments
            </TabsTrigger>
            <TabsTrigger value="regions">
              <MapPinIcon className="h-5 w-5" />
              Comarques
            </TabsTrigger>
            <TabsTrigger value="pois">
              <LocateIcon className="h-5 w-5" />
              Punts d&apos;interès
            </TabsTrigger>
          </TabsList>
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
          <TabsContent value="regions">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regions.map((region) => (
                <Link
                  key={region.id}
                  href={`/pelegrinatges/region/${region.id}`}
                >
                  <Card
                    className={cn(
                      'relative w-full pt-0 overflow-hidden',
                      'group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1',
                    )}
                  >
                    <div className="relative aspect-video w-full">
                      <Image
                        src={region.img}
                        alt={region.name}
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
          <TabsContent value="pois">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pois.map((poi) => (
                <Link
                  key={poi.id}
                  href={`/pelegrinatges/poi/${poi.id}`}
                >
                  <Card
                    className={cn(
                      'relative w-full pt-0 overflow-hidden',
                      'group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1',
                    )}
                  >
                    <div className="relative aspect-video w-full">
                      <Image
                        src={poi.img}
                        alt={poi.name}
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
        </Tabs>
      </div>
    </div>
  );
};

export default StageContent;
