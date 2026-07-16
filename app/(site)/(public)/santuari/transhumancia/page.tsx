import PrimaryPageHero from '../../components/PrimaryPageHero';
import TextBlock from '../../components/TextBlock';
import { santuariContent } from '@/content/santuari/santuariPage';

const TranshumanciaPage = () => {
  const { transhumancia } = santuariContent.pages;
  return (
    <>
      <PrimaryPageHero
        title={transhumancia.title}
        subtitle={transhumancia.intro}
        img={{
          src: '/santuari/vall-nuria-2.webp',
          alt: 'El pelegrí Amadeu',
          className: 'object-center',
        }}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-12">
            {transhumancia.blocks.map((block, i) => (
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

export default TranshumanciaPage;
