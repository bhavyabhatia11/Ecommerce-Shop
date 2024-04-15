import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { humanizeString } from 'components/utils';
import { defaultSort, sorting } from 'lib/constants';

export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`
  };
}

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });
  const itemsText = products.length > 1 ? 'Items' : 'Item';

  return (
    <section>
      <div className="mb-4 flex w-full flex-row items-center justify-between">
        <div className="font-serif text-5xl">
          {products.length === 0
            ? 'No products found in this collection '
            : humanizeString(params.collection)}{' '}
        </div>
        <div className="font-serif text-2xl">
          {products.length} {itemsText}
        </div>
      </div>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}
