import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

interface SubscriptionLayoutProps {
  children: React.ReactNode;
}

const SubscriptionLayout = async ({ children }: SubscriptionLayoutProps) => {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }

  return children;
};
export default SubscriptionLayout;
