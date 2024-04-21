'use client';

import clsx from 'clsx';
import type { PriceRangeItem, SortFilterItem } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import type { ListItem, PathFilterItem } from '.';

function PathFilterItem({ item }: { item: PathFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = pathname === item.path;
  const newParams = new URLSearchParams(searchParams.toString());
  const DynamicTag = active ? 'p' : Link;

  newParams.delete('q');

  return (
    <li className="mt-2 flex text-black dark:text-white" key={item.title}>
      <DynamicTag
        href={createUrl(item.path, newParams)}
        className={clsx(
          'w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100',
          {
            'underline underline-offset-4': active
          }
        )}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}

function SortFilterItem({ item }: { item: SortFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get('sort') === item.slug;
  const q = searchParams.get('q');
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug })
    })
  );
  const DynamicTag = active ? 'p' : Link;

  return (
    <li className="flex text-sm text-black dark:text-white" key={item.title}>
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={clsx('w-full p-4 tracking-[0.42px] hover:bg-beige-dark hover:no-underline', {
          'bg-beige-dark': active
        })}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}

function PriceRangeFilterItem({ item }: { item: PriceRangeItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  const sort = searchParams.get('sort');
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(sort && { sort }),
      ...(item.min !== undefined && { min: item.min.toString() }),
      ...(item.max !== undefined && { max: item.max.toString() })
    })
  );
  return (
    <li className="flex text-sm text-black" key={item.slug}>
      <Link
        prefetch={false}
        href={href}
        className={clsx('w-full p-4 tracking-[0.42px] hover:bg-beige-dark hover:no-underline')}
      >
        {item.max ? `${item.min} - ${item.max}` : `Above ${item.min}`}
      </Link>
    </li>
  );
}

export function FilterItem({ item }: { item: ListItem }) {
  return 'min' in item ? (
    <PriceRangeFilterItem item={item} />
  ) : (
    <SortFilterItem item={item as SortFilterItem} />
  );
}
