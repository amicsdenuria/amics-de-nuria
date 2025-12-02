'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { MousePointerClickIcon } from 'lucide-react';
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs';

const PrimaryActionButton = () => {
  const isSoci = false;
  const { openSignIn } = useClerk();

  return (
    <>
      <SignedIn>
        <Button asChild>
          <Link
            href={'/subscription'}
            prefetch={false}
          >
            <MousePointerClickIcon className="h-4 w-4" />
            {isSoci ? (
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
  );
};
export default PrimaryActionButton;
