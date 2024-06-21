import Link from 'next/link';

import HeaderLogoIcon from 'components/icons/header-logo';
import SSLogoIcon from 'components/icons/ss-logo';
import FooterMenu from 'components/layout/footer-menu';
import { getMenu, getMetaObjects } from 'lib/shopify';
import { Suspense } from 'react';
import { EmailSignup } from './footer-email';
import Testimonials from './testimonials';

export default async function Footer() {
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  const menu = await getMenu('next-js-frontend-footer-menu');
  const testimonials = await getMetaObjects('testimonial');
  const footerInfo = await getMetaObjects('footer');

  if (!footerInfo) return;

  return (
    <footer className="bg-dark-green text-sm text-neutral-400 ">
      <div className="flex w-full flex-col gap-6  overflow-hidden border-t border-neutral-700 pt-12 text-sm md:flex-row md:gap-12 md:px-4 lg:mx-[1px] lg:pb-8 lg:pt-16 min-[1320px]:px-0">
        <Testimonials testimonials={testimonials} />
      </div>
      <div className="flex w-full flex-row items-center justify-center gap-4 px-0 lg:px-16">
        <div className="w-[50%]">
          <hr className="border-t" />
        </div>
        <SSLogoIcon color="white" />
        <div className="w-[50%]">
          <hr className="border-t" />
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-7xl max-w-screen-xl flex-col gap-6 px-6 py-12 font-serif text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        <div className="flex flex-col gap-6">
          <Link className="flex items-center gap-2 text-black dark:text-white md:pt-1" href="/">
            <HeaderLogoIcon width={'204'} height={'32'} />
          </Link>
          <div className="w-[300px]">{footerInfo[0]?.address}</div>
          <div>
            <a href={`mailto:${footerInfo[0]?.email}`}>{footerInfo[0]?.email}</a>
          </div>
          <div>
            <a href={`tel:${footerInfo[0]?.phone}`}>{footerInfo[0]?.phone}</a>
          </div>
        </div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={menu} />
        </Suspense>
        <div className="md:ml-auto"></div>

        <EmailSignup />
      </div>
    </footer>
  );
}
