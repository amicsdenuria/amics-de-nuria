import NestedTextBlock, {
  NestedTextBlockType,
} from '../../components/NestedTextBlock';

import PrimaryPageHero from '../../components/PrimaryPageHero';
import SantuariInfoCard from '../components/SantuariInfoCard';
import TextBlock from '../../components/TextBlock';
import { TypoH2Var } from '@/components/ui/typo/typoComponents';
import { santuariContent } from '@/content/santuari/santuariPage';

const ComArribarPage = () => {
  const { comArribar } = santuariContent.pages;

  return (
    <>
      <PrimaryPageHero
        title={comArribar.title}
        subtitle={comArribar.intro}
        img={{
          src: '/santuari/vall-nuria-2.webp',
          alt: 'Vall de Núria',
          className: 'object-center',
        }}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-12">
            {comArribar.sections.map((block: NestedTextBlockType, i: number) =>
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

      <section className="bg-secondary/20 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <TypoH2Var className="mb-10 text-center">
            Informació pràctica
          </TypoH2Var>
          <div className="grid gap-6 sm:grid-cols-2">
            {comArribar.practical.map((item) => (
              <SantuariInfoCard
                key={item.label}
                item={item}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <TypoH2Var className="mb-10 text-center">Mapa</TypoH2Var>

          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe
              src={comArribar.map}
              className="h-[400px] w-full md:h-[500px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ComArribarPage;
