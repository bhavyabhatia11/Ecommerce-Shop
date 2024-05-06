'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { Accordion, AccordionContent, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { AccordionItem } from '@radix-ui/react-accordion';
import clsx from 'clsx';
import { baseUrl } from 'lib/constants';
import { Menu } from 'lib/shopify/types';
import { X } from 'lucide-react';
import Link from 'next/link';

const levelToPadding = ['pl-8', 'pl-16', 'pl-20'];
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
                    className={`py-4 pr-5 ${paddingLeft} text-base hover:bg-beige-dark hover:no-underline`}
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
                  className={`py-4 pr-5 ${paddingLeft} text-base text-black transition-colors hover:bg-beige-dark`}
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
          <Bars3Icon className="h-9 w-9 pb-[2px]" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-full bg-primary p-0 font-serif text-lg tracking-[.03em]"
        >
          <SheetHeader>
            <SheetClose className="mx-3 my-4 block rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-secondary lg:hidden">
              <X className="h-6 w-6" color="black" />
            </SheetClose>
          </SheetHeader>
          <AccordianMenu menu={menu} className="" level={0} />
        </SheetContent>
      </Sheet>
    </>
  );
}
