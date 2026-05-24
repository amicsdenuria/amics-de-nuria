import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getImageProps } from '@/sanity/lib/image';
import type { DomainImage } from '@/domain/shared/image.types';

import Image from 'next/image';

interface ImgsCarouselProps {
  imgs: DomainImage[];
}

const ImgsCarousel = ({ imgs }: ImgsCarouselProps) => {
  return (
    <div className="w-full mt-8 px-12">
      <Carousel
        className="w-3xl mx-auto"
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

            if (!props) {
              return null;
            }

            if (!('width' in props) || !('height' in props)) {
              return null;
            }

            return (
              <CarouselItem key={index}>
                <Image
                  src={props.src}
                  alt={props.alt}
                  width={props.width}
                  height={props.height}
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ImgsCarousel;
