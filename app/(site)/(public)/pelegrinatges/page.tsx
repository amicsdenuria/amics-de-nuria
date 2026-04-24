import { TypoH2Var, TypoPVar } from '@/components/ui/typo/typoComponents';

import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PageContainer from '@/components/ui/page-container';
import PrimaryPageHero from '../components/PrimaryPageHero';
import RouteCard from './components/RouteCard';
import { getAllRoutes } from '@/adapters/pelegrinatges/route/getAllRoutes';
import { pelegrinatgesContent } from '@/content/pelegrinatges/pelegrinatgesPage';

const Pelegrinatges = async () => {
  const {
    home: { hero, intro, currentRoute, routes: routesSection },
  } = pelegrinatgesContent;

  const routes = await getAllRoutes();
  const currentRouteId = routes[0].id;
  return (
    <>
      <PrimaryPageHero
        pretitle={hero.pretitle}
        title={hero.title}
        subtitle={hero.subtitle}
        description={hero.description}
        ctas={hero.ctas}
        img={hero.img}
      />

      {/* Intro */}
      <PageContainer className="py-16 md:py-24 text-center px-6">
        <TypoH2Var className="mb-6 text-balance">{intro.title}</TypoH2Var>
        <TypoPVar className="mx-auto text-lg">{intro.body}</TypoPVar>
      </PageContainer>

      {/* Routes */}
      <div className="bg-secondary/20">
        <PageContainer className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
          <section
            id="current-route"
            className="scroll-m-20"
          >
            <div className="flex flex-col sm:flex-row justify-between">
              <TypoH2Var className="mb-2">{currentRoute.title}</TypoH2Var>

              <Button asChild>
                <Link href={currentRoute.subscriptionCTA.href}>
                  {currentRoute.subscriptionCTA.label}
                  <ArrowRightIcon />
                </Link>
              </Button>
            </div>

            <p className="py-4 max-w-3xl text-muted-foreground">
              {currentRoute.description}
            </p>
            <RouteCard
              key={`current-route ${routes[0].id}`}
              route={routes[0]}
            />
          </section>
          <section
            id="routes"
            className="scroll-m-20"
          >
            <TypoH2Var className="mb-2">{routesSection.title}</TypoH2Var>
            <p className="py-4 max-w-3xl text-muted-foreground">
              {routesSection.description}
            </p>
            <div className="flex flex-col gap-y-4">
              {routes
                .filter((route) => route.id !== currentRouteId)
                .map((route) => (
                  <RouteCard
                    key={route.id}
                    route={route}
                  />
                ))}
            </div>
          </section>
        </PageContainer>
      </div>
    </>
  );
};

export default Pelegrinatges;
