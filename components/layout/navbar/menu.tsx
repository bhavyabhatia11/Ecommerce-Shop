'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { Accordion, AccordionContent, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { AccordionItem } from '@radix-ui/react-accordion';
import clsx from 'clsx';
import { baseUrl } from 'lib/constants';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';

const levelToPadding = ['pl-2', 'pl-8', 'pl-12'];
const AccordianMenu = ({
  menu,
  className,
  level
}: {
  menu: Menu[];
  className: string;
  level: number;
}) => {
  const paddingLeft = levelToPadding[level];
  return (
    <Accordion type="single" collapsible className={clsx('w-full', className)} defaultValue="Shop">
      {menu.length ? (
        <ul className="flex flex-col">
          {menu.map((item: Menu, index) => (
            <>
              {item.items && item.items.length > 0 ? (
                <AccordionItem
                  className="p-0 transition-colors "
                  value={item.title}
                  key={`${item.path}-${index}`}
                >
                  <AccordionTrigger
                    className={`py-2 pr-4 ${paddingLeft} text-lg hover:bg-beige-dark hover:text-neutral-500 hover:no-underline`}
                  >
                    <SheetClose asChild>
                      <Link href={`${baseUrl}/${item.path}`}>{item.title}</Link>
                    </SheetClose>
                  </AccordionTrigger>
                  <AccordionContent className="p-0">
                    <AccordianMenu
                      className=""
                      menu={item.items}
                      level={level + 1}
                      key={`${item.path}-${index}`}
                    />
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <SheetClose
                  asChild
                  key={`${item.path}-${index}`}
                  className={`py-2 pr-4 ${paddingLeft} text-lg text-black transition-colors hover:bg-beige-dark hover:text-neutral-500`}
                >
                  <Link href={`${baseUrl}/${item.path}`}>{item.title}</Link>
                </SheetClose>
              )}
              {index != menu.length - 1 && <hr className="" />}
            </>
          ))}
        </ul>
      ) : null}
    </Accordion>
  );
};

export default function HamburgerMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {}, [pathname, searchParams]);

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Bars3Icon className="h-4" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-primary p-0 font-serif text-lg tracking-wide">
          <AccordianMenu menu={menu} className="" level={0} />
        </SheetContent>
      </Sheet>
    </>
  );
}
