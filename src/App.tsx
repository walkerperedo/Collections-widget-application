import { useState } from 'react'
import { ProductGrid } from './components/ProductGrid/ProductGrid'
import { SortDropdown } from './components/Sort/SortDropdown'
import { useProducts } from './hooks/useProducts'
import { FilterPanel } from './components/Filters/FilterPanel'
import { InfiniteScrollTrigger } from './components/UI/InfiniteScrollTrigger'
import './assets/main.css'

const App = () => {
  const [sortOption, setSortOption] = useState('price-asc')

  const sortKey = 'PRICE'
  const reverse = sortOption === 'price-desc'

  const { products, loading, error, filters, setActiveFilters, loadMore, hasNextPage } = useProducts(
    sortKey,
    reverse
  )

  return (
    <div className="product-collection-widget">
      <div className="filter-sort-controls">
        <FilterPanel filters={filters} setActiveFilters={setActiveFilters} />
        <SortDropdown value={sortOption} onChange={setSortOption} />
      </div>
      <main className="product-list-container">
        {error && <p className="error-message">{error}</p>}
        <ProductGrid products={products} loading={loading} />
        {loading && products.length > 0 && <p>Loading more products…</p>}
        {hasNextPage && <InfiniteScrollTrigger onLoadMore={loadMore} hasNextPage={hasNextPage} loading={loading} />}
        {!hasNextPage && !loading && products.length > 0 && <p className='product-list-message'>No more products to load.</p>}
      </main>
    </div>
  )
}

export default App
