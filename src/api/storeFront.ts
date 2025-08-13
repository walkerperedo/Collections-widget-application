import { createStorefrontApiClient } from '@shopify/storefront-api-client'
import { GET_PRODUCTS_IN_COLLECTION_QUERY } from './queries'
import type { ActiveFilters } from '../types/shopify'

export async function fetchProductsFromShopify(
  storeUrl: string,
  apiToken: string,
  collectionId: string,
  sortKey: string,
  reverse: boolean,
  activeFilters: ActiveFilters[],
  afterCursor?: string | null
) {
  const client = createStorefrontApiClient({
    storeDomain: storeUrl,
    apiVersion: '2025-07',
    publicAccessToken: apiToken,
  })

  try {
    const variables = {
      collectionId,
      first: 9,
      reverse,
      sortKey,
      activeFilters,
      after: afterCursor ?? null,
    }

    const { errors, data } = await client.request(GET_PRODUCTS_IN_COLLECTION_QUERY, { variables })

    if (errors) {
      console.error(errors)
      throw new Error('Failed to fetch products from Shopify.')
    }

    const productsData = data.collection.products

    return {
      nodes: productsData.nodes,
      filters: productsData.filters,
      hasNextPage: productsData.pageInfo.hasNextPage,
      endCursor: productsData.pageInfo.endCursor,
    }
  } catch {
    throw new Error('Could not fetch products.')
  }
}
