import { Button } from '@/components/ui/button';
import PageContainer from '@/components/ui/page-container';
import Link from 'next/link';

const ErrorPage = () => {
  return (
    <main className="flex-1 flex">
      <PageContainer className="py-4 flex-1 flex">
        <div className="flex flex-col items-stretch md:items-start gap-8">
          <div className="text-3xl font-bold max-w-3xl text-pretty">
            Error al intentar crear la subscripció. Intenta-ho més tard o
            posa&apos;t en contacte amb l&apos;organització.
          </div>
          <Button asChild>
            <Link
              href={'/subscription'}
              replace
            >
              Tornar a subscripcions
            </Link>
          </Button>
        </div>
      </PageContainer>
    </main>
  );
};
export default ErrorPage;
