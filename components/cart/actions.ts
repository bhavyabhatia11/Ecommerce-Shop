'use server';

import { TAGS } from 'lib/constants';
import {
  addGiftNoteToCart,
  addToCart,
  createCart,
  createCustomer,
  getCart,
  removeFromCart,
  updateCart
} from 'lib/shopify';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function addItem(
  prevState: any,
  payload: { selectedVariantId: string | undefined; giftWrap?: boolean }
) {
  const { selectedVariantId, giftWrap } = payload;

  let cartId = cookies().get('cartId')?.value;
  let cart;

  if (giftWrap) {
    cookies().set('giftWrap', 'true');
  } else {
    cookies().set('giftWrap', 'false');
  }

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.id;
    cookies().set('cartId', cartId);
  }

  if (!selectedVariantId) {
    return 'Missing product variant ID';
  }

  try {
    await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity: 1 }]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error adding item to cart';
  }
}

export async function removeItem(prevState: any, lineId: string) {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  try {
    await removeFromCart(cartId, [lineId]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    lineId: string;
    variantId: string;
    quantity: number;
  }
) {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  const { lineId, variantId, quantity } = payload;

  try {
    if (quantity === 0) {
      await removeFromCart(cartId, [lineId]);
      revalidateTag(TAGS.cart);
      return;
    }

    await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity
      }
    ]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error updating item quantity';
  }
}

export async function addCustomer(email: string) {
  try {
    await createCustomer({
      acceptsMarketing: true,
      email: email,
      password: 'password'
    });
  } catch (e) {
    return 'Error updating item quantity';
  }
}

export async function addGiftNote(note: string) {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  if (note.length > 0) {
    try {
      await addGiftNoteToCart(cartId, note);
    } catch (e) {
      return 'Error sending gift note';
    }
  }
}
