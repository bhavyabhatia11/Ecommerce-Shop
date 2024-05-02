import { HIDDEN_PRODUCT_TAG, SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from 'lib/constants';
import { isShopifyError } from 'lib/type-guards';
import { ensureStartsWith } from 'lib/utils';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  addToCartMutation,
  cartGiftNoteMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation
} from './mutations/cart';
import { getCartQuery } from './queries/cart';
import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery
} from './queries/collection';
import { getMenuQuery } from './queries/menu';
import { getPageQuery, getPagesQuery } from './queries/page';
import {
  getProductFiltersQuery,
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery
} from './queries/product';

import { getMetaObjectsQuery } from './queries/metaobjects';

import { createCustomerMutation } from './mutations/customer';
import {
  Cart,
  Collection,
  Connection,
  Image,
  Menu,
  Page,
  Product,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyCreateCartOperation,
  ShopifyCreateCustomerOperation,
  ShopifyGiftNoteCartOperation,
  ShopifyMenuItem,
  ShopifyMenuOperation,
  ShopifyMetaObject,
  ShopifyMetaObjectOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation
} from './types';

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
  : '';
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function shopifyFetch<T>({
  cache = 'no-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw {
      error: e,
      query
    };
  }
}

const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge) => edge?.node);
};

const reshapeMetaObject = (metaobject: ShopifyMetaObject) => {
  if (!metaobject) {
    return undefined;
  }
  const fields = metaobject.fields.reduce((acc: any, field) => {
    acc[field.key] = field.value;
    if (field.reference) {
      Object.assign(acc, field.reference);
    }
    return acc;
  }, {});

  return fields;
};

interface ReshapedMenuItem {
  title: string;
  path: string;
  items: ReshapedMenuItem[];
}

const reshapeMenu = (items: ShopifyMenuItem[] | undefined): ReshapedMenuItem[] => {
  const reshapedMenuItems: ReshapedMenuItem[] = [];
  if (items) {
    for (const item of items) {
      if (item) {
        reshapedMenuItems.push({
          title: item.title,
          path: item.url.replace(domain, '').replace('/pages', ''),
          items: reshapeMenu(item.items)
        });
      }
    }
  }
  return reshapedMenuItems;
};

const reshapeMetaObjects = (metaobjects: ShopifyMetaObject[]) => {
  const reshapedMetaObjects = [];

  for (const metaobject of metaobjects) {
    if (metaobject) {
      const reshapedMetaObject = reshapeMetaObject(metaobject);

      if (reshapedMetaObject) {
        reshapedMetaObjects.push(reshapedMetaObject);
      }
    }
  }

  return reshapedMetaObjects;
};
const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: 'INR'
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines)
  };
};

const reshapeCollection = (collection: ShopifyCollection): Collection | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    path: `/collections/${collection.handle}`,
    type: collection?.metafield?.value || ''
  };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    };
  });
};

const reshapeProduct = (product: ShopifyProduct, filterHiddenProducts: boolean = true) => {
  if (!product || (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants)
  };
};

const reshapeProducts = (
  products: ShopifyProduct[],
  minPrice: string | undefined = undefined,
  maxPrice: string | undefined = undefined,
  stones: string[] | undefined = undefined
) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        const minPriceFilter =
          parseInt(reshapedProduct.priceRange.minVariantPrice.amount) >=
          (minPrice ? parseInt(minPrice) : 0);
        const maxPriceFilter =
          parseInt(reshapedProduct.priceRange.maxVariantPrice.amount) <=
          (maxPrice ? parseInt(maxPrice) : Number.MAX_SAFE_INTEGER);
        let hasStones = true;
        if (stones && stones.length > 0) {
          const stonesArray = JSON.parse(reshapedProduct?.stones?.value || '[]') as string[];
          hasStones = stones.some((elem) => stonesArray.includes(elem));
        }

        if (minPriceFilter && maxPriceFilter && hasStones) {
          reshapedProducts.push(reshapedProduct);
        }
      }
    }
  }

  return reshapedProducts;
};

