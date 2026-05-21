import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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

            <div className="rounded-2xl my-16 md:my-24 bg-secondary/20 p-6 text-center">
              <h2 className="mb-3 text-2xl font-light tracking-tight text-foreground">
                Fets cronològics rellevants
              </h2>
              <p className="mx-auto mb-6 max-w-2xl text-base font-light leading-relaxed text-muted-foreground">
                Consulta la cronologia completa dels fets, pelegrinatges i
                moments destacats vinculats a la Vall de Núria i a la Lliga
                Espiritual.
              </p>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-light tracking-wide"
              >
                <Link href="/lliga-espiritual/origens/fets-cronologics">
                  Veure els fets cronològics
                  <ArrowRightIcon />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default origensPage;
