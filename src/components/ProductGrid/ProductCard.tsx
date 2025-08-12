import React from 'react'
import type { Product } from '../../types/shopify'
import './productCard.css'

interface ProductCardProps {
	product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const productUrl = `/products/${product.handle}`

	const images = product.media?.nodes || []
	const firstImage = images[0]?.previewImage.url
	const secondImage = images[1]?.previewImage.url

	return (
		<a href={productUrl} className="product-card">
			<div className="product-card-image-wrapper">
				{firstImage && <img src={firstImage} alt={product.title} loading="lazy" className="first-image" />}
				{secondImage && <img src={secondImage} alt={`${product.title} - alternate view`} loading="lazy" className="second-image" />}
			</div>
			<div className="product-card-info">
				<p className="product-vendor">{product.vendor}</p>
				<h3 className="product-title">{product.title}</h3>
				<p className="product-price">
					{new Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: product.priceRange.minVariantPrice.currencyCode,
					}).format(parseFloat(product.priceRange.minVariantPrice.amount))}
				</p>
			</div>
		</a>
	)
}

export default React.memo(ProductCard)
