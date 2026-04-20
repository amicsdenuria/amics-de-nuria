import SantuariPageHero from '../components/SantuariPageHero';
import SantuariTextBlock from '../components/SantuariTextBlock';
import { santuariContent } from '@/content/santuari/santuariPage';

const MareDeDeuPage = () => {
  const { mareDeDeu } = santuariContent.pages;
  return (
    <>
      <SantuariPageHero
        title={mareDeDeu.title}
        intro={mareDeDeu.intro}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-12">
            {mareDeDeu.blocks.map((block, i) => (
              <SantuariTextBlock
                key={i}
                block={block}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MareDeDeuPage;
