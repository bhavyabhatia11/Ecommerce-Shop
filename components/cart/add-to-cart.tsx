'use client';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import LoadingDots from 'components/loading-dots';
import { ProductVariant } from 'lib/shopify/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

const buttonClasses =
  'relative flex items-center justify-center p-4 w-full lg:text-lg text-base font-serif tracking-wider';
const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60 text-lg font-serif';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const { pending } = useFormStatus();

  if (!availableForSale) {
    return (
      <Button
        aria-disabled
        className={clsx(buttonClasses, disabledClasses)}
        variant="beige-dark"
        size="lg"
      >
        Out Of Stock
      </Button>
    );
  }

  if (!selectedVariantId) {
    return (
      <Button
        aria-label="Please select an option"
        aria-disabled
        className={clsx(buttonClasses, disabledClasses)}
        variant="beige-dark"
        size="lg"
      >
        Add To Cart
      </Button>
    );
  }

  return (
    <>
      <Button
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          if (pending) e.preventDefault();
        }}
        aria-label="Add to cart"
        aria-disabled={pending}
        className={clsx(buttonClasses, {
          disabledClasses: pending
        })}
        variant="beige-dark"
        size="lg"
      >
        <div className="">
          {pending ? <LoadingDots className="mb-3 bg-white" /> : 'Add To Cart'}
        </div>
      </Button>
    </>
  );
}

export async function AddToCart({
  variants,
  availableForSale
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const [, formAction] = useFormState(addItem, null);
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);
  const router = useRouter();

  const generateBuyNowLink = () => {
    if (!selectedVariantId) return;
    const parts = selectedVariantId.split('/');
    const variantId = parts[parts.length - 1];
    router.push(`https://some-thing-simple.myshopify.com/cart/${variantId}:1`);
  };

  return (
    <div className="flex flex-col justify-center gap-4 lg:flex-row">
      {availableForSale && selectedVariantId && (
        <Button
          onClick={generateBuyNowLink}
          aria-label="Add to cart"
          aria-disabled={!selectedVariantId || !availableForSale}
          className={clsx(buttonClasses, {
            disabledClasses: !selectedVariantId
          })}
          variant="secondary"
          size="lg"
        >
          Buy now
        </Button>
      )}
      <form action={actionWithVariant} className="w-full">
        <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
      </form>
    </div>
  );
}
