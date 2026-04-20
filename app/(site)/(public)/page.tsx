import { Card, CardContent } from '@/components/ui/card';

import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import PageContainer from '@/components/ui/page-container';
import PrimaryPageHero from './components/PrimaryPageHero';
import { cn } from '@/lib/utils';
import { getUserData } from '@/actions/getUserData';
import { homeSections } from '@/content/home/homePage';
import { site } from '@/config/site.config';

export default async function Home() {
  const { isEnrolled } = await getUserData();
  const ctas = [
    { label: 'Rutes i itineraris', href: '/pelegrinatges' },
    { label: 'Agenda', href: '/agenda' },
  ];

  return (
    <main className="flex-1 flex flex-col">
      <PrimaryPageHero
        title={site.hero.title}
        description={site.hero.description}
        img={{
          src: '/hero-santuari-nuria.webp',
          alt: 'Santuari de Núria',
          className: 'object-center',
        }}
        ctas={ctas}
        showSubscribeCTA
        isEnrolled={isEnrolled}
      />
      <PageContainer className="py-16 md:py-24 flex-1 flex">
        <section className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {homeSections.map((section) => {
              const Icon = section.icon;

              return (
                <Link
                  key={`${section.title}-${section.href}`}
                  href={section.href}
                  className={cn('group block col-span-1', section.gridClass)}
                >
                  <Card className="relative z-0 h-full min-h-[180px] overflow-hidden border-border/50 bg-card/50 p-6 md:p-8 transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-lg">
                    <CardContent className="flex h-full flex-col justify-between p-0">
                      <div>
                        <div className="absolute top-0 left-0 -translate-5 -z-10 mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-secondary/50 transition-colors group-hover:bg-primary/10">
                          <Icon className="h-12 w-12 text-primary/40 transition-colors group-hover:text-primary/70" />
                        </div>
                        <h2 className="mt-6 mb-2 text-xl md:text-2xl font-medium tracking-tight text-foreground">
                          {section.title}
                        </h2>
                        <p className="font-light leading-relaxed text-muted-foreground">
                          {section.description}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary/70 transition-colors group-hover:text-primary">
                        <span>Descobreix</span>
                        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
