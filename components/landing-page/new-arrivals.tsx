import { Button } from '@/components/ui/button';
import { GridTileImage } from 'components/grid/tile';
import Ring from 'components/icons/ring';
import Label from 'components/label';
import { getCollectionProducts } from 'lib/shopify';
import { Section } from 'lib/shopify/types';
import { MoveRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const NewArrivals = async ({ data }: { data: Section }) => {
  if (!data) return null;

  const products = await getCollectionProducts({
    collection: data.handle
  });

  return (
    <div className="relative items-center justify-center bg-primary pb-12 lg:pb-24">
      <div className="mx-auto mt-8 flex max-w-screen-2xl flex-col gap-8 px-4 lg:mt-24 lg:flex-row lg:gap-0">
        <div className="relative flex w-[35%] flex-col lg:right-0 ">
          <Ring
            className="absolute left-[30%] top-[2%] mx-auto -mb-20 hidden opacity-20 lg:block"
            color="#c4c4c4"
          />
          <Ring
            className="absolute left-[30%] top-[20%] mx-auto -mb-20 hidden opacity-80 lg:block"
            height={'360px'}
            width={'360px'}
            color="#c4c4c4"
          />
          <div className="relative h-[328px] w-[212px] overflow-hidden lg:h-[647px] lg:w-[393px]">
            <Image
              className="object-cover"
              fill
              alt={'about-left'}
              src={data.images[0]?.image.url as string}
            />
          </div>
          <div className="absolute left-[180px] top-[200px] h-[191px] w-[154px] overflow-hidden rounded-full lg:left-[200px] lg:top-[460px] lg:h-[446px] lg:w-[360px] ">
            <Image
              className="object-cover"
              fill
              alt={'about-left'}
              src={data.images[1]?.image.url as string}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-8 lg:w-[65%] lg:gap-12 lg:gap-20 ">
          <div className="z-1 bottom-0 flex w-1/2 text-xl text-secondary lg:items-center lg:justify-center lg:gap-4 lg:text-5xl">
            {data.title}
          </div>
          <div>
            <Link
              href={`/collections/${data.handle}`}
              className="mb-8 flex hidden justify-end lg:block"
            >
              <Button variant="secondary" className="mt-8 gap-2 font-serif lg:mt-12">
                See all
                <MoveRightIcon />
              </Button>
            </Link>
            <ul className="no-scrollbar flex justify-end gap-8">
              {products?.slice(0, 2).map((product) => (
                <li
                  key={product.handle}
                  className="mb-20 aspect-[4/5] max-h-[386px] min-h-[195px] min-w-[163px] max-w-[278px] lg:mb-28"
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
            <ul className="no-scrollbar flex justify-end gap-8">
              {products?.slice(0, 2).map((product) => (
                <li
                  key={product.handle}
                  className="mb-12 aspect-[4/5] max-h-[386px] min-h-[195px] min-w-[163px] max-w-[278px] lg:mb-28"
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
        </div>

        <Link href={`/collections/${data.handle}`} className="block lg:hidden">
          <Button variant="secondary" className="mt-0 w-full gap-2 font-serif lg:mt-12 lg:w-auto">
            See all
            <MoveRightIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
};
