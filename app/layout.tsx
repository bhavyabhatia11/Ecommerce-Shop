import { Toaster } from '@/components/ui/toaster';
import { Courier_Prime, Salsa } from '@next/font/google';
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

const salsa = Salsa({
  variable: '--font-salsa',
  weight: ['400'],
  subsets: ['latin']
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${courier_prime.variable} ${salsa.variable} bg-primary`}>
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
