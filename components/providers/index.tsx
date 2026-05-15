import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';
import { caES } from '@clerk/localizations';

interface ProvidersProps {
  children: Readonly<ReactNode>;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ClerkProvider
      localization={caES}
      signUpFallbackRedirectUrl={'/subscription'}
    >
      <ThemeProvider
        attribute="class"
        // defaultTheme="system"
        enableSystem={false}
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ClerkProvider>
  );
};
export default Providers;
