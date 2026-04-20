import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/config/site.config';

const HomeLink = () => {
  return (
    <Link
      className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
      href={'/'}
      prefetch={false}
    >
      {/* Logo */}
      <Image
        alt="Amics de Núria Logo"
        src="/adn-glass-logo-transparent-bg.webp"
        width={24}
        height={24}
      />
      {/* Site Name */}
      <span className="text-xl font-bold">
        <span className="sr-only sm:not-sr-only">{site.name.long}</span>
        <span className="inline sm:hidden">{site.name.short}</span>
      </span>
    </Link>
  );
};

export default HomeLink;
