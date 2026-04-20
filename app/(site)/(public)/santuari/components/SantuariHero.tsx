import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PrimaryPageHeroContent } from '@/content/interfaces/primary-page-interfaces';

interface SantuariHeroProps {
  content: PrimaryPageHeroContent;
}

const SantuariHero = ({ content }: SantuariHeroProps) => {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center font-serif overflow-hidden bg-secondary/30">
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="mb-4 text-sm font-light uppercase tracking-widest text-muted-foreground">
          Benvinguts
        </p>
        <h1 className="mb-6 text-balance text-5xl font-light leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          {content.title}
        </h1>
        <p className="mb-4 text-lg font-light leading-relaxed text-foreground/80 md:text-2xl">
          {content.subtitle}
        </p>
        <p className="mx-auto mb-10 max-w-2xl text-base font-light leading-relaxed text-muted-foreground md:text-lg">
          {content.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {content.ctas.map((cta, i) => (
            <Button
              key={cta.href}
              asChild
              variant={i === 0 ? 'default' : 'outline'}
              size={'lg'}
              className="min-w-[180px] font-light tracking-wide"
            >
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          ))}
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default SantuariHero;
