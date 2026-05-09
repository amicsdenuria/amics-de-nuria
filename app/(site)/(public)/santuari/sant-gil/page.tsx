import PrimaryPageHero from '../../components/PrimaryPageHero';
import TextBlock from '../../components/TextBlock';
import { santuariContent } from '@/content/santuari/santuariPage';

const SantGilPage = () => {
  const { santGil } = santuariContent.pages;
  return (
    <>
      <PrimaryPageHero
        title={santGil.title}
        subtitle={santGil.intro}
        img={{
          src: '/santuari/sant-gil.webp',
          alt: 'Ermita de Sant Gil',
          className: 'object-center',
        }}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-12">
            {santGil.blocks.map((block, i) => (
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

export default SantGilPage;
