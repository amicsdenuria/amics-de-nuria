import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import type { DomainImage } from '@/domain/shared/image.types';
import Image from 'next/image';
import { getImageProps } from '@/sanity/lib/image';

interface ImgsCarouselProps {
  imgs: DomainImage[];
}

const ImgsCarousel = ({ imgs }: ImgsCarouselProps) => {
  return (
    <div className="w-full mt-8 px-4 sm:px-6 lg:px-12">
      <Carousel
        className="mx-auto w-full max-w-4xl"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {imgs.map((img, index) => {
            const props = getImageProps(img, {
              width: 768,
              height: 432,
              fit: 'crop',
            });

            if (!props || !('width' in props) || !('height' in props)) {
              return null;
            }

            return (
              <CarouselItem key={index}>
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                  <Image
                    src={props.src}
                    alt={props.alt ?? ''}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 768px"
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="left-2 opacity-60 hover:opacity-100 hover:bg-background" />
        <CarouselNext className="right-2 opacity-60 hover:opacity-100 hover:bg-background" />
      </Carousel>
    </div>
  );
};

export default ImgsCarousel;
