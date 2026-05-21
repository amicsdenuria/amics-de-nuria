import Image from 'next/image';
import PrimaryPageHero from '../../components/PrimaryPageHero';
import { TypoPVar } from '@/components/ui/typo/typoComponents';
import { lligaEspiritualContent } from '@/content/lliga-espiritual/lligaEspiritualPage';

const cartaPresidentPage = () => {
  const { cartaPresident } = lligaEspiritualContent.pages;
  return (
    <>
      <PrimaryPageHero
        title={cartaPresident.title}
        subtitle={cartaPresident.intro}
        img={{
          src: '/hero-santuari-nuria.webp',
          alt: 'Santuari de Núria',
        }}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-6">
            {cartaPresident.content.map((p, i) => (
              <TypoPVar
                key={i}
                className="italic"
              >
                {p}
              </TypoPVar>
            ))}
          </div>
          <div className="mt-10 aspect-square w-full max-w-xs overflow-hidden rounded-lg">
            <Image
              src={'/david-aguila.webp'}
              alt="David Aguilà"
              width={1376}
              height={768}
              sizes="(min-width: 768px) 576px, calc(100vw - 48px)"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default cartaPresidentPage;
