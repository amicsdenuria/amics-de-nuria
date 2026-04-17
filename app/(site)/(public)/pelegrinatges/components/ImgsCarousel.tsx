import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface ImgsCarouselProps {
  imgs: string[];
}

const ImgsCarousel = ({ imgs }: ImgsCarouselProps) => {
  return (
    <div className="w-full mt-8 px-12">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {imgs.map((img, index) => (
            <CarouselItem key={index}>
              <img
                src={img}
                alt=""
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
