import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';
import PageContainer from './ui/page-container';
import { agendaContent } from '@/content/agenda/agendaPage';
import { contactaContent } from '@/content/contacta/contactaPage';
import { lligaEspiritualContent } from '@/content/lliga-espiritual/lligaEspiritualPage';
import { publicacionsContent } from '@/content/publicacions/publicacionsPage';
import { rutesItinerarisContent } from '@/content/rutes-itineraris/rutesItinerarisPage';
import { santuariContent } from '@/content/santuari/santuariPage';
import { site } from '@/config/site.config';

const brandLinkGroups = [
  {
    title: 'Les nostres xarxes',
    links: lligaEspiritualContent.home.rrss.own,
  },
  {
    title: "Enllaços d'interès",
    links: lligaEspiritualContent.home.rrss.others,
  },
];

const Footer = () => {
  const footerNav = {
    santuariNav: santuariContent.nav,
    pelegrinatgesNav: rutesItinerarisContent.nav,
    agendaNav: agendaContent.nav,
    lligaEspiritualNav: lligaEspiritualContent.nav,
    publicacionsNav: publicacionsContent.nav,
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-secondary/20">
      <PageContainer className="py-12 md:py-16">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
          {/* Brand */}
          <section className="mx-auto flex w-full max-w-xs flex-col gap-8 text-center lg:col-span-2 lg:text-left">
            <div>
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
            </div>

            {brandLinkGroups.map((group) =>
              group.links.length > 0 ? (
                <nav key={group.title} aria-label={group.title}>
                  <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-foreground">
                    {group.title}
                  </h4>
                  <ul className="flex flex-col gap-1">
                    {group.links.map(({ href, label, icon: Icon }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-8 items-center gap-2 rounded-sm text-sm font-light text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          {Icon ? (
                            <Icon aria-hidden="true" className="size-4 shrink-0" />
                          ) : null}
                          {label}
                          <ArrowUpRightIcon
                            aria-hidden="true"
                            className="size-3 shrink-0 opacity-60"
                          />
                          <span className="sr-only">
                            {' '}(s&apos;obre en una pestanya nova)
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null,
            )}
          </section>

          {/* Navigation */}
          <section className="lg:col-span-7 grid gap-8 grid-cols-1 md:grid-cols-3 xl:grid-cols-5">
            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-foreground">
                {santuariContent.home.hero.title}
              </h4>
              <ul className="space-y-2">
                {footerNav.santuariNav.map((item) => (
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
                {rutesItinerarisContent.home.hero.title}
              </h4>
              <ul className="space-y-2">
                {footerNav.pelegrinatgesNav.map((item) => (
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
                {agendaContent.home.hero.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {footerNav.agendaNav.map((item) => (
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
                {lligaEspiritualContent.home.hero.title}
              </h4>
              <ul className="space-y-2">
                {footerNav.lligaEspiritualNav.map((item) => (
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

            {/* <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-foreground">
                {publicacionsContent.home.hero.title}
              </h4>
              <ul className="space-y-2">
                {footerNav.publicacionsNav.map((item) => (
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
            </div> */}
          </section>

          {/* Contact */}
          <section className="lg:col-span-3 space-y-6">
            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-foreground">
                {contactaContent.home.hero.title}
              </h4>
              <address className="not-italic mb-4">
                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                  {contactaContent.home.hero.subtitle}
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
                Disseny i desenvolupament web
              </h4>
              <div className="border-l border-l-primary">
                <Button
                  asChild
                  variant={'link'}
                  size={'sm'}
                >
                  <Link
                    href={'https://www.instagram.com/munergenis/'}
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
