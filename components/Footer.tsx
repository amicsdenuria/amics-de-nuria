import { ArrowRightIcon } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { santuariContent } from '@/data/santuari/santuari';
import { site } from '@/config/site.config';

const Footer = () => {
  const { nav: santuariNav } = santuariContent;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-secondary/20">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href={'/'}
              className="text-xl font-medium tracking-wide text-foreground flex items-center gap-3"
            >
              <Image
                alt="Amics de Núria Logo"
                src="/adn-glass-logo-transparent-bg.webp"
                width={24}
                height={24}
              />
              {site.name.long}
            </Link>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-muted-foreground">
              {site.hero.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-foreground">
                Pelegrinatges
              </h4>
              <Link
                href={'/pelegrinatges'}
                className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
              >
                Rutes
              </Link>
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
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-foreground">
                Contacte
              </h4>
              <address className="not-italic mb-4">
                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                  Per a més informació sobre visites,
                  <br />
                  pelegrinatges o col·laboracions,
                  <br />
                  poseu-vos en contacte amb nosaltres.
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
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8">
          <p className="text-center text-xs font-light text-muted-foreground">
            &copy; {currentYear} Amics de Núria. Tots els drets reservats.
            <br />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
