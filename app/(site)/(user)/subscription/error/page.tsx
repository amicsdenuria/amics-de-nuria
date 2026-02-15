import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PageContainer from '@/components/ui/page-container';

const ErrorPage = () => {
  return (
    <main className="flex-1 flex">
      <PageContainer className="py-4 flex-1 flex">
        <div className="flex flex-col items-stretch md:items-start py-8 gap-8">
          <div>
            <h1 className="text-3xl font-bold max-w-3xl text-pretty">
              Alguna cosa ha fallat.
            </h1>
            <span>
              Intenta accedir a{' '}
              <Link
                className="underline text-accent-foreground hover:text-muted-foreground"
                href={'/subscription'}
              >
                Subscripció
              </Link>{' '}
              o posa&apos;t en contacte amb l&apos;organització.
            </span>
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
