import PrimaryPageHero from '../../components/PrimaryPageHero';
import TextBlock from '../../components/TextBlock';
import { santuariContent } from '@/content/santuari/santuariPage';

const MareDeDeuPage = () => {
  const { mareDeDeu } = santuariContent.pages;
  return (
    <>
      <PrimaryPageHero
        title={mareDeDeu.title}
        subtitle={mareDeDeu.intro}
        img={{
          src: '/santuari/mare-de-deu-2.webp',
          alt: 'Mare de Déu de Núria',
          className: 'object-center',
        }}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-12">
            {mareDeDeu.blocks.map((block, i) => (
              <TextBlock
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
