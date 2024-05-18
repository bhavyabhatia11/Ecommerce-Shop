import { getCart } from 'lib/shopify';
import { cookies } from 'next/headers';
import CartModal from './modal';

export default async function Cart() {
  const cartId = cookies().get('cartId')?.value;
  const shouldGiftWrap = cookies().get('giftWrap')?.value === 'true';
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  return <CartModal cart={cart} shouldGiftWrap={shouldGiftWrap} />;
}
