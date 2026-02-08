import { SignInButton, SignOutButton } from '@clerk/nextjs';

import { ResponsiveButton } from '../ui/responsive-button';
import { User } from '@clerk/nextjs/server';
import { User2Icon } from 'lucide-react';

interface AuthButtonsProps {
  user: User | null;
}
// TODO: Integrar un desplegable al botó user i dintre mostrar usuari i mostrar (gestiona la teva suscripció, toggle per a theme i tancar o iniciar sessió)
const AuthButtons = ({ user }: AuthButtonsProps) => {
  return user ? (
    <SignOutButton>
      <div>
        <ResponsiveButton
          variant={'outline'}
          text="Tanca Sessió"
          Icon={User2Icon}
        />
      </div>
    </SignOutButton>
  ) : (
    <SignInButton mode="modal">
      <div>
        <ResponsiveButton
          variant={'outline'}
          text="Inicia Sessió"
          Icon={User2Icon}
        />
      </div>
    </SignInButton>
  );
};

export default AuthButtons;
