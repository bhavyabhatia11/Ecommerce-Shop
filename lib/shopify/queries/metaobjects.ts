export const getMetaObjectsQuery = /* GraphQL */ `
  query getMetaObjects($handle: String!) {
    metaobjects(type: $handle, first: 10) {
      edges {
        node {
          id
          handle
          type
          fields {
            key
            value
          }
        }
      }
    }
  }
`;
