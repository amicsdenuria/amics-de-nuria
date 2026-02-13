import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { SignInButton, SignOutButton } from '@clerk/nextjs';

import Link from 'next/link';
import { ResponsiveButton } from '../ui/responsive-button';
import { User } from '@clerk/nextjs/server';
import { User2Icon } from 'lucide-react';

interface AuthButtonsProps {
  user: User | null;
  isAdmin: boolean | undefined;
}
const AuthButtons = ({ user, isAdmin }: AuthButtonsProps) => {
  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <ResponsiveButton
            variant={'outline'}
            Icon={User2Icon}
            text={`Hola, ${user.firstName ?? 'Usuari'}`}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isAdmin && (
          <Link href={'/admin'}>
            <DropdownMenuItem>Panell Admin</DropdownMenuItem>
          </Link>
        )}
        <Link href={'/subscription'}>
          <DropdownMenuItem>Subscripció</DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <SignOutButton>
          <DropdownMenuItem>Tanca Sessió</DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
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
