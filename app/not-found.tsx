import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HomeLink from '@/components/navbar/HomeLink';
import Link from 'next/link';
import { TypoH2Var } from '@/components/ui/typo/typoComponents';

const PublicNotFoundPage = () => {
  return (
    <div className="h-dvh w-full flex flex-col items-center justify-center">
      <HomeLink />
      <div className="py-16 md:py-24 mx-auto min-h-96 flex flex-col items-center space-y-12">
        <TypoH2Var className="">Aquesta pàgina no existeix</TypoH2Var>
        <Button
          asChild
          variant={'link'}
          className="text-lg"
        >
          <Link href={'/'}>
            <ArrowLeftIcon />
            Tornar a l&apos;Inici
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PublicNotFoundPage;
