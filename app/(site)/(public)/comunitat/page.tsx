import PrimaryPageHero from '../components/PrimaryPageHero';
import { comunitatContent } from '@/content/comunitat/comunitatPage';
import { getUserData } from '@/actions/getUserData';

const ComunitatPage = async () => {
  const { isEnrolled } = await getUserData();
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
        showSubscribeCTA
        isEnrolled={isEnrolled}
      />
    </>
  );
};

export default ComunitatPage;
