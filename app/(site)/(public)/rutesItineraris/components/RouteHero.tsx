import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FootprintsIcon,
  MapPinIcon,
  MilestoneIcon,
  RouteIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import PageContainer from '../../../../../components/ui/page-container';
import { cn } from '@/lib/utils';

interface HeroProps {
  title: string;
  origin: string;
  destiny: string;
  alternativeRoutePoints: string[] | undefined;
  type?: 'route' | 'stage';
  hasImage?: boolean;
  img?: {
    alt: string;
    src: string;
    className?: string;
  };
}

const RouteHero = ({
  title,
  origin,
  destiny,
  alternativeRoutePoints,
  type = 'route',
  hasImage = true,
  img,
}: HeroProps) => {
  return (
    <section className="relative h-[45vh] w-full mb-16">
      {hasImage && img ? (
        <Image
          alt={img.alt}
          src={img.src}
          fill
          sizes="100vw"
          className={cn('object-cover', img.className)}
        />
      ) : (
        hasImage && (
          <Image
            alt="Vall de Núria"
            src="/hero-muntanya-nuria.webp"
            fill
            sizes="100vw"
            className={cn('object-cover object-top')}
          />
        )
      )}
      <div className="absolute inset-0 bg-linear-to-b from-white/5 to-white/40 dark:to-black/40" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/85 md:via-background/70 to-background/20 dark:to-background/20" />

      <PageContainer className="relative h-full flex flex-col justify-end">
        <div className="max-w-5xl">
          {/* BACK BUTTON */}
          {type === 'route' && (
            <Button
              asChild
              variant={'link'}
              size={'sm'}
              className="mb-6 -ml-2"
            >
              <Link href={'/pelegrinatges'}>
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                <span className="text-sm md:text-lg">Tornar a rutes</span>
              </Link>
            </Button>
          )}

          <div>
            <div className="flex items-start gap-3 mb-4">
              <div className="hidden lg:block p-2.5 rounded-lg bg-primary text-primary-foreground mt-2">
                {type === 'route' ? <RouteIcon /> : <FootprintsIcon />}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent text-balance">
                {title}
              </h1>
            </div>

            {/* ORIGIN DESTINY */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-emerald-600" />
                <span className="font-semibold text-lg">{origin}</span>
              </div>
              <ArrowRightIcon className="h-5 w-5 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-rose-600" />
                <span className="font-semibold text-lg">{destiny}</span>
              </div>
            </div>

            {/* ALTERNATIVE POINTS */}
            {alternativeRoutePoints && alternativeRoutePoints.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-sm text-muted-foreground">
                  Passant per:
                </span>
                {alternativeRoutePoints.map((point) => (
                  <Badge
                    key={point}
                    variant={'secondary'}
                  >
                    <MilestoneIcon className="h-3 w-3 mr-1" />
                    {point}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </PageContainer>
    </section>
  );
};
export default RouteHero;
