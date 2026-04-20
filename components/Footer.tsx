import { ArrowRightIcon } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';
import PageContainer from './ui/page-container';
import { agendaContent } from '@/content/agenda/agendaPage';
import { comunitatContent } from '@/content/comunitat/comunitatPage';
import { pelegrinatgesContent } from '@/content/pelegrinatges/pelegrinatgesPage';
import { publicacionsContent } from '@/content/publicacions/publicacionsPage';
import { santuariContent } from '@/content/santuari/santuariPage';
import { site } from '@/config/site.config';

const Footer = () => {
  const { nav: santuariNav } = santuariContent;
  const { nav: pelegrinatgesNav } = pelegrinatgesContent;
  const { nav: agendaNav } = agendaContent;
  const { nav: comunitatNav } = comunitatContent;
  const { nav: publicacionsNav } = publicacionsContent;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-secondary/20">
      <PageContainer className="py-12 md:py-16">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
          {/* Brand */}
          <section className="lg:col-span-2 text-center lg:text-left mx-auto">
            <Link
              href={'/'}
              className="text-xl font-medium tracking-wide text-foreground flex items-center justify-center lg:justify-start gap-3"
            >
              <Image
                alt="Amics de Núria Logo"
                src="/adn-glass-logo-transparent-bg.webp"
                width={24}
                height={24}
              />
              {site.name.long}
            </Link>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-pretty text-muted-foreground">
              {site.hero.description}
            </p>
          </section>

          {/* Navigation */}
          <section className="lg:col-span-7 grid gap-8 grid-cols-1 md:grid-cols-3 xl:grid-cols-5">
            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-foreground">
                Pelegrinatges
              </h4>
              <ul className="space-y-2">
                {pelegrinatgesNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-foreground">
                El Santuari
              </h4>
              <ul className="space-y-2">
                {santuariNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-foreground">
                Agenda
              </h4>
              <ul className="space-y-2">
                {agendaNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-foreground">
                Comunitat
              </h4>
              <ul className="space-y-2">
                {comunitatNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-foreground">
                Publicacions
              </h4>
              <ul className="space-y-2">
                {publicacionsNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section className="lg:col-span-3 space-y-6">
            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-foreground">
                Contacte
              </h4>
              <address className="not-italic mb-4">
                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                  Per a més informació sobre visites, pelegrinatges o
                  col·laboracions, poseu-vos en contacte amb nosaltres.
                </p>
              </address>

              <div className="border-l border-l-primary">
                <Button
                  asChild
                  variant={'link'}
                  size={'sm'}
                >
                  <Link href={'/contacta'}>
                    Contacta <ArrowRightIcon className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-foreground">
                Web
              </h4>
              <p className="text-sm font-light leading-relaxed text-muted-foreground mb-4">
                Si t&apos;agrada la web visita&apos;ns aquí:
              </p>
              <div className="border-l border-l-primary">
                <Button
                  asChild
                  variant={'link'}
                  size={'sm'}
                >
                  <Link
                    href={'https://www.gmuner.es'}
                    target="_blank"
                  >
                    Genís Muner <ArrowRightIcon className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8">
          <p className="text-center text-xs font-light text-muted-foreground">
            &copy; {currentYear} Amics de Núria. Tots els drets reservats.
            <br />
          </p>
        </div>
      </PageContainer>
    </footer>
  );
};

export default Footer;
