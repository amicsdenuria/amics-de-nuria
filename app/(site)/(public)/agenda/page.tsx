import { ArrowRightIcon, CalendarX2Icon } from 'lucide-react';
import Link from 'next/link';
import { connection } from 'next/server';

import PageContainer from '@/components/ui/page-container';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { TypoH2Var, TypoPVar } from '@/components/ui/typo/typoComponents';
import { activityBrowserAvailable, activityBrowserComingSoon, agendaContent } from '@/content/agenda/agendaPage';
import type { PrimaryPageNavItem } from '@/content/interfaces/primary-page-interfaces';
import { selectAgendaActivities } from '@/domain/activity/activity.selectors';
import {
  getActivities,
  getAgendaNow,
  getFeaturedActivity,
} from '@/domain/activity/activity.service';
import { cn } from '@/lib/utils';

import PrimaryPageHero from '../components/PrimaryPageHero';
import { ActivityCard } from './components/ActivityCard';

function BrowseActivitiesButton({ cta }: { cta: PrimaryPageNavItem }) {
  return (
    <div className="mt-8 flex flex-col items-center gap-2">
      {activityBrowserAvailable ? (
        <Button asChild size="lg" className="h-auto min-h-10 whitespace-normal text-center">
          <Link href={cta.href}>{cta.label}<ArrowRightIcon aria-hidden="true" data-icon="inline-end" /></Link>
        </Button>
      ) : (
        <>
          <Button disabled size="lg" className="h-auto min-h-10 whitespace-normal text-center">{cta.label}</Button>
          <p className="text-sm text-muted-foreground">{activityBrowserComingSoon}</p>
        </>
      )}
    </div>
  );
}

const AgendaPage = async () => {
  await connection();
  const now = getAgendaNow();
  const [activities, featuredActivity] = await Promise.all([
    getActivities(),
    getFeaturedActivity(),
  ]);
  const { nextActivity, upcomingActivities, archivedActivities } =
    selectAgendaActivities(activities, now);
  const visibleFeaturedActivity =
    featuredActivity?.id === nextActivity?.id ? null : featuredActivity;
  const highlightedActivityIds = new Set(
    [nextActivity?.id, visibleFeaturedActivity?.id].filter(
      (id): id is string => Boolean(id),
    ),
  );
  const upcomingPreview = upcomingActivities
    .filter((activity) => !highlightedActivityIds.has(activity.id))
    .slice(0, 6);
  const archivedPreview = archivedActivities
    .filter((activity) => !highlightedActivityIds.has(activity.id))
    .slice(0, 6);

  const {
    hero,
    intro,
    nextActivity: nextActivityUI,
    featuredActivity: featuredActivityUI,
    activities: activitiesUI,
    archive,
    empty,
  } = agendaContent.home;
  const highlightedActivities = [
    nextActivity
      ? { activity: nextActivity, content: nextActivityUI, id: 'next-activity' }
      : null,
    visibleFeaturedActivity
      ? {
          activity: visibleFeaturedActivity,
          content: featuredActivityUI,
          id: 'featured-activity',
        }
      : null,
  ].filter((item) => item !== null);

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

      <PageContainer className="px-6 py-16 text-center md:py-24">
        <TypoH2Var className="mb-6 text-balance">{intro.title}</TypoH2Var>
        <TypoPVar className="mx-auto text-lg">{intro.body}</TypoPVar>
      </PageContainer>

      {activities.length === 0 ? (
        <PageContainer className="pb-16 md:pb-24">
          <section aria-labelledby="empty-agenda-title" id="activities">
            <Empty className="border bg-secondary/20 py-16" role="status">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CalendarX2Icon aria-hidden="true" />
                </EmptyMedia>
                <EmptyTitle id="empty-agenda-title">{empty.title}</EmptyTitle>
                <EmptyDescription>{empty.description}</EmptyDescription>
              </EmptyHeader>
            </Empty>
          </section>
        </PageContainer>
      ) : (
        <>
          {highlightedActivities.length > 0 ? (
            <div className="bg-secondary/20">
              <PageContainer
                className={cn(
                  'grid grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-24',
                  highlightedActivities.length === 1 &&
                    'lg:max-w-3xl lg:grid-cols-1',
                )}
              >
                {highlightedActivities.map(({ activity, content, id }) => (
                  <section className="scroll-m-20" id={id} key={activity.id}>
                    <TypoH2Var className="mb-6">{content.title}</TypoH2Var>
                    <ActivityCard
                      activity={activity}
                      now={now}
                      href={`/agenda/activity/${activity.slug}`}
                    />
                  </section>
                ))}
              </PageContainer>
            </div>
          ) : null}

          {upcomingPreview.length > 0 ? (
            <PageContainer className="py-16 md:py-24">
              <section className="scroll-m-20" id="activities">
                <TypoH2Var className="mb-4">{activitiesUI.title}</TypoH2Var>
                <p className="mb-8 max-w-2xl text-muted-foreground">
                  {activitiesUI.description}
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {upcomingPreview.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      now={now}
                      href={`/agenda/activity/${activity.slug}`}
                    />
                  ))}
                </div>
                <BrowseActivitiesButton cta={activitiesUI.cta} />
              </section>
            </PageContainer>
          ) : null}

          {archivedPreview.length > 0 ? (
            <div className="bg-muted/30">
              <PageContainer className="py-16 md:py-24">
                <section className="scroll-m-20" id="archive">
                  <TypoH2Var className="mb-4">{archive.title}</TypoH2Var>
                  <p className="mb-8 max-w-2xl text-muted-foreground">
                    {archive.description}
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {archivedPreview.map((activity) => (
                      <ActivityCard
                        key={activity.id}
                        activity={activity}
                        now={now}
                        href={`/agenda/activity/${activity.slug}`}
                      />
                    ))}
                  </div>
                  <BrowseActivitiesButton cta={archive.cta} />
                </section>
              </PageContainer>
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default AgendaPage;
