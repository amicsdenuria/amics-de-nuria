import Header from '@/components/Header';
import { Metadata } from 'next';
import Providers from '@/components/providers';
import { SanityLive } from '@/sanity/lib/live';
import { site } from '@/config/site.config';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: site.name.long,
  description: site.hero.description,
};

interface PublicLayoutProps {
  children: Readonly<React.ReactNode>;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col font-serif">
        <Header />
        {children}
      </div>

      <SanityLive />
    </Providers>
  );
};
export default PublicLayout;
