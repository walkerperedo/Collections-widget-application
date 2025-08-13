import { createStorefrontApiClient } from '@shopify/storefront-api-client'
import { GET_PRODUCTS_IN_COLLECTION_QUERY } from './queries'
import type { ActiveFilters } from '../types/shopify'

export async function fetchProductsFromShopify(
  storeUrl: string,
  apiToken: string,
  collectionId: string,
  sortKey: string,
  reverse: boolean,
  activeFilters: ActiveFilters[]
) {
  const client = createStorefrontApiClient({
    storeDomain: storeUrl,
    apiVersion: '2025-07',
    publicAccessToken: apiToken,
  })

  try {
    const variables = {
      variables: {
        collectionId,
        first: 9,
        reverse,
        sortKey,
        activeFilters,
      },
    }

    const { errors, data } = await client.request(GET_PRODUCTS_IN_COLLECTION_QUERY, variables)

    if (errors) {
      console.error(errors)
      throw new Error('Failed to fetch products from Shopify.')
    }

    return data.collection.products
  } catch {
    throw new Error('Could not fetch products.')
  }
}
