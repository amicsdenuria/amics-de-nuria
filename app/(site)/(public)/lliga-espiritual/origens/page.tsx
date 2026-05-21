import NestedTextBlock from '../../components/NestedTextBlock';
import PrimaryPageHero from '../../components/PrimaryPageHero';
import TextBlock from '../../components/TextBlock';
import { lligaEspiritualContent } from '@/content/lliga-espiritual/lligaEspiritualPage';

const origensPage = () => {
  const { origens } = lligaEspiritualContent.pages;
  return (
    <>
      <PrimaryPageHero
        title={origens.title}
        subtitle={origens.intro}
        img={{
          src: '/hero-santuari-nuria.webp',
          alt: 'Santuari de Núria',
        }}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-12">
            {origens.blocks.map((block, i) =>
              block.items?.length ? (
                <NestedTextBlock
                  key={i}
                  block={block}
                />
              ) : (
                <TextBlock
                  key={i}
                  block={block}
                />
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default origensPage;
