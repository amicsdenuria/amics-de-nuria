import BackLink from '@/components/ui/back-link';
import Hero from '@/components/Hero';
import PageContainer from '@/components/ui/page-container';
import RouteContent from './components/RouteContent';
import { notFound } from 'next/navigation';
import { routes } from '@/data/routes';

export const dynamicParams = false;
export const generateStaticParams = async () =>
  routes.map((route) => ({ route: route.id }));

interface RoutePageParams {
  params: Promise<{ route: string }>;
}

const RoutePage = async ({ params }: RoutePageParams) => {
  const { route: id } = await params;
  const route = routes.find((route) => route.id === id);

  if (!route) notFound();

  return (
    <>
      <Hero
        title={`Ruta ${route.origin} - ${route.destiny}`}
        description={`(${route.alternativeRoutePoints?.join(', ')})`}
      />
      <PageContainer className="pb-8">
        <BackLink
          title="Rutes"
          href="/pelegrinatges"
        />

        {/* CONTENT */}
        <div className="flex flex-col gap-y-12">
          <RouteContent route={route} />
        </div>
      </PageContainer>
    </>
    // <div>
    // </div>
  );
};

export default RoutePage;
