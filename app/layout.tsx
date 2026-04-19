import './globals.css';

// DEFAULT LAYOUT
// import { Geist, Geist_Mono } from 'next/font/google';
import { Merriweather, Montserrat, Ubuntu_Mono } from 'next/font/google';

import type { Metadata } from 'next';
import { site } from '@/config/site.config';

// DEFAULT LAYOUT
// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });
const fontSans = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontSerif = Merriweather({
  subsets: ['latin'],
  variable: '--font-serif',
});

const fontMono = Ubuntu_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: site.name.long,
  description: site.hero.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ca-ES"
      suppressHydrationWarning
    >
      <body
        // DEFAULT LAYOUT
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
