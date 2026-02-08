import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { site } from '@/config/site.config';

const HomeLink = () => {
  return (
    <Link
      className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
      href={'/'}
      prefetch={false}
    >
      {/* Logo */}
      <HomeIcon className="h-6 w-6 text-primary" />
      {/* Site Name */}
      <span className="text-xl font-bold bg-linear-to-r from-primary/90 to-primary bg-clip-text text-transparent">
        <span className="sr-only sm:not-sr-only">{site.name.long}</span>
        <span className="inline sm:hidden">{site.name.short}</span>
      </span>
    </Link>
  );
};

export default HomeLink;
