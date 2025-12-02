import { Button } from '@/components/ui/button';
import PageContainer from '@/components/ui/page-container';
import Link from 'next/link';

const ConfirmationPage = () => {
  return (
    <main className="flex-1 flex">
      <PageContainer className="py-4 flex-1 flex">
        <div className="flex flex-col items-stretch md:items-start gap-8">
          <div className="text-3xl font-bold max-w-3xl text-pretty">
            Felicitats, ja formes part dels col·laboradors d&apos;Amics de Núria
          </div>
          <Button asChild>
            <Link
              href={'/subscription'}
              replace
            >
              Veure la meva subscripció
            </Link>
          </Button>
        </div>
      </PageContainer>
    </main>
  );
};
export default ConfirmationPage;
