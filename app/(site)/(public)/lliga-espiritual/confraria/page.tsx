import PrimaryPageHero from '../../components/PrimaryPageHero';
import TextBlock from '../../components/TextBlock';
import { lligaEspiritualContent } from '@/content/lliga-espiritual/lligaEspiritualPage';

const confrariaPage = () => {
  const { confraria } = lligaEspiritualContent.pages;
  return (
    <>
      <PrimaryPageHero
        title={confraria.title}
        subtitle={confraria.intro}
        img={{
          src: '/hero-santuari-nuria.webp',
          alt: 'Santuari de Núria',
        }}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-12">
            {confraria.blocks.map((block, i) => (
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

export default confrariaPage;
