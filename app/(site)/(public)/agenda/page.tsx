import PrimaryPageHero from '../components/PrimaryPageHero';
import { agendaContent } from '@/content/agenda/agendaPage';

const AgendaPage = () => {
  const { hero } = agendaContent.home;
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
    </>
  );
};

export default AgendaPage;
