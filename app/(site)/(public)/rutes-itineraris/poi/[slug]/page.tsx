import PrimaryPageHero from '../../../components/PrimaryPageHero';
import { ImageLightbox } from '@/components/ImageLightbox';
import PageContainer from '@/components/ui/page-container';
import { TypoP } from '@/components/ui/typo/typoComponents';
import { getPoiBySlug } from '@/domain/poi/poi.service';
import { notFound } from 'next/navigation';
import { mapPoiHero } from '../../heroMappers';
import { getImageProps } from '@/sanity/lib/image';

interface RegionPageParams {
  params: Promise<{ slug: string }>;
}

const RegionPage = async ({ params }: RegionPageParams) => {
  const { slug } = await params;
  const poi = await getPoiBySlug(slug);

  if (!poi) notFound();

  const thumbnailImage = getImageProps(poi.image, {
    width: 900,
    height: 675,
    sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px',
    fit: 'crop',
  });
  const fullImage = getImageProps(poi.image, {
    width: 1600,
    height: 1200,
    sizes: '90vw',
    fit: 'clip',
  });

  return (
    <>
      <PrimaryPageHero {...mapPoiHero(poi)} />

      <PageContainer className="pt-16 md:pt-24 mb-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <div className="w-full lg:w-3/5">
            {poi.text.map((p, i) => (
              <TypoP key={i}>{p}</TypoP>
            ))}
          </div>

          {/* Img */}
          <aside className="w-full lg:w-2/5">
            <div className="lg:sticky lg:top-20">
              {thumbnailImage && fullImage ? <ImageLightbox thumbnail={thumbnailImage} full={fullImage} /> : null}
            </div>
          </aside>
        </div>
      </PageContainer>
    </>
  );
};

export default RegionPage;
