import { ModeToggle } from './ui/theme-toggle';
import Link from 'next/link';
import { HomeIcon } from 'lucide-react';
import PageContainer from './ui/page-container';
import PrimaryActionButton from './navbar/PrimaryActionButton';
import { site } from '@/config/site.config';
import AuthButtons from './navbar/AuthButtons';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <PageContainer className="flex h-16 items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-4">
          <Link
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            href={'/'}
            prefetch={false}
          >
            {/* Logo */}
            <HomeIcon className="h-6 w-6 text-primary" />
            {/* Site Name */}
            <span className="text-xl font-bold bg-linear-to-r from-primary/90 to-primary bg-clip-text text-transparent">
              {site.name}
            </span>
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Nav */}
          <nav className="flex items-center space-x-2 md:space-x-4">
            <PrimaryActionButton />
          </nav>

          {/* Auth Buttons */}
          <AuthButtons />

          {/* Theme Toggle Button */}
          <ModeToggle />
        </div>
      </PageContainer>
    </header>
  );
};
export default Header;
