import { TypoH2Var, TypoPVar } from '@/components/ui/typo/typoComponents';

import PageContainer from '@/components/ui/page-container';
import PrimaryPageHero from '../components/PrimaryPageHero';
import { publicacionsContent } from '@/content/publicacions/publicacionsPage';

const PublicacionsPage = () => {
  const { hero, intro, keyPublication, magazine, gallery, books, other } =
    publicacionsContent.home;

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
          {/* Key Publication */}
          <section
            id="key-publication"
            className="scroll-m-20"
          >
            <TypoH2Var className="mb-6">{keyPublication.title}</TypoH2Var>

            <div>(Contingut de publicació destacada)</div>
          </section>
        </PageContainer>
      </div>

      {/* Magazine */}
      <PageContainer className="py-16 md:py-24">
        <section
          id="magazine"
          className="scroll-m-20"
        >
          <TypoH2Var className="mb-6">{magazine.title}</TypoH2Var>
          <p className="py-4 text-muted-foreground">{magazine.body}</p>

          <div>(Contingut de la revista)</div>
        </section>
      </PageContainer>

      {/* Gallery */}
      <div className="bg-secondary/20">
        <PageContainer className="py-16 md:py-24">
          <section
            id="gallery"
            className="scroll-m-20"
          >
            <TypoH2Var className="mb-6">{gallery.title}</TypoH2Var>
            <p className="py-4 text-muted-foreground">{gallery.body}</p>

            <div>(Contingut de la galeria)</div>
          </section>
        </PageContainer>
      </div>

      {/* Books */}
      <PageContainer className="py-16 md:py-24">
        <section
          id="books"
          className="scroll-m-20"
        >
          <TypoH2Var className="mb-6">{books.title}</TypoH2Var>
          <p className="py-4 text-muted-foreground">{books.body}</p>

          <div>(Contingut dels llibres)</div>
        </section>
      </PageContainer>

      {/* Other */}
      <div className="bg-secondary/20">
        <PageContainer className="py-16 md:py-24">
          <section
            id="other"
            className="scroll-m-20"
          >
            <TypoH2Var className="mb-6">{other.title}</TypoH2Var>
            <p className="py-4 text-muted-foreground">{other.body}</p>

            <div>(Altres continguts)</div>
          </section>
        </PageContainer>
      </div>
    </>
  );
};

export default PublicacionsPage;
