import { TypoH2Var, TypoPVar } from '@/components/ui/typo/typoComponents';

import PrimaryActionButtonHero from '@/components/navbar/PrimaryActionButtonHero';
import PrimaryPageHero from '../components/PrimaryPageHero';
import RRSSSection from './components/RRSSSection';
import TextBlock from '../components/TextBlock';
import { comunitatContent } from '@/content/comunitat/comunitatPage';
import { getUserData } from '@/actions/getUserData';

const ComunitatPage = async () => {
  const { isEnrolled } = await getUserData();
  const { hero, intro, subscribe, manifesto, rrss } = comunitatContent.home;

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

      {/* Manifesto */}
      <section
        id="manifesto"
        className="py-16 md:py-24 scroll-m-20"
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          <TypoH2Var className="mb-6">{manifesto.title}</TypoH2Var>
          <TypoPVar className="mx-auto mb-8">{manifesto.intro}</TypoPVar>
          <div className="space-y-12 mx-auto w-fit">
            {manifesto.blocks.map((block, i) => (
              <TextBlock
                key={i}
                block={block}
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

export default ComunitatPage;
