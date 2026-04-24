import Hero from '@/components/Hero';
import PageContainer from '@/components/ui/page-container';
import { TypoP } from '@/components/ui/typo/typoComponents';
import { notFound } from 'next/navigation';
import { regions } from '@/content/pelegrinatges/data/regions';

export const dynamicParams = false;
export const generateStaticParams = async () =>
  regions.map((region) => ({ region: region.id }));

interface RegionPageParams {
  params: Promise<{ id: string }>;
}

const RegionPage = async ({ params }: RegionPageParams) => {
  const { id } = await params;
  const region = regions.find((region) => region.id === id);

  if (!region) notFound();

  return (
    <>
      <Hero
        title={region.name}
        description={region.province}
        img={{
          src: region.img.url,
          alt: region.img.alt,
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
