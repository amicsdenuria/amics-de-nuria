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
  const filteredRoutes = (
    currentRoute
      ? routes.filter((route) => route.id !== currentRoute?.id)
      : routes
  )
    // TODO: adaptar solicitud a sanity de getFeaturedRoutes (les 6 rutes preferides) enlloc de demanar totes les rutes getAllRoutes i fer slice de 6
    .slice(0, 6);

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
              <div className="flex justify-between">
                <TypoH2Var className="mb-2">
                  {currentRouteSection.title}
                </TypoH2Var>

                <Button
                  asChild
                  className="hidden sm:flex"
                >
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

              {/* PHONE BUTTON */}
              <Button
                asChild
                className="flex sm:hidden mt-4"
              >
                <Link href={currentRouteSection.subscriptionCTA.href}>
                  {currentRouteSection.subscriptionCTA.label}
                  <ArrowRightIcon />
                </Link>
              </Button>
            </section>
          )}

          <section
            id="sortides-esperit"
            className="scroll-m-20"
          >
            <div className="flex justify-between">
              <TypoH2Var className="mb-2">{sortidesEsperit.title}</TypoH2Var>
              {/* PC BUTTON */}
              <Button
                asChild
                variant={'outline'}
                className="hidden sm:flex"
              >
                <Link href={'/contacta'}>
                  Més informació
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

            {/* PHONE BUTTON */}
            <Button
              asChild
              variant={'outline'}
              className="flex sm:hidden mt-4"
            >
              <Link href={'/contacta'}>
                Més informació
                <ArrowRightIcon />
              </Link>
            </Button>
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredRoutes.map((route) => (
                  <RouteCard
                    key={route.id}
                    route={route}
                  />
                ))}
              </div>

              {filteredRoutes.length > 6 && (
                <Button
                  asChild
                  variant={'default'}
                  className="flex sm:w-2xs sm:mx-auto mt-10"
                >
                  <Link href={'/rutes-itineraris/routes'}>
                    Veure totes
                    <ArrowRightIcon />
                  </Link>
                </Button>
              )}
            </section>
          ) : null}
        </PageContainer>
      </div>
    </>
  );
};

export default RutesItinerarisPage;
