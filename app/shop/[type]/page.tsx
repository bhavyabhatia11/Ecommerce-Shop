import Grid from 'components/grid';
import CollectionGridItems from 'components/layout/collection-grid-items';
import { humanizeString } from 'components/utils';
import { getCollections } from 'lib/shopify';

// export const runtime = 'edge';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};

export default async function CollectionListPage({ params }: { params?: { type: string } }) {
  const collection_type = params?.type;
  const collections = await getCollections(collection_type);

  return (
    <>
      <div className="mb-4 flex w-full flex-row items-center justify-between">
        <div className="text-2xl lg:text-5xl">
          {collections.length === 0
            ? 'There are no collections that match!'
            : humanizeString(collection_type || 'all') ?? 'All collections'}
        </div>
      </div>
      {collections.length > 0 ? (
        <Grid className="xs:grid-cols-1 grid-cols-1 md:grid-cols-2">
          <CollectionGridItems collections={collections} />
        </Grid>
      ) : null}
    </>
  );
}
