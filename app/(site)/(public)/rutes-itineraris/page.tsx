import { TypoH2Var, TypoPVar } from '@/components/ui/typo/typoComponents';

import { ActivityCard } from '../agenda/components/ActivityCard';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PageContainer from '@/components/ui/page-container';
import PrimaryPageHero from '../components/PrimaryPageHero';
import RouteCard from './components/RouteCard';
import { getAllRoutes } from '@/domain/route/route.service';
import { getCurrentRoute } from '@/domain/currentRoute/currentRoute.service';
import { getSpiritActivity } from '@/domain/activity/activity.service';
import { rutesItinerarisContent } from '@/content/rutes-itineraris/rutesItinerarisPage';

const RutesItinerarisPage = async () => {
  const {
    home: {
      hero,
      intro,
      currentRoute: currentRouteSection,
      sortidesEsperit,
      routes: routesSection,
    },
  } = rutesItinerarisContent;

  const routes = await getAllRoutes();
  const currentRoute = await getCurrentRoute();
  const filteredRoutes = currentRoute
    ? routes.filter((route) => route.id !== currentRoute?.id)
    : routes;

  const spiritActivity = await getSpiritActivity();

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
          {currentRoute && (
            <section
              id="current-route"
              className="scroll-m-20"
            >
              <div className="flex flex-col sm:flex-row justify-between">
                <TypoH2Var className="mb-2">
                  {currentRouteSection.title}
                </TypoH2Var>

                <Button asChild>
                  <Link href={currentRouteSection.subscriptionCTA.href}>
                    {currentRouteSection.subscriptionCTA.label}
                    <ArrowRightIcon />
                  </Link>
                </Button>
              </div>

              <p className="py-4 max-w-3xl text-muted-foreground">
                {currentRouteSection.description}
              </p>
              <RouteCard
                key={`current-route ${currentRoute.id}`}
                route={currentRoute}
              />
            </section>
          )}

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

            {spiritActivity && (
              // TODO: afegir link a activitat
              <ActivityCard
                activity={spiritActivity}
                href="#"
              />
            )}
          </section>

          {filteredRoutes.length ? (
            <section
              id="routes"
              className="scroll-m-20 lg:col-span-2"
            >
              <TypoH2Var className="mb-2">{routesSection.title}</TypoH2Var>
              <p className="py-4 max-w-3xl text-muted-foreground">
                {routesSection.description}
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-8">
                {filteredRoutes.map((route) => (
                  <RouteCard
                    key={route.id}
                    route={route}
                  />
                ))}
              </div>
            </section>
          ) : null}
        </PageContainer>
      </div>
    </>
  );
};

export default RutesItinerarisPage;
