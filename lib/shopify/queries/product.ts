import { filterFragment, productFragment } from '../fragments/product';

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;
// filters: [ {price: { min: 0.0 , max: 500.0 }}, {	productMetafield:{
//   namespace:"custom",
//   key:"stones",
//   value:"Ruby"
// }} ],
export const getProductsQuery = /* GraphQL */ `
  query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductFiltersQuery = /* GraphQL */ `
  query getProducts {
    products(first: 100) {
      edges {
        node {
          ...filter
        }
      }
    }
  }
  ${filterFragment}
`;

export const getProductRecommendationsQuery = /* GraphQL */ `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`;
