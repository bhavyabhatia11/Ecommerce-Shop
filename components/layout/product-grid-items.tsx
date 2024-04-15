import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import Label from 'components/label';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn h-400px">
          <Link className="relative h-full w-full" href={`/product/${product.handle}`}>
            <GridTileImage
              alt={product.title}
              src={product.featuredImage?.url}
              fill
              sizes="(min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw"
              isInteractive={false}
            />
          </Link>
          <Label
            title={product.title}
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            position="bottom"
          />
        </Grid.Item>
      ))}
    </>
  );
}
