import PrimaryPageHero from '../../components/PrimaryPageHero';
import TextBlock from '../../components/TextBlock';
import { santuariContent } from '@/content/santuari/santuariPage';

const creuOllaCampanaPage = () => {
  const { creuOllaCampana } = santuariContent.pages;
  return (
    <>
      <PrimaryPageHero
        title={creuOllaCampana.title}
        subtitle={creuOllaCampana.intro}
        img={{
          src: '/santuari/creu-olla-campana.webp',
          alt: "La Creu, l'Olla i la Campana",
        }}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-12">
            {creuOllaCampana.blocks.map((block, i) => (
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

export default creuOllaCampanaPage;
