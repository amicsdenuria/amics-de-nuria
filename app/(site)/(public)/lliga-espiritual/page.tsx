import { Card, CardContent } from '@/components/ui/card';
import { TypoH2Var, TypoPVar } from '@/components/ui/typo/typoComponents';

import NestedTextBlock from '../components/NestedTextBlock';
import PrimaryActionButtonHero from '@/components/navbar/PrimaryActionButtonHero';
import PrimaryPageHero from '../components/PrimaryPageHero';
import RRSSSection from './components/RRSSSection';
import TextBlock from '../components/TextBlock';
import { getUserData } from '@/actions/getUserData';
import { lligaEspiritualContent } from '@/content/lliga-espiritual/lligaEspiritualPage';

const LligaEspiritualPage = async () => {
  const { isEnrolled } = await getUserData();
  const { hero, intro, subscribe, manifesto, rrss } =
    lligaEspiritualContent.home;

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
          <div className="space-y-12 mx-auto w-fit text-left">
            {manifesto.blocks.map((block, i) => (
              <Card
                key={i}
                className="px-2 py-8"
              >
                <CardContent>
                  {block.items?.length ? (
                    <NestedTextBlock
                      key={i}
                      block={block}
                    />
                  ) : (
                    <TextBlock
                      key={i}
                      block={block}
                    />
                  )}
                </CardContent>
              </Card>
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
