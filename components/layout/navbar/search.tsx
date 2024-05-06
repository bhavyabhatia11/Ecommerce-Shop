'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PopoverClose } from '@radix-ui/react-popover';
import { createUrl } from 'lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set('q', search.value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/collections', newParams));
  }

  return (
    <Popover>
      <PopoverTrigger>
        <MagnifyingGlassIcon className="h-6 pr-1 lg:h-6 lg:pr-4 " />
      </PopoverTrigger>
      <PopoverContent className="mt-5 w-[100vw] rounded-none bg-primary bg-opacity-75 backdrop-blur-sm">
        <div>
          <form onSubmit={onSubmit} className="flex w-full items-center lg:w-80 xl:w-full">
            <div className="flex h-full items-center p-4">
              <MagnifyingGlassIcon className="h-6" color="rgb(115 115 115)" />
            </div>
            <input
              key={searchParams?.get('q')}
              type="text"
              name="search"
              placeholder="Search something..."
              defaultValue={searchParams?.get('q') || ''}
              className="text-md w-full bg-transparent font-serif text-black outline-none placeholder:text-neutral-500"
            />
            <div>
              <PopoverClose asChild>
                <div className="flex h-full items-center p-4">
                  <XMarkIcon className="h-6 cursor-pointer" color="rgb(115 115 115)" />
                </div>
              </PopoverClose>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function SearchSkeleton() {
  return <MagnifyingGlassIcon className="h-4" />;
}
