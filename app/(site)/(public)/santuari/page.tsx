import { TypoH2Var, TypoPVar } from '@/components/ui/typo/typoComponents';

import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PrimaryPageHero from '../components/PrimaryPageHero';
import SectionCard from './components/SectionCard';
import { santuariContent } from '@/content/santuari/santuariPage';

const SantuariPage = () => {
  const { hero, intro, cards, pilgrimages } = santuariContent.home;
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

      {/* Pelegrinatges */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <TypoH2Var className="mb-6">{pilgrimages.title}</TypoH2Var>
          <TypoPVar className="mx-auto mb-8">{pilgrimages.intro}</TypoPVar>
          <Button
            asChild
            size={'lg'}
            className="font-light tracking-wide"
          >
            <Link href={pilgrimages.cta.href}>
              {pilgrimages.cta.label}
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default SantuariPage;
