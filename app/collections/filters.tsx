'use client';
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
    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-row items-center justify-between border p-4">
        <div className="flex flex-col items-start">
          <div className="text-lg">Sort By</div>
          <div className="text-sm">{active?.title ? active.title : 'Chose an option'}</div>
        </div>
        <ChevronDown className="mr-2 h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[calc((100vw-32px)/3)] max-w-[501px] rounded-none bg-white p-0 font-serif">
        {sorting.map((item, key) => {
          return (
            <DropdownMenuItem asChild key={key}>
              <FilterItem item={item} key={key} />
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const PriceFilter = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-row items-center justify-between border p-4">
        <div className="flex flex-col items-start">
          <div className="text-lg">Price</div>
          <div className="text-sm">Chose an option</div>
        </div>
        <ChevronDown className="mr-2 h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[calc((100vw-32px)/3)] max-w-[501px] rounded-none bg-white p-0 font-serif">
        {priceRange.map((item, key) => {
          return (
            <DropdownMenuItem asChild key={key}>
              <FilterItem item={item} key={key} />
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function Filters({ filters }: { filters: any }) {
  console.log('FILR', filters);

  return (
    <Grid className="my-8 grid-cols-3 !gap-0 border-y font-serif">
      <PriceFilter />
      <SortByFilter />
      <SortByFilter />
    </Grid>
  );
}
