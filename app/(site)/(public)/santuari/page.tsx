import { TypoH2Var, TypoPVar } from '@/components/ui/typo/typoComponents';

import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SantuariHero from './components/SantuariHero';
import SectionCard from './components/SectionCard';
import { santuariContent } from '@/content/santuari/santuariPage';

const SantuariPage = () => {
  const { home } = santuariContent;
  return (
    <>
      <SantuariHero content={home.hero} />

      {/* Intro */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <TypoH2Var className="mb-6">{home.intro.title}</TypoH2Var>
          <TypoPVar className="mx-auto text-lg">{home.intro.body}</TypoPVar>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-secondary/20 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <TypoH2Var className="mb-10 text-center">
            {home.cards.title}
          </TypoH2Var>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {home.cards.items.map((card) => (
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
          <TypoH2Var className="mb-6">{home.pilgrimages.title}</TypoH2Var>
          <TypoPVar className="mx-auto mb-8">{home.pilgrimages.intro}</TypoPVar>
          <Button
            asChild
            size={'lg'}
            className="font-light tracking-wide"
          >
            <Link href={home.pilgrimages.cta.href}>
              {home.pilgrimages.cta.label}
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default SantuariPage;
