'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';

export default function HamburgerMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Bars3Icon className="h-4" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-primary">
          <div className="mb-4 w-full">
            {menu.length ? (
              <ul className="flex w-full flex-col">
                {menu.map((item: Menu) => (
                  <li
                    className="py-2 text-xl text-black transition-colors hover:text-neutral-500 dark:text-white"
                    key={item.title}
                  >
                    <SheetClose asChild key={item.path}>
                      <Link href={item.path}>{item.title}</Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
