import { createStorefrontApiClient } from '@shopify/storefront-api-client'
import { GET_PRODUCTS_IN_COLLECTION_QUERY } from './queries'
import type { ActiveFilters } from '../types/shopify'
import { newConfig } from '../main'

export async function fetchProductsFromShopify(
  sortKey: string,
  reverse: boolean,
  activeFilters: ActiveFilters[],
  afterCursor?: string | null
) {

  const client = createStorefrontApiClient({
    storeDomain: newConfig.storeUrl,
    apiVersion: '2025-07',
    publicAccessToken: newConfig.apiToken,
  })

  try {
    const variables = {
      collectionId: newConfig.collectionId,
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
