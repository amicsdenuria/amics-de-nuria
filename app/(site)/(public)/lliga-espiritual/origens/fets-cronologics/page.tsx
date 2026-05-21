import PrimaryPageHero from '../../../components/PrimaryPageHero';
import { cronoSubpage } from '@/content/lliga-espiritual/cronoSubpage';

const FetsCronologicsPage = () => {
  return (
    <>
      <PrimaryPageHero
        title={cronoSubpage.title}
        subtitle={cronoSubpage.intro}
        img={{
          src: '/hero-santuari-nuria.webp',
          alt: 'Santuari de Núria',
        }}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-16">
            {cronoSubpage.sections.map((section) => (
              <article
                key={section.title}
                className="space-y-8"
              >
                <header className="border-l-2 border-primary/30 pl-6">
                  <h2 className="text-3xl font-light tracking-tight text-foreground md:text-4xl">
                    {section.title}
                  </h2>
                </header>

                <div className="space-y-8">
                  {section.decades.map((decade) => (
                    <section
                      key={`${section.title}-${decade.title}`}
                      className="rounded-2xl border border-border/70 bg-background/70 p-6 shadow-sm"
                    >
                      <h3 className="mb-5 text-xl font-medium tracking-tight text-foreground md:text-2xl">
                        {decade.title}
                      </h3>

                      <div className="space-y-5">
                        {decade.events.map((event) => (
                          <div
                            key={`${decade.title}-${event.title}`}
                            className="border-l border-primary/20 pl-4"
                          >
                            <h4 className="text-base font-medium text-foreground md:text-lg">
                              {event.title}
                            </h4>
                            {event.body ? (
                              <p className="mt-1 text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                                {event.body}
                              </p>
                            ) : null}
                            {event.source ? (
                              <p className="mt-2 text-sm text-muted-foreground">
                                Font pendent de revisió:{' '}
                                <a
                                  href={event.source}
                                  className="font-medium text-primary underline-offset-4 hover:underline"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {event.source}
                                </a>
                              </p>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {cronoSubpage.moreInfoHref ? (
            <div className="mt-16 rounded-2xl bg-secondary/20 p-6 text-center">
              <p className="text-sm uppercase tracking-widest text-muted-foreground">
                Per saber-ne més
              </p>
              <a
                href={cronoSubpage.moreInfoHref}
                className="mt-2 inline-block text-primary underline-offset-4 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {cronoSubpage.moreInfoHref}
              </a>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default FetsCronologicsPage;
