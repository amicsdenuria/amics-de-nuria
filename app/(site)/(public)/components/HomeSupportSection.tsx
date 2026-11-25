import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import PrimaryActionButtonHero from '@/components/navbar/PrimaryActionButtonHero';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/ui/page-container';
import { TypoH2Var } from '@/components/ui/typo/typoComponents';
import { cn } from '@/lib/utils';
import { DonationTransferDetails } from './DonationTransferDetails';

const blockClassName = 'flex min-w-0 flex-col items-start gap-4 md:items-center';

export function HomeSupportSection({ isEnrolled }: { isEnrolled: boolean }) {
  return (
    <section aria-labelledby="home-support" className="bg-secondary/20">
      <PageContainer className="py-12 md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:gap-12">
          <TypoH2Var id="home-support" className="text-primary md:text-center">
            Col·labora amb nosaltres
          </TypoH2Var>

          <div className={cn(
            'mx-auto grid w-full max-w-xl gap-10 md:gap-12 md:text-center',
            !isEnrolled && 'lg:max-w-4xl lg:grid-cols-2',
          )}>
            {!isEnrolled && (
              <section className={blockClassName}>
                <h3 className="text-xl font-medium">Ser soci</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Amb la teva quota ajudes a mantenir les activitats i els
                  pelegrinatges dels Amics de Núria al llarg de l’any.
                </p>
                <PrimaryActionButtonHero isEnrolled={false} />
              </section>
            )}

            <section className={blockClassName}>
              <h3 className="text-xl font-medium">Fes un donatiu</h3>
              <p className="leading-relaxed text-muted-foreground">
                Fes una transferència amb l’import que vulguis i el concepte indicat.
              </p>
              <DonationTransferDetails heading="h4" />
              <Button asChild variant="outline">
                <Link href="/donacions">
                  Més informació
                  <ArrowRightIcon aria-hidden="true" />
                </Link>
              </Button>
            </section>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
