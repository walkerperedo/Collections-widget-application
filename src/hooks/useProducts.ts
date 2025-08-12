import { useState, useEffect, useCallback } from 'react';
import type { Product, ActiveFilters } from '../types/shopify';
import { fetchProductsFromShopify } from '../api/storeFront';

export function useProducts(collectionHandle: string, apiToken: string, storeUrl: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({ brand: [], productType: [] });

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const productData = await fetchProductsFromShopify(
        storeUrl,
        apiToken,
        collectionHandle
      );
      setProducts(prev => [...prev, ...productData.nodes]); // Append new products for infinite scroll
    } catch {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, [collectionHandle, apiToken, storeUrl, activeFilters]);

  useEffect(() => {
    setProducts([]);
    loadProducts();
  }, [activeFilters /*, sortKey */]);

  return {
    products,
    loading,
    error,
    activeFilters,
    setActiveFilters,
    loadMore: loadProducts
  };
}