import { TypoH2Var, TypoPVar } from '@/components/ui/typo/typoComponents';

import { ActivityCard } from './components/ActivityCard';
import PageContainer from '@/components/ui/page-container';
import PrimaryPageHero from '../components/PrimaryPageHero';
import { activities } from '@/content/agenda/data/activities';
import { agendaContent } from '@/content/agenda/agendaPage';

const AgendaPage = () => {
  const nextActivity = activities[0];
  const keyActivity = activities[1];
  const otherActivities = activities.filter(
    (activity) =>
      activity.id !== nextActivity.id && activity.id !== keyActivity.id,
  );

  const {
    hero,
    intro,
    nextActivity: nextActivityUI,
    keyActivity: keyActivityUI,
    activities: activitiesUI,
  } = agendaContent.home;
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

      <PageContainer className="py-16 md:py-24 text-center px-6">
        <TypoH2Var className="mb-6 text-balance">{intro.title}</TypoH2Var>
        <TypoPVar className="mx-auto text-lg">{intro.body}</TypoPVar>
      </PageContainer>

      <div className="bg-secondary/20">
        <PageContainer className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
          {/* Next Activity */}
          <section
            id="next-activity"
            className="scroll-m-20"
          >
            <TypoH2Var className="mb-6">{nextActivityUI.title}</TypoH2Var>

            <ActivityCard
              activity={nextActivity}
              href={`/agenda/activity/${nextActivity.id}`}
            />
          </section>

          {/* Key Activity */}
          <section
            id="key-activity"
            className="scroll-m-20"
          >
            <TypoH2Var className="mb-6">{keyActivityUI.title}</TypoH2Var>

            <ActivityCard
              activity={keyActivity}
              href={`/agenda/activity/${keyActivity.id}`}
            />
          </section>
        </PageContainer>
      </div>

      {/* Other Activities */}
      <PageContainer className="py-16 md:py-24">
        <section
          id="activities"
          className="scroll-m-20"
        >
          <TypoH2Var className="mb-6">{activitiesUI.title}</TypoH2Var>
          <p className="py-4 text-muted-foreground">
            {activitiesUI.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                href={`/agenda/activity/${activity.id}`}
              />
            ))}
          </div>
        </section>
      </PageContainer>
    </>
  );
};

export default AgendaPage;
