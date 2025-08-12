import { gql } from 'graphql-request';

export const GET_PRODUCTS_IN_COLLECTION_QUERY = gql`
  query getProductsInCollection(
    $handle: String!
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $filters: [ProductFilter!]
    $first: Int!
    $after: String
  ) {
    collection(handle: $handle) {
      products(
        first: $first
        after: $after
        sortKey: $sortKey
        reverse: $reverse
        filters: $filters
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          title
          handle
          priceRangeV2 {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          media(first: 2) {
            nodes {
              preview {
                image {
                  url
                  id
                }
              }
            }
          }
          vendor
          productType
        }
      }
    }
  }
`;