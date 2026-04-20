import PrimaryPageHero from '../components/PrimaryPageHero';
import { publicacionsContent } from '@/content/publicacions/publicacionsPage';

const PublicacionsPage = () => {
  const { hero } = publicacionsContent.home;
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

export default PublicacionsPage;
