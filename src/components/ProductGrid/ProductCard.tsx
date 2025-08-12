import React from 'react';
import type { Product } from '../../types/shopify';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productUrl = `/products/${product.handle}`;

  return (
    <a href={productUrl} className="product-card">
      <div className="product-card-image-wrapper">
        <img src={product.image.url} alt={product.image.altText || product.title} />
      </div>
      <div className="product-card-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">
          ${parseFloat(product.price.amount).toFixed(2)}
        </p>
      </div>
    </a>
  );
};

export default React.memo(ProductCard);