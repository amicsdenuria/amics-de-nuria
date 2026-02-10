import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

interface UserLayoutProps {
  children: React.ReactNode;
}

export const dynamic = 'force-dynamic';

const UserLayout = async ({ children }: UserLayoutProps) => {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }

  return children;
};
export default UserLayout;
