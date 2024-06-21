import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { GridTileImage } from 'components/grid/tile';
import JewelleryCare from 'components/icons/jewellery-care';
import Label from 'components/label';
import { Gallery } from 'components/product/gallery';
import { ProductDescription } from 'components/product/product-description';
import Prose from 'components/prose';
import { HIDDEN_PRODUCT_TAG, toHTML } from 'lib/constants';
import { getMetaObjects, getProduct, getProductRecommendations } from 'lib/shopify';
import { Image as ImageType } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';

// export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);
  const policies = await getMetaObjects('policies');
  const jewelleryPolicy = policies.find(
    (policy: { type: string }) => policy.type === 'jewellery_care'
  );

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="mx-auto mt-24 max-w-screen-xl px-4">
        <div className="flex flex-col lg:flex-row lg:gap-8 lg:py-8">
          <div className="h-full w-full basis-2/5 ">
            <Suspense
              fallback={
                <div className="relative aspect-[3/4] h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={product.images.map((image: ImageType) => ({
                  src: image.url,
                  altText: image.altText
                }))}
              />
            </Suspense>
          </div>

          <div className="basis-3/5">
            <ProductDescription product={product} />
          </div>
        </div>

        {product?.info?.value && (
          <div className="item-center my-6 text-lg leading-[3.2rem] lg:my-12 lg:text-[36px]">
            {product.info.value}
          </div>
        )}

        {product?.product_details?.value && (
          <div className="my-6 flex flex-col justify-between font-serif tracking-wider text-neutral-500 lg:my-20 lg:flex-row">
            <div className="mb-4 text-lg lg:mb-0">DESCRIPTION AND DETAILS</div>
            <div className="flex w-full flex-col gap-2 lg:w-[60%]">
              {JSON.parse(product.product_details.value).map((detail: string, index: number) => (
                <div className="border-b border-beige-light pb-4" key={index}>
                  {detail}
                </div>
              ))}
            </div>
          </div>
        )}

        {product.images.length > 2 && (
          <div className="my-4 flex flex-col gap-4 lg:relative lg:left-1/2 lg:mt-20 lg:w-screen lg:-translate-x-1/2 lg:transform lg:flex-row lg:gap-6">
            {product.images.slice(-2).map(
              (
                image,
                index // Added image and index parameters
              ) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] max-h-[533px] w-full overflow-hidden"
                >
                  {' '}
                  {/* Added key prop */}
                  <Image
                    key={index} // Added key prop for the Image component
                    className="object-cover"
                    fill
                    alt={image?.altText as string}
                    src={image?.url as string}
                  />
                </div>
              )
            )}
          </div>
        )}

        <div className="relative left-1/2 flex w-[100vw] w-screen -translate-x-1/2 transform justify-center bg-beige-lighter px-6 lg:mb-16 lg:mt-8 lg:pb-12 lg:pt-4">
          <JewelleryCare />
        </div>

        <div className="flex py-8 lg:mb-12 lg:py-0">
          <div className="flex flex-col gap-8 lg:gap-16">
            <div className="text-lg lg:text-5xl"> {jewelleryPolicy.name}</div>
            <div>
              {' '}
              <Prose
                className="flex flex-col gap-4 font-serif text-sm tracking-wider text-neutral-500 lg:gap-8 lg:text-base"
                html={toHTML(jewelleryPolicy.description) as string}
              />{' '}
            </div>
          </div>
        </div>

        <Suspense>
          <RelatedProducts id={product.id} />
        </Suspense>
      </div>
    </>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="border-t pb-12 pt-8 lg:pt-12">
      <h2 className="mb-4 text-2xl lg:text-4xl">Related Products</h2>

      <ul className="no-scrollbar flex w-full gap-4 overflow-x-auto overflow-y-hidden pt-1 lg:gap-12">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="mb-16 aspect-[4/5] max-h-[386px] min-h-[195px] w-1/2 min-w-[163px] max-w-[278px] flex-none lg:mb-24 lg:w-1/4"
          >
            <Link className="relative h-full w-full" href={`/product/${product.handle}`}>
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
  );
}
