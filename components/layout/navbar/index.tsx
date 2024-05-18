import { Bars3Icon } from '@heroicons/react/24/outline';
import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import HeaderLogoIcon from 'components/icons/header-logo';
import SSLogoIcon from 'components/icons/ss-logo';
import { getMenu } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';
import HamburgerMenu from './menu';
import Search, { SearchSkeleton } from './search';

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-slate-600 bg-secondary bg-opacity-100 p-4 font-serif text-white lg:px-6">
        <div className="flex items-center">
          <Suspense fallback={<Bars3Icon className="h-4 lg:h-5" />}>
            <HamburgerMenu menu={menu} />
          </Suspense>
        </div>

        <div className="absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center md:w-auto lg:mr-6">
          <Link href="/" className="flex items-center">
            <HeaderLogoIcon width={'250'} height={'40'} className="hidden pb-[2px] lg:block" />
            <SSLogoIcon height={'44'} color="white" className="block lg:hidden" />
          </Link>
        </div>

        <div className="flex items-center gap-0 lg:gap-4">
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
