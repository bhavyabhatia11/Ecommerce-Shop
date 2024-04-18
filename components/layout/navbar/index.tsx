import { Bars3Icon } from '@heroicons/react/24/outline';
import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';
import HamburgerMenu from './menu';
import Search, { SearchSkeleton } from './search';

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-secondary bg-opacity-100 p-4 font-serif text-white lg:px-6">
        <div className="flex items-center">
          <Suspense fallback={<Bars3Icon className="h-4" />}>
            <HamburgerMenu menu={menu} />
          </Suspense>
        </div>

        <div className="absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center md:w-auto lg:mr-6">
          <Link href="/" className="flex items-center">
            <LogoSquare color="white" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </nav>
    </>
  );
}
