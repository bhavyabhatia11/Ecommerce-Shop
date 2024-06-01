'use client';

import { Checkbox } from '@/components/ui/checkbox';
import clsx from 'clsx';
import { STONE_COLORS, type PriceRangeItem, type SortFilterItem } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type ListItem = SortFilterItem | string | PriceRangeItem;

function createSearchParams(params: any) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  });
  return searchParams;
}

function SortFilterItem({ item }: { item: SortFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get('sort') === item.slug;
  const q = searchParams.get('q');
  const min = searchParams.get('min');
  const max = searchParams.get('max');
  const stonesString = searchParams.getAll('stones')[0] || '';
  const stones = stonesString.split(',').filter(Boolean);

  const params = {
    ...(q && { q }),
    ...(min && { min }),
    ...(max && { max }),
    ...(item.slug && { sort: item.slug }),
    ...(stones && stones.length > 0 && { stones: stones })
  };

  const href = createUrl(pathname, createSearchParams(params));
  const DynamicTag = active ? 'p' : Link;

  return (
    <li className="flex text-sm text-black dark:text-white" key={item.title}>
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={clsx(
          'w-full p-4 font-serif tracking-wider hover:bg-beige-lighter hover:no-underline lg:p-5',
          {
            'font-bold': active
          }
        )}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}

function PriceRangeFilterItem({ item }: { item: PriceRangeItem }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  const sort = searchParams.get('sort');
  const min = searchParams.get('min');
  const stonesString = searchParams.getAll('stones')[0] || '';
  const stones = stonesString.split(',').filter(Boolean);

  const active = item.min !== undefined && item.min.toString() === min;

  const togglePriceRange = () => {
    const params = active
      ? {
          ...(q && { q }),
          ...(sort && { sort }),
          ...(stones && stones.length > 0 && { stones: stones })
        }
      : {
          ...(q && { q }),
          ...(sort && { sort }),
          ...(stones && stones.length > 0 && { stones: stones }),
          ...(item.min !== undefined && { min: item.min.toString() }),
          ...(item.max !== undefined && { max: item.max.toString() })
        };
    const href = createUrl(pathname, createSearchParams(params));
    router.push(href);
  };
  return (
    <li className="flex text-sm text-black dark:text-white" key={`${item.min} - ${item.max}`}>
      <div
        onClick={togglePriceRange}
        className={clsx(
          'w-full p-4 font-serif tracking-wider hover:bg-beige-lighter hover:no-underline lg:p-5',
          {
            '': active
          }
        )}
      >
        <div className="flex items-center justify-between">
          <label
            htmlFor={`${item.min} - ${item.max}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {item.max ? `${item.min} - ${item.max}` : `Above ${item.min}`}
          </label>
          <Checkbox
            id={`${item.min} - ${item.max}`}
            className="bg-white "
            onClick={togglePriceRange}
            checked={active}
          />
        </div>
      </div>
    </li>
  );
}

function StoneFilterItem({ item }: { item: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  const sort = searchParams.get('sort');
  const min = searchParams.get('min');
  const max = searchParams.get('max');
  const stonesString = searchParams.getAll('stones')[0] || '';
  const stones = stonesString.split(',').filter(Boolean);
  const active = stones.includes(item);

  const toggleStone = () => {
    const newStones = active ? stones.filter((s) => s !== item) : [...stones, item];
    const params = {
      ...(q && { q }),
      ...(sort && { sort }),
      ...(min && { min }),
      ...(max && { max }),
      stones: newStones // Set stones to the new array of stones
    };
    const href = createUrl(pathname, createSearchParams(params));
    router.push(href);
  };

  return (
    <li className="flex text-sm text-black dark:text-white" key={item}>
      <div
        className={clsx(
          'w-full p-4 font-serif tracking-wider hover:bg-beige-lighter hover:no-underline lg:p-5',
          {
            '': active
          }
        )}
      >
        <div className="flex items-center justify-between">
          <label
            htmlFor={item}
            className="flex items-center gap-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <div
              className={`h-4 w-4`}
              style={{
                backgroundImage: STONE_COLORS[item]
                  ? STONE_COLORS[item]
                  : 'linear-gradient(to top, red, yellow, blue, violet)'
              }}
            ></div>
            <div>{item}</div>
          </label>
          <Checkbox id={item} className="bg-white" onClick={toggleStone} checked={active} />
        </div>
      </div>
    </li>
  );
}

export function FilterItem({ item }: { item: ListItem }) {
  if (typeof item === 'string') {
    return <StoneFilterItem item={item} />;
  } else if ('min' in item) {
    return <PriceRangeFilterItem item={item} />;
  } else if ('slug' in item) {
    return <SortFilterItem item={item as SortFilterItem} />;
  } else {
    return null;
  }
}
