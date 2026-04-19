interface SantuariPageHeroProps {
  title: string;
  intro: string;
}

const SantuariPageHero = ({ title, intro }: SantuariPageHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-secondary/30 py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="mb-6 text-balance text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mx-auto max-w-2xl text-lg md:text-xl font-light leading-relaxed text-muted-foreground">
          {intro}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default SantuariPageHero;
