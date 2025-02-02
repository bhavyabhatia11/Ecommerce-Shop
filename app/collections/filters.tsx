'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import Grid from 'components/grid';
import { FilterItem } from 'components/layout/search/filter/item';
import { priceRange, sorting } from 'lib/constants';
import { ChevronDown } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const SortByFilter = () => {
  const searchParams = useSearchParams();
  const active = sorting.find((item) => searchParams.get('sort') === item.slug);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="hidden flex-row items-center justify-between p-0 lg:flex lg:p-4">
          <div className="flex flex-col items-start">
            <div className="">Sort By</div>
            <div className="text-sm text-neutral-500">
              {active?.title ? active.title : 'Chose an option'}
            </div>
          </div>
          <ChevronDown className="mr-2 h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[calc((100vw-32px)/3)] max-w-[416px] rounded-none bg-white p-0 !font-serif">
          {sorting.map((item, key) => {
            return (
              <DropdownMenuItem asChild key={key}>
                <FilterItem item={item} key={key} />
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="text-left lg:hidden">
        {sorting.map((item, key) => {
          return <FilterItem item={item} key={key} />;
        })}
      </div>
    </>
  );
};

const PriceFilter = () => {
  const searchParams = useSearchParams();
  const min = searchParams.get('min');
  const active = priceRange.find((item) => item.min !== undefined && item.min.toString() === min);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hidden flex-row items-center justify-between p-4 lg:flex">
        <div className="flex flex-col items-start">
          <div className="">Price</div>
          <div className="text-sm text-neutral-500">
            {active
              ? active.max
                ? `${active.min} - ${active.max}`
                : `Above ${active.min}`
              : 'Choose an option'}
          </div>
        </div>
        <ChevronDown className="mr-2 h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[calc((100vw-32px)/3)] max-w-[416px] rounded-none bg-white p-0 font-serif">
        {priceRange.map((item, key) => (
          <DropdownMenuItem asChild key={key}>
            <FilterItem item={item} key={key} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const StonesFilter = ({ stones }: { stones: string[] }) => {
  const searchParams = useSearchParams();
  const stonesString = searchParams.getAll('stones')[0] || '';
  const selectedStones = stonesString.split(',').filter(Boolean);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="hidden flex-row items-center justify-between border-x p-4 lg:flex">
          <div className="flex flex-col items-start">
            <div className="">Stones</div>
            <div className="text-sm text-neutral-500">
              {selectedStones && selectedStones.length > 0
                ? `${selectedStones.length} selected`
                : 'Chose an option'}
            </div>
          </div>
          <ChevronDown className="mr-2 h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[calc((100vw-32px)/3)] max-w-[416px] rounded-none bg-white p-0 font-serif">
          {stones.map((item, key) => {
            return (
              <DropdownMenuItem asChild key={key}>
                <FilterItem item={item} key={key} />
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const FiltersAndSort = ({ filters }: { filters: any }) => {
  const searchParams = useSearchParams();
  const stonesString = searchParams.getAll('stones')[0] || '';
  const selectedStones = stonesString.split(',').filter(Boolean);
  const min = searchParams.get('min');
  const active = priceRange.find((item) => item.min !== undefined && item.min.toString() === min);
  return (
    <>
      <Drawer>
        <DrawerTrigger className="w-1/2 border-r p-3 text-left font-serif text-sm lg:text-base">
          Filters
        </DrawerTrigger>
        <DrawerContent className="!p-0">
          <DrawerHeader>
            <DrawerTitle className="p-4 text-left font-serif">Filters</DrawerTitle>
            <DrawerDescription>
              <Accordion type="single" collapsible defaultValue="Price">
                <AccordionItem className="p-0 transition-colors" value="Price" key="price">
                  <AccordionTrigger className="border-b p-4 font-serif text-lg hover:no-underline">
                    <div className="flex flex-col items-start">
                      <div className="text-sm">Price</div>
                      <div className="text-xs">
                        {active
                          ? active.max
                            ? `${active.min} - ${active.max}`
                            : `Above ${active.min}`
                          : 'Choose an option'}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-0">
                    {priceRange.map((item, key) => (
                      <FilterItem item={item} key={key} />
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem className="p-0 transition-colors" value="Stones" key="stones">
                  <AccordionTrigger className="p-4 font-serif text-lg hover:no-underline">
                    <div className="flex flex-col items-start">
                      <div className="text-sm">Stones</div>
                      <div className="text-xs">
                        {selectedStones && selectedStones.length > 0
                          ? `${selectedStones.length} selected`
                          : 'Chose an option'}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-0">
                    {filters.stones.map((item: string, key: number) => (
                      <FilterItem item={item} key={key} />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer>
        <DrawerTrigger className="w-1/2 p-3 text-left text-sm lg:text-base">Sort</DrawerTrigger>
        <DrawerContent className="p-0">
          <DrawerHeader className="p-0">
            <DrawerTitle className="p-4 text-left font-serif">Sort by</DrawerTitle>
            <DrawerDescription>
              <SortByFilter />
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default function Filters({ filters }: { filters: any }) {
  return (
    <>
      <Grid className="mb-16 mt-8 hidden grid-cols-3 !gap-0 border-y font-serif lg:grid">
        <PriceFilter />
        <StonesFilter stones={filters.stones} />
        <SortByFilter />
      </Grid>

      <div className="mb-5 mt-4 flex !gap-0 border-y font-serif lg:hidden">
        <FiltersAndSort filters={filters} />
      </div>
    </>
  );
}
