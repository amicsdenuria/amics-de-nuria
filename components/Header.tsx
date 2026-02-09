import AuthButtons from './navbar/AuthButtons';
import HomeLink from './navbar/HomeLink';
import { ModeToggle } from './ui/theme-toggle';
import PageContainer from './ui/page-container';
import PrimaryActionButton from './navbar/PrimaryActionButton';
import { currentUser } from '@clerk/nextjs/server';
import { getIsEnrolled } from '@/sanity/lib/subscriber/getIsEnrolled';

export const dynamic = 'force-dynamic';

const Header = async () => {
  const user = await currentUser();
  const isEnrolled = await getIsEnrolled({ clerkId: user?.id });

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <PageContainer className="flex h-16 items-center justify-between gap-4">
        {/* Left */}
        <HomeLink />

        {/* Right */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Nav */}
          <nav>
            <PrimaryActionButton isEnrolled={isEnrolled} />
          </nav>

          {/* Auth Buttons */}
          <AuthButtons user={user} />

          {/* Theme Toggle Button */}
          <ModeToggle />
        </div>
      </PageContainer>
    </header>
  );
};

export default Header;
