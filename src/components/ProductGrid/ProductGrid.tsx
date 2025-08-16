import React from 'react'
import type { Product } from '../../types/shopify'
import ProductCard from './ProductCard'
import { SkeletonLoader } from '../UI/SkeletonLoader'
import './productGrid.css'

interface ProductGridProps {
	products: Product[]
	loading: boolean
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
	return (
		<section className="product-grid" aria-live={loading ? 'polite' : undefined} aria-busy={loading}>
			{loading && products.length === 0
				? Array.from({ length: 6 }).map((_, i) => <SkeletonLoader key={i} />)
				: products.map((product) => <ProductCard key={product.id} product={product} />)}
		</section>
	)
}
