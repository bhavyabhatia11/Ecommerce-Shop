import { Button } from '@/components/ui/button';
import { GridTileImage } from 'components/grid/tile';
import Ring from 'components/icons/ring';
import Label from 'components/label';
import { getCollectionProducts } from 'lib/shopify';
import { Section } from 'lib/shopify/types';
import { MoveRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const Showcase = async ({ data }: { data: Section }) => {
  if (!data) return null;

  const products = await getCollectionProducts({
    collection: data.handle
  });

  return (
    <div className="relative items-center justify-center bg-secondary pb-12 text-primary lg:pb-24">
      <div className="mx-auto flex max-w-screen-2xl gap-12 px-4 lg:mt-24">
        <div className="mt-20 flex w-full flex-col">
          <div className="flex flex-col lg:flex-row">
            <Ring
              className="absolute left-[-50px] top-[100px] hidden transform opacity-40 lg:left-[-100px] lg:top-[300px] lg:block"
              color="#c4c4c4"
            />
            <Ring
              className="absolute left-[-50px] top-[200px] block transform opacity-40 lg:hidden"
              height={'237px'}
              width={'237px'}
              color="#c4c4c4"
            />
            <div className="relative h-[285px] w-[200px] overflow-hidden rounded-full lg:h-[614px] lg:w-[431px]">
              <Image
                className="object-cover"
                fill
                alt={'about-left'}
                src={data.images[0]?.image.url as string}
              />
            </div>
            <div className="mt-20 w-full lg:ml-20 lg:mt-0 lg:w-1/3">
              <div className="z-1 bottom-0 mb-2 flex font-serif text-sm text-neutral-300 lg:mb-4 lg:text-base">
                {data.subtitle}
              </div>
              <div className="z-1 bottom-0 mb-8 flex text-2xl lg:mb-20 lg:text-5xl">
                {data.title}
              </div>
              <div className="z-1 bottom-0 mb-8 flex w-full items-center gap-4 font-serif text-sm text-neutral-300 lg:mb-0 lg:ml-20 lg:text-base">
                {data.description}
              </div>
              <Link href={`/collections/${data.handle}`} className="hidden lg:ml-20 lg:block">
                <Button
                  variant="default"
                  className="mt-8 w-full gap-2 font-serif text-secondary lg:mt-12 lg:w-auto"
                >
                  Shop collection
                  <MoveRightIcon />
                </Button>
              </Link>
            </div>
          </div>
          <div className="overflow-x-hidden">
            <ul className="no-scrollbar mb-4 flex w-full gap-4 overflow-x-auto overflow-y-hidden pt-1 lg:mb-0 lg:ml-[431px] lg:gap-12">
              {products?.map((product) => (
                <li
                  key={product.handle}
                  className="mb-16 aspect-[4/5] max-h-[386px] min-h-[195px] w-1/2 min-w-[163px] max-w-[278px] flex-none lg:mb-24 lg:w-1/4"
                >
                  <Link className="relative" href={`/product/${product.handle}`}>
                    <GridTileImage
                      alt={product.title}
                      label={{
                        title: product.title,
                        amount: product.priceRange.maxVariantPrice.amount,
                        currencyCode: product.priceRange.maxVariantPrice.currencyCode
                      }}
                      src={product.featuredImage?.url}
                      sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </Link>
                  <Label
                    title={product.title}
                    amount={product.priceRange.maxVariantPrice.amount}
                    currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                    position="bottom"
                  />
                </li>
              ))}
            </ul>
          </div>
          <Link href={`/collections/${data.handle}`} className="block lg:hidden">
            <Button
              variant="default"
              className="mt-0 w-full gap-2 font-serif text-secondary lg:mt-12 lg:w-auto"
            >
              See all
              <MoveRightIcon />
            </Button>
          </Link>
        </div>
        <div className="absolute right-0 top-0 flex flex-col">
          <div className="relative h-[220px] w-[160px] overflow-hidden rounded-b-full lg:h-[520px] lg:w-[320px]">
            <Image
              className="object-cover"
              fill
              alt={'about-left'}
              src={data.images[1]?.image.url as string}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
