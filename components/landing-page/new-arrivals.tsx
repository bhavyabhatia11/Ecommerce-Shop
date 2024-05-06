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
      <Ring
        className="absolute right-0 top-0 block translate-x-1/2 transform opacity-40"
        height={'60%'}
        width={'60%'}
        color="#c4c4c4"
      />
      <div className="mx-auto mt-8 flex max-w-screen-2xl px-4 lg:mt-24">
        <div className="absolute right-[10%] flex w-[35%] flex-col lg:relative lg:right-0">
          <Ring
            className="absolute left-[30%] top-0 mx-auto -mb-20 hidden opacity-20 lg:block"
            height={'100%'}
            width={'120%'}
            color="#c4c4c4"
          />
          <Ring
            className="absolute left-[30%] top-0 mx-auto -mb-20 hidden opacity-80 lg:block"
            height={'60%'}
            width={'80%'}
            color="#c4c4c4"
          />
          <div className="relative h-[220px] w-[160px] overflow-hidden lg:h-[476px] lg:w-[343px]">
            <Image
              className="object-cover"
              fill
              alt={'about-left'}
              src={data.images[0]?.image.url as string}
            />
          </div>
          <div className="absolute left-[70%] top-[35%] h-[108px] w-[81px] overflow-hidden rounded-full lg:left-[50%] lg:h-[234px] lg:w-[175px]">
            <Image
              className="object-cover"
              fill
              alt={'about-left'}
              src={data.images[1]?.image.url as string}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-12 lg:w-[65%] lg:gap-20 ">
          <div className="z-1 bottom-0 flex w-1/2 text-2xl text-secondary lg:-ml-20 lg:items-center lg:justify-center lg:gap-4 lg:text-5xl">
            {data.title}
          </div>
          <div>
            <Link href={`/collections/${data.handle}`} className="mb-8 flex justify-end">
              <Button variant="secondary" className="mt-8 gap-2 font-serif lg:mt-12">
                Shop all
                <MoveRightIcon />
              </Button>
            </Link>
            <ul className="no-scrollbar flex justify-end gap-8">
              {products?.slice(0, 2).map((product) => (
                <li
                  key={product.handle}
                  className="mb-24 aspect-[4/5] max-h-[386px] min-h-[195px] w-[50%] min-w-[163px] max-w-[278px]  lg:w-[25%]"
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
                  className="mb-24 aspect-[4/5] max-h-[386px] min-h-[195px] w-[50%] min-w-[163px] max-w-[278px]  lg:w-[25%]"
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
      </div>
    </div>
  );
};
