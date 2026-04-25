import SantuariPageHero from '../components/SantuariPageHero';
import TextBlock from '../../components/TextBlock';
import { santuariContent } from '@/content/santuari/santuariPage';

const LlarAmadeuPage = () => {
  const { llarAmadeu } = santuariContent.pages;
  return (
    <>
      <SantuariPageHero
        title={llarAmadeu.title}
        intro={llarAmadeu.intro}
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
