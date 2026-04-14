import { Button } from '@/components/ui/button';
import Hero from '@/components/Hero';
import Link from 'next/link';
import PageContainer from '@/components/ui/page-container';
import { routes } from '@/data/routes';

const Pelegrinatges = () => {
  return (
    <>
      <Hero
        title="Els pelegrinatges d'Amics de Núria"
        description="El pelegrinatge de Montserrat a Núria per etapes és el trajecte que organitza anualment Amics de Núria."
      />
      <PageContainer>
        <div className="flex flex-col gap-y-4 items-start">
          {routes.map((route) => (
            <Button
              asChild
              key={`${route.id} ${route.origin} ${route.destiny}`}
            >
              <Link href={`/pelegrinatges/${route.id}`}>
                {route.origin} - {route.destiny} (
                {route.alternativeRoutePoints &&
                  route.alternativeRoutePoints.join(', ')}
                )
              </Link>
            </Button>
          ))}
        </div>
      </PageContainer>
    </>
  );
};

export default Pelegrinatges;
