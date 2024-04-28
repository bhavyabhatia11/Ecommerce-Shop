export const getMetaObjectsQuery = /* GraphQL */ `
  query getMetaObjects($type: String!) {
    metaobjects(type: $type, first: 10) {
      edges {
        node {
          id
          handle
          fields {
            key
            value
            type
            references(first: 10) {
              edges {
                node {
                  ... on MediaImage {
                    image {
                      originalSrc
                    }
                  }
                  ... on Collection {
                    handle
                    title
                    description
                    updatedAt
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getMetaObjectQuery = /* GraphQL */ `
  query getMetaObject($id: ID!) {
    metaobject(id: $id) {
      id
      handle
      type
      fields {
        key
        value
      }
    }
  }
`;
