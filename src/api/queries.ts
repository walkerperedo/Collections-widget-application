import { gql } from 'graphql-request'

export const GET_PRODUCTS_IN_COLLECTION_QUERY = gql`
  query getProductsInCollection(
    $collectionId: ID!
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $first: Int!
    $after: String
    $activeFilters: [ProductFilter!]
  ) {
    collection(id: $collectionId) {
      products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse, filters: $activeFilters) {
        pageInfo {
          hasNextPage
          endCursor
        }
        filters {
          id
          label
          values {
            id
            label
            input
          }
        }
        nodes {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          media(first: 2) {
            nodes {
              previewImage {
                url
                id
              }
            }
          }
          vendor
          productType
        }
      }
    }
  }
`
