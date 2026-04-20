// import Hero from '@/components/Hero';
import PageContainer from '@/components/ui/page-container';
import PrimaryPageHero from '../components/PrimaryPageHero';
import RouteCard from './components/RouteCard';
import { TypoH2Var } from '@/components/ui/typo/typoComponents';
import { routes } from '@/data/pelegrinatges/routes';

const Pelegrinatges = () => {
  const currentRouteId = routes[0].id;
  const ctas = [
    {
      href: '/pelegrinatges#current-route',
      label: "Ruta d'enguany",
    },
    {
      href: '/pelegrinatges#routes',
      label: 'Altres rutes',
    },
  ];
  return (
    <>
      {/* <Hero
        title="Els pelegrinatges d'Amics de Núria"
        description=""
      /> */}
      <PrimaryPageHero
        title="Pelegrinatges d'Amics de Núria"
        subtitle="Vine a caminar amb nosaltres cap a Núria."
        description="El pelegrinatge de Montserrat a Núria per etapes és el trajecte que organitza anualment Amics de Núria."
        ctas={ctas}
        img={{
          src: '/hero-muntanya-nuria.webp',
          alt: 'Muntanyes de la vall de Núria',
          className: 'object-top',
        }}
      />
      <PageContainer className="py-16 md:py-24 space-y-24">
        <section
          id="current-route"
          className="scroll-m-20"
        >
          <TypoH2Var className="mb-6">La ruta d&apos;enguany</TypoH2Var>
          <RouteCard
            key={`current-route ${routes[0].id}`}
            route={routes[0]}
          />
        </section>
        <section
          id="routes"
          className="scroll-m-20"
        >
          <TypoH2Var className="mb-6">Altres rutes</TypoH2Var>
          <div className="flex flex-col gap-y-4">
            {routes
              .filter((route) => route.id !== currentRouteId)
              .map((route) => (
                <RouteCard
                  key={route.id}
                  route={route}
                />
              ))}
          </div>
        </section>
      </PageContainer>
    </>
  );
};

export default Pelegrinatges;
