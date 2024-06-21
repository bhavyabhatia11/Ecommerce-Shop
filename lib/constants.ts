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
  [key: string]: string | null;
};

export const STONE_COLORS: StoneColors = {
  Amethyst: '#6A2198',
  Aquamarine: '#85B7BD',
  'Blue topaz': '#4B98C0',
  Carnelian: '#C73817',
  Citrine: '#FFE311',
  Diamond: null,
  'Lapis Lazuli': '#15317E',
  Malachite: '#3C7A6E',
  Moonstone: null,
  Onyx: null,
  Pearl: null,
  Peridot: '#819448',
  Prasiolie: '#9AB7A1',
  Tourmaline: null
};

export const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://somethingsimple.vercel.app`
  : 'http://localhost:8080';

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2023-01/graphql.json';

export function toHTML(content: string) {
  const parsed = JSON.parse(content);
  let html = '';
  parsed.children.forEach((node: any) => {
    switch (node.type) {
      case 'heading':
        html += `<h${node.level}>${node.children[0].value}</h${node.level}>`;
        break;
      case 'list':
        html += `<${node.listType === 'unordered' ? 'ul' : 'ol'}>`;
        node.children.forEach((item: any) => {
          html += `<li>${item.children[0].value}</li>`;
        });
        html += `<${node.listType === 'unordered' ? '/ul' : '/ol'}>`;
        break;
      case 'paragraph':
        html += `<p>`;
        node.children.forEach((item: any) => {
          if (item.type === 'text' && item.bold) {
            html += `<strong>${item.value}</strong>` + ' ';
          } else if (item.type === 'text' && item.italic) {
            html += `<em>${item.value}</em>` + ' ';
          } else if (item.type === 'text') {
            html += `${item.value}` + ' ';
          }
          if (item.type === 'link' && item.bold) {
            html +=
              `<a href="${item.url}" target="${item.target}"><strong>${item.children[0].value}</strong></a>` +
              ' ';
          } else if (item.type === 'link' && item.italic) {
            html +=
              `<a href="${item.url}" target="${item.target}"><em>${item.children[0].value}</em></a>` +
              ' ';
          } else if (item.type === 'link') {
            html +=
              `<a href="${item.url}" target="${item.target}">${item.children[0].value}</a>` + ' ';
          }
        });
        html += `</p>`;
        break;
    }
  });
  return html;
}
