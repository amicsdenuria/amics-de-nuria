'use client';

import {
  CreditCardIcon,
  LoaderCircleIcon,
  MousePointerClickIcon,
} from 'lucide-react';
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs';

import { ResponsiveButton } from '../ui/responsive-button';
import { ResponsiveLinkButton } from '../ui/responsive-link-button';

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
            {isEnrolled ? (
              <ResponsiveLinkButton
                href="/subscription"
                prefetch={false}
                Icon={CreditCardIcon}
                text="Gestionar Suscripció"
              />
            ) : (
              <ResponsiveLinkButton
                href="/subscription"
                prefetch={false}
                Icon={MousePointerClickIcon}
                text="Fes-te Soci"
              />
            )}
          </SignedIn>

          <SignedOut>
            <ResponsiveButton
              Icon={MousePointerClickIcon}
              text="Fes-te Soci"
              onClick={() => openSignIn()}
            />
          </SignedOut>
        </>
      ) : (
        <ResponsiveButton
          className="sm:min-w-28"
          disabled
          Icon={LoaderCircleIcon}
          iconClassName="animate-spin"
        />
      )}
    </>
  );
};
export default PrimaryActionButton;
