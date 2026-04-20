import Image from 'next/image';
import PageContainer from './ui/page-container';
import { cn } from '@/lib/utils';

interface HeroProps {
  title: string;
  description: string;
  hasImage?: boolean;
  img?: {
    alt: string;
    src: string;
    className?: string;
  };
}

const Hero = ({ title, description, hasImage = true, img }: HeroProps) => {
  return (
    <section className="relative h-[45vh] w-full mb-16">
      {hasImage && img ? (
        <Image
          alt={img.alt}
          src={img.src}
          fill
          sizes="100vw"
          className={cn('object-cover', img.className)}
        />
      ) : (
        hasImage && (
          <Image
            alt="Vall de Núria"
            src="/hero-santuari-nuria.webp"
            fill
            sizes="100vw"
            className={cn('object-cover object-center')}
          />
        )
      )}
      <div className="absolute inset-0 bg-linear-to-b from-white/5 to-white/40 dark:to-black/40" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/85 md:via-background/70 to-background/20 dark:to-background/20" />

      {/* <div className="absolute inset-0 bg-linear-to-l from-white/5 to-white/40 dark:to-black/40" />
      <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 md:via-background/70 to-background/20 dark:to-background/20" /> */}

      <PageContainer className="relative h-full flex flex-col justify-end">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent text-pretty pb-2">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground text-pretty mt-4">
            {description}
          </p>
        </div>
      </PageContainer>
    </section>
  );
};
export default Hero;
