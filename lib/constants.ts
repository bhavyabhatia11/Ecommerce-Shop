export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
};

export type PriceRangeItem = {
  min?: number;
  max?: number;
  slug: string;
};

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  { title: 'Trending', slug: 'trending-desc', sortKey: 'BEST_SELLING', reverse: false }, // asc
  { title: 'Latest arrivals', slug: 'latest-desc', sortKey: 'CREATED_AT', reverse: true },
  { title: 'Price: Low to high', slug: 'price-asc', sortKey: 'PRICE', reverse: false }, // asc
  { title: 'Price: High to low', slug: 'price-desc', sortKey: 'PRICE', reverse: true }
];

export const priceRange: PriceRangeItem[] = [
  { min: 0, max: 500, slug: 'min=0&max=500' },
  { min: 500, max: 1000, slug: 'min=500&max=1000' },
  { min: 1000, max: 5000, slug: 'min=1000&max=5000' },
  { min: 5000, max: undefined, slug: 'min=5000' }
];

export const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart',
  meta: 'meta'
};

type StoneColors = {
  [key: string]: string;
};

export const STONE_COLORS: StoneColors = {
  Emarald: '#34FC34',
  Ruby: '#FF9920'
};

export const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:8080';

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2023-01/graphql.json';
