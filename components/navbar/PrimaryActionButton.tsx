'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { LoaderCircleIcon, MousePointerClickIcon } from 'lucide-react';
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs';

interface PrimaryActionButtonProps {
  isEnrolled: boolean;
}

const PrimaryActionButton = ({ isEnrolled }: PrimaryActionButtonProps) => {
  const { openSignIn, loaded } = useClerk();

  return (
    <>
      {loaded ? (
        <>
          <SignedIn>
            <Button asChild>
              <Link
                href={'/subscription'}
                prefetch={false}
              >
                <MousePointerClickIcon className="h-4 w-4" />
                {isEnrolled ? (
                  <span>Gestionar Suscripció</span>
                ) : (
                  <span>Fes-te Soci</span>
                )}
              </Link>
            </Button>
          </SignedIn>

          <SignedOut>
            <Button onClick={() => openSignIn()}>
              <MousePointerClickIcon className="h-4 w-4" />
              <span className="sr-only md:not-sr-only">Fes-te Soci</span>
            </Button>
          </SignedOut>
        </>
      ) : (
        <Button className="min-w-28 opacity-70">
          <LoaderCircleIcon className="animate-spin" />
        </Button>
      )}
    </>
  );
};
export default PrimaryActionButton;
