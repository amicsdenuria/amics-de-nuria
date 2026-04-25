'use client';

import {
  CreditCardIcon,
  LoaderCircleIcon,
  MousePointerClickIcon,
} from 'lucide-react';
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs';

import { Button } from '../ui/button';
import Link from 'next/link';

interface PrimaryActionButtonProps {
  isEnrolled: boolean;
}

const PrimaryActionButtonHero = ({ isEnrolled }: PrimaryActionButtonProps) => {
  const { openSignIn, loaded } = useClerk();

  return (
    <>
      {loaded ? (
        <>
          <SignedIn>
            {isEnrolled ? (
              <Button
                asChild
                className="min-w-[180px]"
                size={'lg'}
              >
                <Link
                  href={'/subscription'}
                  prefetch={false}
                >
                  <CreditCardIcon />
                  Subscripció
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                className="min-w-[180px]"
                size={'lg'}
              >
                <Link
                  href={'/subscription'}
                  prefetch={false}
                >
                  <MousePointerClickIcon />
                  Fes-te Soci
                </Link>
              </Button>
            )}
          </SignedIn>

          <SignedOut>
            <Button
              size={'lg'}
              className="min-w-[180px]"
              onClick={() => openSignIn()}
            >
              <MousePointerClickIcon />
              Fes-te Soci
            </Button>
          </SignedOut>
        </>
      ) : (
        <Button
          className="min-w-[180px]"
          size={'lg'}
          disabled
        >
          <LoaderCircleIcon className="animate-spin" />
        </Button>
      )}
    </>
  );
};
export default PrimaryActionButtonHero;
