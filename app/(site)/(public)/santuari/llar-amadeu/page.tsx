import PrimaryPageHero from '../../components/PrimaryPageHero';
import TextBlock from '../../components/TextBlock';
import { santuariContent } from '@/content/santuari/santuariPage';

const LlarAmadeuPage = () => {
  const { llarAmadeu } = santuariContent.pages;
  return (
    <>
      <PrimaryPageHero
        title={llarAmadeu.title}
        subtitle={llarAmadeu.intro}
        img={{
          src: '/santuari/llar-amadeu.webp',
          alt: 'El pelegrí Amadeu',
          className: 'object-center',
        }}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-12">
            {llarAmadeu.blocks.map((block, i) => (
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

export default LlarAmadeuPage;
