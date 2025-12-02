import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from '@clerk/nextjs';
import { Button } from '../ui/button';

const AuthButtons = () => {
  return (
    <>
      <SignedIn>
        <Button
          asChild
          variant={'outline'}
        >
          <SignOutButton>Tanca Sessió</SignOutButton>
        </Button>
      </SignedIn>

      <SignedOut>
        <Button
          asChild
          variant={'outline'}
        >
          <SignInButton mode="modal">Inicia Sessió</SignInButton>
        </Button>
      </SignedOut>
    </>
  );
};
export default AuthButtons;
