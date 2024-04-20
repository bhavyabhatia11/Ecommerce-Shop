import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import Label from 'components/label';
import { Collection } from 'lib/shopify/types';
import Link from 'next/link';

export default function CollectionGridItems({ collections }: { collections: Collection[] }) {
  return (
    <>
      {collections.map((collection) => (
        <Grid.Item key={collection.handle} className="animate-fadeIn aspect-[4/3]">
          <Link
            className="relative inline-block h-full w-full"
            href={`/collections/${collection.handle}`}
          >
            <GridTileImage
              alt={collection.title}
              src={collection.image?.url}
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
          <Label title={collection.title} position="bottom" />
        </Grid.Item>
      ))}
    </>
  );
}
