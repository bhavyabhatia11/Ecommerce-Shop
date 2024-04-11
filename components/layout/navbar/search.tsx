'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { createUrl } from 'lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleSearch = () => {
    const search = document.getElementById('search-input');
    if (!search) return;
    search.classList.toggle('hidden');
  };

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    toggleSearch();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set('q', search.value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/search', newParams));
  }

  return (
    <div className="bg-gray-light bg-opacity-50">
      <form
        onSubmit={onSubmit}
        id="search-input"
        className="absolute left-0 top-20 hidden w-full p-4 lg:w-80 xl:w-full"
      >
        <input
          key={searchParams?.get('q')}
          type="text"
          name="search"
          placeholder="Search for products..."
          autoComplete="off"
          defaultValue={searchParams?.get('q') || ''}
          className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500"
        />
        <div className="absolute right-0 top-0 mr-3 flex h-full items-center p-4">
          <MagnifyingGlassIcon className="h-4 bg-transparent" />
        </div>
      </form>
      <MagnifyingGlassIcon className="h-4 bg-transparent" onClick={toggleSearch} />
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="Search for products..."
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
