import { useState, useEffect, useCallback } from 'react'
import type { Product, ActiveFilters, ProductFilter } from '../types/shopify'
import { fetchProductsFromShopify } from '../api/storeFront'

export function useProducts(collectionId: string, apiToken: string, storeUrl: string, sortKey: string, reverse: boolean) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ProductFilter[]>([])
  const [activeFilters, setActiveFilters] = useState<ActiveFilters[]>([
    { productType: undefined },
    { productVendor: undefined },
    { available: undefined },
  ])

  const loadProducts = useCallback(
    async (append: boolean = true) => {
      setLoading(true)
      setError(null)
      try {
        const productData = await fetchProductsFromShopify(storeUrl, apiToken, collectionId, sortKey, reverse, activeFilters)
        const filterNew = productData.filters.filter((filter: ProductFilter) => !filter.id.includes('price'))
        setFilters(filterNew || [])
        setProducts((prev) => (append ? [...prev, ...productData.nodes] : productData.nodes))
      } catch (err) {
        console.error(err)
        setError('Failed to load products.')
      } finally {
        setLoading(false)
      }
    },
    [storeUrl, apiToken, collectionId, sortKey, reverse, activeFilters]
  )

  useEffect(() => {
    loadProducts(false)
  }, [activeFilters, loadProducts])

  return {
    products,
    loading,
    error,
    filters,
    activeFilters,
    setActiveFilters,
    loadMore: () => loadProducts(true),
  }
}
