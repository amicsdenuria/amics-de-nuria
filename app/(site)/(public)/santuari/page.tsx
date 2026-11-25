import { TypoH2Var, TypoPVar } from '@/components/ui/typo/typoComponents';

import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PrimaryPageHero from '../components/PrimaryPageHero';
import CameraGrid from './components/CameraGrid';
import SectionCard from './components/SectionCard';
import { santuariCameras, santuariCamerasPath } from '@/content/santuari/santuariCameras';
import { santuariContent } from '@/content/santuari/santuariPage';

const SantuariPage = () => {
  const { hero, intro, cards, rutesItineraris } = santuariContent.home;
  return (
    <>
      <PrimaryPageHero
        pretitle={hero.pretitle}
        title={hero.title}
        subtitle={hero.subtitle}
        description={hero.description}
        ctas={hero.ctas}
        img={hero.img}
      />

      {/* Intro */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <TypoH2Var className="mb-6">{intro.title}</TypoH2Var>
          <TypoPVar className="mx-auto text-lg">{intro.body}</TypoPVar>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-secondary/20 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <TypoH2Var className="mb-10 text-center">{cards.title}</TypoH2Var>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.items.map((card) => (
              <SectionCard
                key={card.href}
                card={card}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Rutes i Itineraris */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <TypoH2Var className="mb-6">{rutesItineraris.title}</TypoH2Var>
          <TypoPVar className="mx-auto mb-8">{rutesItineraris.intro}</TypoPVar>
          <Button
            asChild
            size={'lg'}
            className="font-light tracking-wide"
          >
            <Link href={rutesItineraris.cta.href}>
              {rutesItineraris.cta.label}
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section
        aria-labelledby="cameres-en-directe"
        className="bg-secondary/20 py-16 md:py-24"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:gap-10">
          <TypoH2Var id="cameres-en-directe" className="text-center">
            Càmeres en directe
          </TypoH2Var>
          <CameraGrid cameras={santuariCameras.slice(0, 3)} />
          <div className="flex justify-center">
            <Button asChild size="lg">
              <Link href={santuariCamerasPath}>
                Veure més càmeres
                <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SantuariPage;
