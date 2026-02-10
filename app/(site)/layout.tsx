import Header from '@/components/Header';
import { Metadata } from 'next';
import Providers from '@/components/providers';
import { SanityLive } from '@/sanity/lib/live';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Amics de Núria',
  description: '#TODO',
};

interface PublicLayoutProps {
  children: Readonly<React.ReactNode>;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col">
        <Header />
        {children}
      </div>

      <SanityLive />
    </Providers>
  );
};
export default PublicLayout;
