import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import PrimaryActionButtonHero from '@/components/navbar/PrimaryActionButtonHero';
import { cn } from '@/lib/utils';

export interface PrimaryPageHeroImage {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export interface PrimaryPageHeroProps {
  pretitle?: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctas?: {
    href: string;
    label: string;
  }[];
  img?: PrimaryPageHeroImage;
  showSubscribeCTA?: boolean;
  isEnrolled?: boolean;
}

const PrimaryPageHero = ({
  pretitle,
  title,
  subtitle,
  description,
  ctas,
  img,
  showSubscribeCTA = false,
  isEnrolled,
}: PrimaryPageHeroProps) => {
  const showPrimaryCTAButton = showSubscribeCTA && !isEnrolled;

  const isRutesItinerarisSubpage =
    pretitle === 'Ruta' ||
    pretitle === 'Etapa' ||
    pretitle === "Punt d'interès" ||
    pretitle === 'Comarca';

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center font-serif overflow-hidden bg-secondary/30">
      {img && (
        <>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={img.sizes}
            className={cn('object-cover', img.className)}
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-white/75" />
          <div className="absolute inset-0 backdrop-blur-[1.5px]" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-center">
        {img && (
          <>
            <div className="absolute inset-0 bg-radial translate-y-6 from-white/20 via-transparent to-transparent -z-10" />
            <div className="absolute inset-0 bg-radial translate-y-24 from-white/70 via-transparent to-transparent -z-10" />
          </>
        )}
        {pretitle && (
          <p className="mb-4 text-sm font-light uppercase tracking-widest text-muted-foreground">
            {pretitle}
          </p>
        )}
        <h1
          className={cn(
            'mb-6 text-balance text-5xl font-light leading-tight tracking-tight md:text-6xl lg:text-7xl',
            isRutesItinerarisSubpage ? 'text-primary' : 'text-foreground',
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mb-4 text-lg font-light leading-relaxed text-foreground/80 md:text-2xl">
            {subtitle}
          </p>
        )}
        {description && (
          <p className="mx-auto mb-10 max-w-2xl text-base font-light leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
        {ctas && ctas.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {showPrimaryCTAButton && (
              <PrimaryActionButtonHero isEnrolled={isEnrolled ?? false} />
            )}
            {ctas.map((cta, i) => (
              <Button
                key={cta.href}
                asChild
                variant={
                  i === 0 && !showPrimaryCTAButton ? 'default' : 'outline'
                }
                size={'lg'}
                className="min-w-[180px] font-light tracking-wide"
              >
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Decorative bottom line */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border to-transparent" /> */}
    </section>
  );
};

export default PrimaryPageHero;
