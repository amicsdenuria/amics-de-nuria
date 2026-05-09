import PrimaryPageHero from '../../components/PrimaryPageHero';
import SantuariStationsCard from '../components/SantuariStationsCard';
import TextBlock from '../../components/TextBlock';
import { TypoH2Var } from '@/components/ui/typo/typoComponents';
import { santuariContent } from '@/content/santuari/santuariPage';

const ViaCrucisPage = () => {
  const { viaCrucis } = santuariContent.pages;
  return (
    <>
      <PrimaryPageHero
        title={viaCrucis.title}
        subtitle={viaCrucis.intro}
        img={{
          src: '/santuari/via-crucis.webp',
          alt: 'Via Crucis',
          className: 'object-center',
        }}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-12">
            {viaCrucis.blocks.map((block, i) => (
              <TextBlock
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
    </>
  );
};

export default ViaCrucisPage;
