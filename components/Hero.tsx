import { site } from '@/config/site.config';
import PageContainer from './ui/page-container';

const Hero = () => {
  return (
    <section className="relative h-[45vh] w-full">
      <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/55 dark:from-white/15 dark:to-black/40" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-background/20" />

      <PageContainer className="relative h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-transparent text-pretty">
            {site.hero.title}
          </h1>
          <p className="text-xl text-muted-foreground text-pretty">
            {site.hero.description}
          </p>
        </div>
      </PageContainer>
    </section>
  );
};
export default Hero;
