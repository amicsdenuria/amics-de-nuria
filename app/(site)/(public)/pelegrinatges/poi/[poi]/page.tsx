import Hero from '@/components/Hero';
import PageContainer from '@/components/ui/page-container';
import { TypoP } from '@/components/ui/typo/typoComponents';
import { notFound } from 'next/navigation';
import { pois } from '@/data/pois';

export const dynamicParams = false;
export const generateStaticParams = async () =>
  pois.map((poi) => ({ poi: poi.id }));

interface RegionPageParams {
  params: Promise<{ poi: string }>;
}

const RegionPage = async ({ params }: RegionPageParams) => {
  const { poi: id } = await params;
  const poi = pois.find((poi) => poi.id === id);

  if (!poi) notFound();

  return (
    <>
      <Hero
        title={poi.name}
        description={poi.location}
        img={{ src: poi.img, alt: poi.name, className: 'object-center' }}
      />

      <PageContainer className="mb-12">
        {poi.text.map((p, i) => (
          <TypoP key={i}>{p}</TypoP>
        ))}
      </PageContainer>
    </>
  );
};

export default RegionPage;
