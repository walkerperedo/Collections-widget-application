import React from 'react';
import type { Product } from '../../types/shopify';
import ProductCard  from './ProductCard';
// import { SkeletonLoader } from '../UI/SkeletonLoader';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
      {/* {loading && Array.from({ length: 6 }).map((_, i) => <SkeletonLoader key={i} />)} */}
    </div>
  );
};