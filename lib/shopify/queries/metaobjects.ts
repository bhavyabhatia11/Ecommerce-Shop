import imageFragment from '../fragments/image';

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
            reference {
              ... on MediaImage {
                image {
                  ...image
                }
              }
              ... on Collection {
                handle
              }
            }
            references(first: 10) {
              edges {
                node {
                  ... on MediaImage {
                    image {
                      url
                    }
                  }
                  ... on Collection {
                    handle
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${imageFragment}
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
