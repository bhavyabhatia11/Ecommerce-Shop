import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { Suspense } from 'react';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col items-start pt-8 text-left lg:mb-6 lg:pt-0">
        <h1 className="mb-2 font-sans text-2xl font-medium lg:my-5 lg:text-[40px] lg:leading-tight">
          {product.title}
        </h1>
        <div className="mb-2 mr-auto w-auto font-serif text-2xl tracking-wider lg:mb-10 lg:text-3xl">
          <Price
            className="font-serif"
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
        {product.descriptionHtml ? (
          <Prose
            className="!mx-0 mb-4 text-left font-serif text-sm text-neutral-500 lg:mb-6 lg:text-base"
            html={product.descriptionHtml}
          />
        ) : null}
      </div>
      <Suspense fallback={null}>
        <VariantSelector options={product.options} variants={product.variants} />
      </Suspense>

      <Suspense fallback={null}>
        <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
      </Suspense>
    </>
  );
}
