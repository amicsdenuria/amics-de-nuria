import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/ui/page-container';
import { site } from '@/config/site.config';
import PrimaryPageHero from '../components/PrimaryPageHero';

const donationUrl =
  'https://www.donoamiiglesia.es/es/donar.html/efa72686-34df-f111-84e8-e4fb1ef8c6ae';

export const metadata: Metadata = {
  title: `Donacions | ${site.name.long}`,
  description: 'Col·labora amb la Lliga espiritual de la Mare de Déu de Núria fent un donatiu puntual en línia.',
};

export default function DonationsPage() {
  return (
    <main>
      <PrimaryPageHero
        title="Donacions"
        subtitle="Col·labora amb la Lliga espiritual de la Mare de Déu de Núria"
        description="La teva aportació ens ajuda a continuar organitzant pelegrinatges, trobades i activitats que mantenen viu el nostre vincle amb Núria."
        img={{
          src: '/hero-vall-nuria.webp',
          alt: 'Vista de la vall de Núria',
        }}
      />

      <section aria-labelledby="donation-instructions">
        <PageContainer className="flex max-w-2xl flex-col items-center gap-6 py-20 md:py-28">
          <h2 id="donation-instructions" className="text-center text-3xl font-light tracking-tight text-primary">
            Com fer un donatiu
          </h2>
          <ol role="list" className="w-full divide-y divide-border">
            <li className="flex items-start gap-4 py-5">
              <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 font-medium text-foreground">
                1
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-medium text-foreground">Obre el formulari</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Prem «Dona aquí». La Lliga ja hi apareix com a destinatària.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4 py-5">
              <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 font-medium text-foreground">
                2
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-medium text-foreground">Tria l’import i la periodicitat</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Tria o escriu l’import i marca <strong className="font-semibold text-foreground">«Puntual»</strong>.
                  Si vols col·laborar regularment, et pots{' '}
                  <Link href="/lliga-espiritual" className="font-medium text-foreground underline underline-offset-4">
                    fer soci de la Lliga
                  </Link>
                  .
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4 py-5">
              <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 font-medium text-foreground">
                3
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-medium text-foreground">Completa el donatiu</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Indica si dones com a particular o entitat, prem «Realizar Donación»,
                  omple les dades i completa el pagament.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  Se’t farà arribar el certificat per a la declaració de la renda.
                </p>
              </div>
            </li>
          </ol>
          <Button asChild size="lg">
            <a href={donationUrl}>Dona aquí</a>
          </Button>
        </PageContainer>
      </section>
    </main>
  );
}
