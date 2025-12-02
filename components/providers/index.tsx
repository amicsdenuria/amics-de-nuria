import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from './theme-provider';
import { ReactNode } from 'react';
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
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ClerkProvider>
  );
};
export default Providers;
