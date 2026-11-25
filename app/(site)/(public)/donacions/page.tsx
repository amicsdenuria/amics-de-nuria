import type { Metadata } from 'next';
import Link from 'next/link';
import PageContainer from '@/components/ui/page-container';
import { site } from '@/config/site.config';
import { DonationTransferDetails } from '../components/DonationTransferDetails';
import PrimaryPageHero from '../components/PrimaryPageHero';

export const metadata: Metadata = {
  title: `Donacions | ${site.name.long}`,
  description: 'Col·labora amb els Amics de Núria amb un donatiu per transferència bancària.',
};

export default function DonationsPage() {
  return (
    <main>
      <PrimaryPageHero
        title="Donacions"
        subtitle="Col·labora amb els Amics de Núria"
        description="La teva aportació ens ajuda a continuar organitzant pelegrinatges, trobades i activitats que mantenen viu el nostre vincle amb Núria."
        img={{
          src: '/hero-vall-nuria.webp',
          alt: 'Vista de la vall de Núria',
        }}
      />

      <section aria-labelledby="donations-transfer">
        <PageContainer className="grid max-w-5xl items-start gap-8 py-16 md:grid-cols-2 md:gap-12 md:py-24">
          <div className="flex flex-col gap-4">
            <h2 id="donations-transfer" className="text-3xl font-light tracking-tight text-primary">
              Com fer un donatiu
            </h2>
            <p className="leading-relaxed">
              Pots fer una aportació puntual per transferència bancària amb
              l’import que triïs.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Si tens cap dubte,{' '}
              <Link href="/contacta" className="font-medium text-foreground underline underline-offset-4">
                posa’t en contacte amb nosaltres
              </Link>
              .
            </p>
          </div>

          <DonationTransferDetails />
        </PageContainer>
      </section>
    </main>
  );
}
