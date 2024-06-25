import { Button } from '@/components/ui/button';
import { GridTileImage } from 'components/grid/tile';
import Label from 'components/label';
import { getCollectionProducts } from 'lib/shopify';
import { Section } from 'lib/shopify/types';
import { MoveRightIcon } from 'lucide-react';
import Link from 'next/link';

export const BestSellers = async ({ data }: { data: Section }) => {
  if (!data) return null;

  const products = await getCollectionProducts({
    collection: data.handle
  });

  return (
    <div className="relative items-center justify-center bg-dark-green lg:py-24">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-4 py-12 pb-16 text-primary lg:gap-12 lg:px-12 lg:pb-0 lg:pt-16">
        <div className="flex w-full items-end justify-between">
          <div className="lg:mb-12">
            <h2 className="text-2xl lg:mb-4 lg:text-[40px] lg:leading-tight">{data.title}</h2>
            <h2 className="mb-4 font-serif text-sm lg:text-base">{data.subtitle}</h2>
          </div>
          <Link href={`/collections/${data.handle}`} className="hidden lg:block">
            <Button
              variant="default"
              className="mt-8 w-full gap-2 font-serif text-secondary lg:mt-12 lg:w-auto"
            >
              Shop all
              <MoveRightIcon />
            </Button>
          </Link>
        </div>

        <ul className="no-scrollbar flex w-full gap-4 overflow-x-auto overflow-y-hidden pt-1 lg:gap-16">
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

        <Link href={`/collections/${data.handle}`} className="block lg:hidden">
          <Button
            variant="default"
            className="mt-0 w-full gap-2 font-serif text-secondary lg:mt-12 lg:w-auto"
          >
            Shop all
            <MoveRightIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
};
