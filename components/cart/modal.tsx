'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Price from 'components/price';
import { DEFAULT_OPTION } from 'lib/constants';
import type { Cart } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { DeleteItemButton } from './delete-item-button';
import { EditItemQuantityButton } from './edit-item-quantity-button';
import OpenCart from './open-cart';

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal({ cart }: { cart: Cart | undefined }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    // Open cart modal when quantity changes.
    if (cart?.totalQuantity !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true);
      }

      // Always update the quantity reference
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <Sheet open={isOpen}>
        <SheetTrigger
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <OpenCart quantity={cart?.totalQuantity} />
        </SheetTrigger>
        <SheetContent
          className="w-full"
          onInteractOutside={() => {
            setIsOpen(false);
          }}
        >
          <SheetHeader>
            <SheetTitle className="hidden text-left font-serif text-2xl font-medium lg:block">
              My Cart
            </SheetTitle>
            <SheetClose
              onClick={() => {
                setIsOpen(false);
              }}
              className="block rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-secondary lg:hidden"
            >
              <X className="h-6 w-6" color="black" />
            </SheetClose>
          </SheetHeader>

          {!cart || cart.lines.length === 0 ? (
            <div className="mt-40 flex w-full flex-col items-center justify-center overflow-hidden font-serif">
              <ShoppingCartIcon className="h-16" />
              <p className="my-6 text-center text-sm lg:text-base">Your cart is empty.</p>
              <SheetClose>
                <Button
                  onClick={() => {
                    router.push('/collections');
                    setIsOpen(false);
                  }}
                  aria-label="Shop products"
                  variant="secondary"
                  className="w-full"
                  size="lg"
                >
                  Shop products
                </Button>
              </SheetClose>
            </div>
          ) : (
            <div className="flex h-full flex-col justify-between overflow-hidden">
              <ul className="flex-grow overflow-auto py-8">
                {cart.lines.map((item, i) => {
                  const merchandiseSearchParams = {} as MerchandiseSearchParams;

                  item.merchandise.selectedOptions.forEach(({ name, value }) => {
                    if (value !== DEFAULT_OPTION) {
                      merchandiseSearchParams[name.toLowerCase()] = value;
                    }
                  });

                  const merchandiseUrl = createUrl(
                    `/product/${item.merchandise.product.handle}`,
                    new URLSearchParams(merchandiseSearchParams)
                  );

                  return (
                    <li key={i} className="flex w-full flex-col border-b font-serif">
                      <div className="relative flex w-full flex-row justify-between py-4">
                        <div className="absolute z-40 -mt-2 ml-[55px]">
                          <DeleteItemButton item={item} />
                        </div>
                        <Link
                          href={merchandiseUrl}
                          onClick={closeCart}
                          className="z-30 flex flex-row space-x-4"
                        >
                          <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border">
                            <Image
                              className="h-full w-full object-cover"
                              width={40}
                              height={40}
                              alt={
                                item.merchandise.product.featuredImage.altText ||
                                item.merchandise.product.title
                              }
                              src={item.merchandise.product.featuredImage.url}
                            />
                          </div>

                          <div className="flex flex-1 flex-col text-base">
                            <span className="text-sm ">{item.merchandise.product.title}</span>
                            {item.merchandise.title !== DEFAULT_OPTION ? (
                              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                {item.merchandise.title}
                              </p>
                            ) : null}
                          </div>
                        </Link>
                        <div className="flex h-16 flex-col justify-between gap-2">
                          <Price
                            className="flex justify-end space-y-2 text-right font-bold"
                            amount={item.cost.totalAmount.amount}
                            currencyCode={item.cost.totalAmount.currencyCode}
                          />
                          <div className="ml-auto flex h-9 flex-row items-center border border-neutral-200 dark:border-neutral-700">
                            <EditItemQuantityButton item={item} type="minus" />
                            <p className="w-6 text-center">
                              <span className="w-full text-sm">{item.quantity}</span>
                            </p>
                            <EditItemQuantityButton item={item} type="plus" />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="py-4 font-serif text-sm">
                <div className="mb-6 flex items-center justify-between border-b pb-1 ">
                  <p>Taxes</p>
                  <Price
                    className="text-right text-sm text-black"
                    amount={cart.cost.totalTaxAmount.amount}
                    currencyCode={cart.cost.totalTaxAmount.currencyCode}
                  />
                </div>
                <div className="mb-6 flex items-center justify-between border-b pb-1 pt-1">
                  <p>Shipping</p>
                  <p className="text-right">Calculated at checkout</p>
                </div>
                <div className="mb-6 flex items-center justify-between border-b pb-1 pt-1">
                  <p>Total</p>
                  <Price
                    className="text-right text-sm font-bold text-black"
                    amount={cart.cost.totalAmount.amount}
                    currencyCode={cart.cost.totalAmount.currencyCode}
                  />
                </div>
              </div>
              <Button
                className="mb-4 w-full py-8 text-center font-serif text-xl text-white "
                variant="secondary"
                size="lg"
              >
                <a href={cart.checkoutUrl}>Proceed to Checkout</a>
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
