import SantuariPageHero from '../components/SantuariPageHero';
import SantuariStationsCard from '../components/SantuariStationsCard';
import SantuariTextBlock from '../components/SantuariTextBlock';
import { TypoH2Var } from '@/components/ui/typo/typoComponents';
import { santuariContent } from '@/data/santuari/santuari';

const ViaCrucisPage = () => {
  const { viaCrucis } = santuariContent.pages;
  return (
    <>
      <SantuariPageHero
        title={viaCrucis.title}
        intro={viaCrucis.intro}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-12">
            {viaCrucis.blocks.map((block, i) => (
              <SantuariTextBlock
                key={i}
                block={block}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stations */}
      <section className="bg-secondary/20 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <TypoH2Var className="mb-10 text-center">
            Les {viaCrucis.stations.length} estacions
          </TypoH2Var>
          <div className="grid gap-6 sm:grid-cols-2">
            {viaCrucis.stations.map((station) => (
              <SantuariStationsCard
                key={station.title}
                station={station}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recomendations & closing */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mb-10 rounded-lg border border-primary/20 bg-primary/5 p-8">
            <h3 className="mb-4 text-xl font-medium tracking-tight text-foreground">
              Recomanacions
            </h3>
            <p className="text-base font-light leading-relaxed text-muted-foreground">
              {viaCrucis.recommendations}
            </p>
          </div>

          <p className="text-lg font-light italic leading-relaxed text-foreground/80">
            {viaCrucis.closing}
          </p>
        </div>
      </section>
    </>
  );
};

export default ViaCrucisPage;
