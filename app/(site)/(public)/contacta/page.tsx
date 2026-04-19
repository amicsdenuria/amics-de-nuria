import { Button } from '@/components/ui/button';
import { ExternalLinkIcon } from 'lucide-react';
import Hero from '@/components/Hero';
import Link from 'next/link';
import PageContainer from '@/components/ui/page-container';

const ContactaPage = () => {
  return (
    <>
      <Hero
        title="Contacta amb Amics de Núria"
        description=""
      />
      <PageContainer className="py-16 md:py-24">
        <div className="mb-12 relative grid grid-cols-2 gap-8">
          <div className="text-right">
            <h2 className="text-muted-foreground">Correu</h2>
            <p className="text-lg">amicsdenuria@adn.cat</p>
          </div>
          <div className="absolute bg-linear-to-b from-transparent via-border to-transparent h-12 border inset-x-1/2 -translate-x-1/2" />
          <div>
            <h2 className="text-muted-foreground">Telèfon</h2>
            <p className="text-lg">612 34 56 78</p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-muted-foreground">Web</h2>
          <Button
            asChild
            variant={'ghost'}
            className="hover:text-primary-foreground transition-colors duration-100 text-lg"
          >
            <Link
              href={'https://www.gmuner.es'}
              className="flex gap-2 items-center"
            >
              Genís Muner
              <ExternalLinkIcon className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </PageContainer>
    </>
  );
};

export default ContactaPage;
