import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getFilters, getProducts } from 'lib/shopify';
import Filters from './filters';

export const runtime = 'edge';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};

export default async function SearchPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const {
    sort,
    q: searchValue,
    min: minPrice,
    max: maxPrice,
    stones: stonesString
  } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const stones = stonesString ? stonesString.split(',').filter(Boolean) : [];
  const products = await getProducts({
    sortKey,
    reverse,
    query: searchValue,
    minPrice,
    maxPrice,
    stones
  });
  const filters = await getFilters();
  const resultsText = products.length > 1 ? 'Results' : 'Result';
  const itemsText = products.length > 1 ? 'Items' : 'Item';

  return (
    <>
      <div className="mb-4 flex w-full flex-row items-center justify-between">
        <div className="font-serif text-5xl">{searchValue ?? 'All'}</div>
        <div className="font-serif text-2xl">
          {products.length} {searchValue ? resultsText : itemsText}
        </div>
      </div>
      <Filters filters={filters} />
      {products.length > 0 ? (
        <Grid className="xs:grid-cols-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProductGridItems products={products} />
        </Grid>
      ) : (
        <p className="py-3 font-serif text-3xl">
          {searchValue
            ? 'No products matching to the filter, please remove & try again.'
            : 'No products found. Please try again.'}
        </p>
      )}
    </>
  );
}
