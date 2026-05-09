import { TypoH2Var, TypoPVar } from '@/components/ui/typo/typoComponents';

import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PageContainer from '@/components/ui/page-container';
import PrimaryPageHero from '../components/PrimaryPageHero';
import RouteCard from './components/RouteCard';
import { getAllRoutes } from '@/domain/route/route.service';
import { rutesItinerarisContent } from '@/content/rutes-itineraris/rutesItinerarisPage';

const RutesItinerarisPage = async () => {
  const {
    home: { hero, intro, currentRoute, sortidesEsperit, routes: routesSection },
  } = rutesItinerarisContent;

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
            id="sortides-esperit"
            className="scroll-m-20"
          >
            <div className="flex flex-col sm:flex-row justify-between">
              <TypoH2Var className="mb-2">{sortidesEsperit.title}</TypoH2Var>

              {/* <Button asChild>
                <Link href={sortidesEsperit.sortidesEsperitCTA.href}>
                  Veure agenda
                  <ArrowRightIcon />
                </Link>
              </Button> */}
              <Button asChild>
                <Link href={'/contacta'}>
                  Demana més informació
                  <ArrowRightIcon />
                </Link>
              </Button>
            </div>

            <p className="py-4 max-w-3xl text-muted-foreground">
              {sortidesEsperit.description}
            </p>

            <div className="">
              {/* TODO: add activity card link */}
              {/* <RouteCard
                key={`current-route ${routes[0].id}`}
                route={routes[0]}
              /> */}
            </div>
          </section>

          <section
            id="routes"
            className="scroll-m-20 lg:col-span-2"
          >
            {/* TODO: Add routes */}
            {/* <TypoH2Var className="mb-2">{routesSection.title}</TypoH2Var>
            <p className="py-4 max-w-3xl text-muted-foreground">
              {routesSection.description}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-8">
              {mockRoutes
                .filter((route) => route.id !== currentRouteId)
                .map((route) => (
                  <RouteCard
                    key={route.id}
                    route={route}
                  />
                ))}
            </div> */}
          </section>
        </PageContainer>
      </div>
    </>
  );
};

export default RutesItinerarisPage;