const reshapeFilters = (products: ShopifyProduct[]) => {
  const priceRange = { min: Number.MAX_SAFE_INTEGER, max: 0 };
  const stonesSet = new Set();

  for (const product of products) {
    if (product) {
      const minAmount = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2);
      const maxAmount = parseFloat(product.priceRange.maxVariantPrice.amount).toFixed(2);

      priceRange.min = Math.min(parseFloat(minAmount), priceRange.min);
      priceRange.max = Math.max(parseFloat(maxAmount), priceRange.max);

      const stonesArray = JSON.parse(product?.stones?.value || '[]') as string[];
      stonesArray.forEach((stone) => {
        stonesSet.add(stone);
      });
    }
  }

  const stones = Array.from(stonesSet);
  return { priceRange, stones };
};

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: 'no-store'
  });
  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function addGiftNoteToCart(cartId: string, note: string): Promise<Cart> {
  const res = await shopifyFetch<ShopifyGiftNoteCartOperation>({
    query: cartGiftNoteMutation,
    variables: {
      cartId,
      note
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function createCustomer(input: any): Promise<String> {
  await shopifyFetch<ShopifyCreateCustomerOperation>({
    query: createCustomerMutation,
    variables: {
      input
    },
    cache: 'no-store'
  });

  return 'done';
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
    tags: [TAGS.cart],
    cache: 'no-store'
  });

  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart);
}

export async function getCollection(handle: string): Promise<Collection | undefined> {
  const res = await shopifyFetch<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    tags: [TAGS.collections],
    variables: {
      handle
    }
  });

  return reshapeCollection(res.body.data.collection);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
  minPrice,
  maxPrice,
  stones
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
  minPrice?: string;
  maxPrice?: string;
  stones?: string[];
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: {
      handle: collection,
      reverse,
      sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey
    }
  });

  if (!res.body.data.collection) {
    console.log(`No collection found for \`${collection}\``);
    return [];
  }

  return reshapeProducts(
    removeEdgesAndNodes(res.body.data.collection.products),
    minPrice,
    maxPrice,
    stones
  );
}

export async function getCollections(type = ''): Promise<Collection[]> {
  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
    tags: [TAGS.collections]
  });
  const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);
  const collections = [
    ...reshapeCollections(shopifyCollections).filter((collection) => {
      if (!type || type == 'all') {
        return true;
      }
      return collection.type.startsWith(type);
    })
  ] as Collection[];

  return collections;
}

export async function getMenu(handle: string): Promise<Menu[]> {
  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: {
      handle
    }
  });

  return reshapeMenu(res.body?.data?.menu?.items) || [];
}

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle }
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery
  });

  return removeEdgesAndNodes(res.body.data.pages);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    tags: [TAGS.products],
    variables: {
      handle
    }
  });
  return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    tags: [TAGS.products],
    variables: {
      productId
    }
  });

  return reshapeProducts(res.body.data.productRecommendations);
}

export async function getProducts({
  query,
  reverse,
  sortKey,
  minPrice,
  maxPrice,
  stones
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
  minPrice?: string;
  maxPrice?: string;
  stones?: string[];
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    tags: [TAGS.products],
    variables: {
      query,
      reverse,
      sortKey
    }
  });
  return reshapeProducts(removeEdgesAndNodes(res.body.data.products), minPrice, maxPrice, stones);
}

export async function getFilters(): Promise<{
  priceRange: { min: number; max: number };
  stones: unknown[];
}> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductFiltersQuery,
    tags: [TAGS.products]
  });
  return reshapeFilters(removeEdgesAndNodes(res.body.data.products));
}

export async function getMetaObjects(type: string): Promise<any> {
  const res = await shopifyFetch<ShopifyMetaObjectOperation>({
    query: getMetaObjectsQuery,
    tags: [TAGS.meta],
    variables: {
      type
    }
  });

  return reshapeMetaObjects(removeEdgesAndNodes(res.body.data.metaobjects));
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = ['collections/create', 'collections/delete', 'collections/update'];
  const productWebhooks = ['products/create', 'products/delete', 'products/update'];
  const topic = headers().get('x-shopify-topic') || 'unknown';
  const secret = req.nextUrl.searchParams.get('secret');
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error('Invalid revalidation secret.');
    return NextResponse.json({ status: 200 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections);
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products);
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
