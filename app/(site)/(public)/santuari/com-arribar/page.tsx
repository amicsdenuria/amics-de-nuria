import SantuariInfoCard from '../components/SantuariInfoCard';
import SantuariPageHero from '../components/SantuariPageHero';
import SantuariTextBlock from '../components/SantuariTextBlock';
import { TypoH2Var } from '@/components/ui/typo/typoComponents';
import { santuariContent } from '@/data/santuari/santuari';

const ComArribarPage = () => {
  const { comArribar } = santuariContent.pages;
  return (
    <>
      <SantuariPageHero
        title={comArribar.title}
        intro={comArribar.intro}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-12">
            {comArribar.blocks.map((block, i) => (
              <div
                key={i}
                className="border-l-2 border-primary/20 pl-6 transition-colors hover:border-primary/40"
              >
                <SantuariTextBlock block={block} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/20 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <TypoH2Var className="mb-10 text-center">
            Informació pràctica
          </TypoH2Var>
          <div className="grid gap-6 sm:grid-cols-2">
            {comArribar.practical.map((item) => (
              <SantuariInfoCard
                key={item.label}
                item={item}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xl font-light italic leading-relaxed text-foreground/80">
            {comArribar.closing}
          </p>
        </div>
      </section>
    </>
  );
};

export default ComArribarPage;
