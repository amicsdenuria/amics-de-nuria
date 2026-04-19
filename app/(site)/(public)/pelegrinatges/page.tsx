import Hero from '@/components/Hero';
import PageContainer from '@/components/ui/page-container';
import RouteCard from './components/RouteCard';
import { routes } from '@/data/pelegrinatges/routes';

const Pelegrinatges = () => {
  return (
    <>
      <Hero
        title="Els pelegrinatges d'Amics de Núria"
        description="El pelegrinatge de Montserrat a Núria per etapes és el trajecte que organitza anualment Amics de Núria."
      />
      <PageContainer>
        <div className="flex flex-col gap-y-4 mb-8">
          {routes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
            />
          ))}
        </div>
      </PageContainer>
    </>
  );
};

export default Pelegrinatges;
