import { getCollection, getCollectionProducts, getFilters } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { humanizeString } from 'components/utils';
import { defaultSort, sorting } from 'lib/constants';
import Filters from '../filters';

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
  const {
    sort,
    min: minPrice,
    max: maxPrice,
    stones: stonesString
  } = searchParams as { [key: string]: string };
  const stones = stonesString ? stonesString.split(',').filter(Boolean) : [];
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({
    collection: params.collection,
    sortKey,
    reverse,
    minPrice,
    maxPrice,
    stones
  });
  const filters = await getFilters();
  const itemsText = products.length > 1 ? 'Items' : 'Item';

  return (
    <section>
      <div className="mb-4 flex w-full flex-row items-center justify-between">
        <div className="font-serif text-5xl">{humanizeString(params.collection)}</div>
        <div className="font-serif text-2xl">
          {products.length} {itemsText}
        </div>
      </div>
      <Filters filters={filters} />
      {products.length === 0 ? (
        <p className="py-3 font-serif text-3xl">{`No products found in this collection`}</p>
      ) : (
        <Grid className="xs:grid-cols-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}
