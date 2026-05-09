import PrimaryPageHero from '../../components/PrimaryPageHero';
import TextBlock from '../../components/TextBlock';
import { santuariContent } from '@/content/santuari/santuariPage';

const basilicaPage = () => {
  const { basilica } = santuariContent.pages;
  return (
    <>
      <PrimaryPageHero
        title={basilica.title}
        subtitle={basilica.intro}
        img={{
          src: '/santuari/basilica.webp',
          alt: 'Basílica del santuari de Núria',
          className: 'object-bottom',
        }}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-12">
            {basilica.blocks.map((block, i) => (
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

export default basilicaPage;
