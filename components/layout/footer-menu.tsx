'use client';

import clsx from 'clsx';
import Grid from 'components/grid';
import { baseUrl } from 'lib/constants';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const FooterMenuItem = ({ item }: { item: Menu }) => {
  const pathname = usePathname();

  const [active, setActive] = useState(pathname === item.path);

  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  return (
    <li>
      <Link
        href={`${baseUrl}/${item.path}`}
        className={clsx(
          'block p-2 text-lg text-neutral-400 hover:text-neutral-200 md:inline-block md:text-sm',
          {
            'text-neutral-200': active
          }
        )}
      >
        {item.title}
      </Link>
    </li>
  );
};

export default function FooterMenu({ menu }: { menu: Menu[] }) {
  if (!menu.length) return null;

  return (
    <nav>
      <Grid className="z-1 bottom-0 flex w-full grid-cols-1 items-center !gap-0 gap-4 !gap-x-16 gap-y-0 font-serif text-sm text-secondary lg:grid-flow-col lg:grid-rows-6 lg:text-base">
        {menu.map((item: Menu) => {
          return (
            <Grid.Item key={item.title} className="animate-fadeIn aspect-auto w-full">
              <FooterMenuItem key={item.title} item={item} />
            </Grid.Item>
          );
        })}
      </Grid>
    </nav>
  );
}
