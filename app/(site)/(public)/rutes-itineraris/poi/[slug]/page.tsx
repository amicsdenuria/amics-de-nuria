import Hero from '@/components/Hero';
import PageContainer from '@/components/ui/page-container';
import { TypoP } from '@/components/ui/typo/typoComponents';
import { getPoiBySlug } from '@/domain/poi/poi.service';
import { notFound } from 'next/navigation';

interface RegionPageParams {
  params: Promise<{ slug: string }>;
}

const RegionPage = async ({ params }: RegionPageParams) => {
  const { slug } = await params;
  const poi = await getPoiBySlug(slug);

  if (!poi) notFound();

  return (
    <>
      <Hero
        title={poi.name}
        description={poi.location}
        img={{
          src: poi.image.url,
          alt: poi.image.alt,
          className: 'object-center',
        }}
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
