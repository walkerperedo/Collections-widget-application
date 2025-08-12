import { useState, useEffect, useCallback } from 'react'
import type { Product, ActiveFilters } from '../types/shopify'
import { fetchProductsFromShopify } from '../api/storeFront'

export function useProducts(collectionId: string, apiToken: string, storeUrl: string) {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [activeFilters, setActiveFilters] = useState<ActiveFilters>({ brand: [], productType: [] })

	const loadProducts = useCallback(
		async (append: boolean = true) => {
			setLoading(true)
			setError(null)
			try {
				const productData = await fetchProductsFromShopify(storeUrl, apiToken, collectionId, activeFilters)
				setProducts((prev) => append ? [...prev, ...productData.nodes]: productData.nodes) // Append new products for infinite scroll
			} catch (err) {
        console.error(err);
				setError('Failed to load products.')
			} finally {
				setLoading(false)
			}
		},
		[collectionId, apiToken, storeUrl, activeFilters]
	)

	useEffect(() => {
		loadProducts(false)
	}, [activeFilters, loadProducts])

	return {
		products,
		loading,
		error,
		activeFilters,
		setActiveFilters,
		loadMore: () => loadProducts(true),
	}
}
