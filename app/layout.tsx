import { Toaster } from '@/components/ui/toaster';
import {
  Bodoni_Moda,
  Courier_Prime,
  IBM_Plex_Mono,
  Libre_Caslon_Display,
  Montserrat,
  Playfair_Display,
  Poppins,
  Raleway
} from '@next/font/google';
import Footer from 'components/layout/footer';
import Navbar from 'components/layout/navbar';
import { ensureStartsWith } from 'lib/utils';
import { ReactNode, Suspense } from 'react';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:8080';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};

const courier_prime = Courier_Prime({
  variable: '--font-courier_prime',
  weight: ['400', '700'],
  subsets: ['latin']
});

const ibm = IBM_Plex_Mono({
  variable: '--font-ibm',
  weight: ['200', '400', '700'],
  subsets: ['latin']
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap'
});

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni',
  display: 'swap'
});

const libre = Libre_Caslon_Display({
  variable: '--font-libre',
  weight: '400',
  subsets: ['latin']
});

const poppins = Poppins({
  variable: '--font-poppins',
  weight: '200',
  subsets: ['latin']
});

const raleway = Raleway({
  variable: '--font-raleway',
  weight: '400',
  subsets: ['latin']
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  weight: ['400', '700'],
  subsets: ['latin']
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${courier_prime.variable} ${playfair.variable} ${bodoni.variable} ${libre.variable} ${ibm.variable} ${poppins.variable} ${raleway.variable} ${montserrat.variable} bg-primary font-sans`}
      >
        <Navbar />
        <Suspense>
          <main>{children}</main>
          <Toaster />
        </Suspense>
        <Suspense>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
