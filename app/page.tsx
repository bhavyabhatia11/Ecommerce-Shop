import { ThreeItemGrid } from 'components/grid/three-items';
import { LandingPage } from 'components/landing-page';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      <LandingPage />
      <ThreeItemGrid />
    </>
  );
}
