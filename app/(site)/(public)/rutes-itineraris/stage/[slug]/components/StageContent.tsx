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
import { TypoH2Var, TypoP } from '@/components/ui/typo/typoComponents';

import { Button } from '@/components/ui/button';
import CopyLinkButton from '../../../components/CopyLinkButton';
import { DomainStage } from '@/domain/stage/stage.types';
import Image from 'next/image';
import Link from 'next/link';
import StageMedia from './StageMedia';
import Stats from '../../../components/Stats';
import { TabsContent } from '@/components/ui/tabs';
import { TabsManager } from './TabsManager';
import { cn } from '@/lib/utils';
import { getImageProps } from '@/sanity/lib/image';

interface RouteContentProps {
  stage: DomainStage;
}

const StageContent = ({ stage }: RouteContentProps) => {
  return (
    <div className="flex flex-col gap-y-12 md:gap-y-24">
      <section className="bg-secondary/40 p-8 rounded-sm shadow-sm max-w-5xl mx-auto">
        {/* DESCRIPTION */}
        <TypoP className="text-muted-foreground leading-relaxed border-l-2 border-accent pl-3 text-base">
          {stage.stageDesc}
        </TypoP>
      </section>

      {/* MEDIA */}
      <section
        id="media-section"
        className="scroll-m-20"
      >
        <TypoH2Var className="mb-4 flex items-center gap-4 text-primary">
          Explora el camí
          <CopyLinkButton hash="media-section" />
        </TypoH2Var>
        <StageMedia
          videoUrl={stage.videoUrl}
          mapUrl={stage.stageMapUrl}
          imgs={stage.imgs}
        />
      </section>

      {/* TECH-DATA, TRAIL LOCATIONS & NOTES */}
      <section
        id="planifica-section"
        className="min-h-60 scroll-m-20"
      >
        <TypoH2Var className="mb-4 flex items-center gap-4 text-primary">
          Planifica l&apos;etapa
          <CopyLinkButton hash="planifica-section" />
        </TypoH2Var>
        <TabsManager
          paramName="planificaTab"
          defaultValue="technical-data"
          sectionId="planifica-section"
          tabs={[
            {
              value: 'technical-data',
              label: 'Dades tècniques',
              icon: <MountainIcon className="h-5 w-5" />,
            },
            {
              value: 'trail-locations',
              label: 'Itinerari',
              icon: <RouteIcon className="h-5 w-5" />,
            },
            ...(stage.notes
              ? [
                  {
                    value: 'notes',
                    label: 'Notes',
                    icon: <InfoIcon className="h-5 w-5" />,
                  },
                ]
              : []),
          ]}
        >
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
          {stage.notes && (
            <TabsContent value="notes">
              <ul className="list-disc pl-12 py-4 space-y-2">
                {stage?.notes?.map((n, i) => <li key={i}>{n}</li>) ?? (
                  <li>Sense notes</li>
                )}
              </ul>
            </TabsContent>
          )}
        </TabsManager>
      </section>

      <section
        id="entorn-section"
        className="min-h-64 scroll-m-20"
      >
        <TypoH2Var className="mb-4 flex items-center gap-4 text-primary">
          Descobreix l&apos;entorn
          <CopyLinkButton hash="entorn-section" />
        </TypoH2Var>
        <TabsManager
          paramName="entornTab"
          defaultValue={stage.pois?.length ? 'pois' : 'regions'}
          sectionId="entorn-section"
          tabs={[
            ...(stage.pois
              ? [
                  {
                    value: 'pois',
                    label: "P. d'interès",
                    icon: <LocateIcon className="h-5 w-5" />,
                  },
                ]
              : []),
            {
              value: 'regions',
              label: 'Comarques',
              icon: <MapPinIcon className="h-5 w-5" />,
            },
            ...(stage.allocations
              ? [
                  {
                    value: 'allocations',
                    label: 'Allotjaments',
                    icon: <HotelIcon className="h-5 w-5" />,
                  },
                ]
              : []),
          ]}
        >
          {stage.pois && (
            <TabsContent value="pois">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stage.pois.map((poi) => (
                  <Link
                    key={poi.slug}
                    href={`/rutes-itineraris/poi/${poi.slug}`}
                  >
                    <Card
                      className={cn(
                        'relative w-full pt-0 overflow-hidden',
                        'group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1',
                      )}
                    >
                      {(() => {
                        const imageProps = getImageProps(poi.img, {
                          fill: true,
                          sizes:
                            '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
                          fit: 'crop',
                          targetWidth: 768,
                          targetHeight: 432,
                        });

                        if (!imageProps) {
                          return null;
                        }

                        return (
                          <div className="relative aspect-video w-full">
                            <Image
                              src={imageProps.src}
                              alt={imageProps.alt}
                              fill
                              sizes={imageProps.sizes}
                              className="relative z-20 aspect-video w-full object-cover"
                            />
                          </div>
                        );
                      })()}
                      <CardHeader>
                        <CardTitle>{poi.name}</CardTitle>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          )}
          <TabsContent value="regions">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stage.regions.map((region) => (
                <Link
                  key={region.slug}
                  href={`/rutes-itineraris/region/${region.slug}`}
                >
                  <Card
                    className={cn(
                      'relative w-full pt-0 overflow-hidden',
                      'group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1',
                    )}
                  >
                    {(() => {
                      const imageProps = getImageProps(region.img, {
                        fill: true,
                        sizes:
                          '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
                        fit: 'crop',
                        targetWidth: 768,
                        targetHeight: 432,
                      });

                      if (!imageProps) {
                        return null;
                      }

                      return (
                        <div className="relative aspect-video w-full">
                          <Image
                            src={imageProps.src}
                            alt={imageProps.alt}
                            fill
                            sizes={imageProps.sizes}
                            className="relative z-20 aspect-video w-full object-cover"
                          />
                        </div>
                      );
                    })()}
                    <CardHeader>
                      <CardTitle>{region.name}</CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
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
        </TabsManager>
      </section>
    </div>
  );
};

export default StageContent;
