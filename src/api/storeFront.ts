import { GraphQLClient } from 'graphql-request';
import { GET_PRODUCTS_IN_COLLECTION_QUERY } from './queries';
import type { ShopifyProductResponse } from '../types/shopify';

export async function fetchProductsFromShopify(
  storeUrl: string,
  apiToken: string,
  collectionHandle: string,
) {
  const endpoint = `${storeUrl}/api/2023-10/graphql.json`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      'X-Shopify-Storefront-Access-Token': apiToken,
    },
  });

  try {
    const variables = {
      handle: collectionHandle,
    };
    
    const data: ShopifyProductResponse = await client.request(
      GET_PRODUCTS_IN_COLLECTION_QUERY,
      variables
    );
    
    return data.collection.products;
  } catch (error) {
    console.error("Error fetching Shopify products:", error);
    throw new Error("Could not fetch products.");
  }
}