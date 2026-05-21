import { TypoH2Var, TypoPVar } from '@/components/ui/typo/typoComponents';

import PrimaryActionButtonHero from '@/components/navbar/PrimaryActionButtonHero';
import PrimaryPageHero from '../components/PrimaryPageHero';
import RRSSSection from './components/RRSSSection';
import SectionCard from '../santuari/components/SectionCard';
import { getUserData } from '@/actions/getUserData';
import { lligaEspiritualContent } from '@/content/lliga-espiritual/lligaEspiritualPage';

const LligaEspiritualPage = async () => {
  const { isEnrolled } = await getUserData();
  const { hero, intro, subscribe, cards, rrss } = lligaEspiritualContent.home;

  return (
    <>
      <PrimaryPageHero
        pretitle={hero.pretitle}
        title={hero.title}
        subtitle={hero.subtitle}
        description={hero.description}
        ctas={hero.ctas}
        img={hero.img}
        showSubscribeCTA
        isEnrolled={isEnrolled}
      />

      {/* Intro */}
      <section className="py-16 md:py-24 scroll-m-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <TypoH2Var className="mb-6">{intro.title}</TypoH2Var>
          <TypoPVar className="mx-auto text-lg">{intro.body}</TypoPVar>
        </div>
      </section>

      {/* Subscribe */}
      <section className="bg-secondary/20 py-16 md:py-24 scroll-m-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <TypoH2Var className="mb-6">{subscribe.title}</TypoH2Var>
          <TypoPVar className="mx-auto mb-8">{subscribe.body}</TypoPVar>
          <PrimaryActionButtonHero isEnrolled={isEnrolled} />
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 md:py-24 scroll-m-20">
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

      <section
        id="rrss"
        className="bg-secondary/20 py-16 md:py-24 scroll-m-20"
      >
        <RRSSSection
          title={rrss.title}
          subtitle={rrss.subtitle}
          own={rrss.own}
          others={rrss.others}
        />
      </section>
    </>
  );
};

export default LligaEspiritualPage;
