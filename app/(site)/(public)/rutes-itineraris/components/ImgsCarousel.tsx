import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import Image from 'next/image';

interface ImgsCarouselProps {
  imgs: {
    url: string;
    alt: string;
  }[];
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
          {imgs.map((img, index) => (
            <CarouselItem key={index}>
              <Image
                src={img.url}
                alt={img.alt}
                width={768}
                height={432}
                className="w-full h-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ImgsCarousel;
