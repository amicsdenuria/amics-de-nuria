import PrimaryPageHero from '../components/PrimaryPageHero';
import { comunitatContent } from '@/content/comunitat/comunitatPage';

const ComunitatPage = () => {
  const { hero } = comunitatContent.home;
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

export default ComunitatPage;
