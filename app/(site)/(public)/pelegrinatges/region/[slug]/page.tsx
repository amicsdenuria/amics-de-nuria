import Hero from '@/components/Hero';
import PageContainer from '@/components/ui/page-container';
import { TypoP } from '@/components/ui/typo/typoComponents';
import { getRegionBySlug } from '@/domain/region/region.service';
import { notFound } from 'next/navigation';
import { regionsMock } from '@/content/pelegrinatges/data/regions';

export const dynamicParams = false;
export const generateStaticParams = async () =>
  regionsMock.map((region) => ({ region: region.id }));

interface RegionPageParams {
  params: Promise<{ slug: string }>;
}

const RegionPage = async ({ params }: RegionPageParams) => {
  const { slug } = await params;
  const region = await getRegionBySlug(slug);

  if (!region) notFound();

  return (
    <>
      <Hero
        title={region.name}
        description={region.province}
        img={{
          src: region.image.url,
          alt: region.image.alt,
          className: 'object-center',
        }}
      />

      <PageContainer className="mb-12">
        {region.text.map((p, i) => (
          <TypoP key={i}>{p}</TypoP>
        ))}
      </PageContainer>
    </>
  );
};

export default RegionPage;
