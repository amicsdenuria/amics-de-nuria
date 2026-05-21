import PrimaryPageHero from '../../components/PrimaryPageHero';
import TextBlock from '../../components/TextBlock';
import { santuariContent } from '@/content/santuari/santuariPage';

const CreuRibaPage = () => {
  const { creuRiba } = santuariContent.pages;
  return (
    <>
      <PrimaryPageHero
        title={creuRiba.title}
        subtitle={creuRiba.intro}
        img={{
          src: '/santuari/creu-riba.webp',
          alt: "La Creu d'en Riba",
          className: 'object-center',
        }}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-12">
            {creuRiba.blocks.map((block, i) => (
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

export default CreuRibaPage;
