import { useState } from 'react'
import { ProductGrid } from './components/ProductGrid/ProductGrid'
import { SortDropdown } from './components/Sort/SortDropdown'
import { useProducts } from './hooks/useProducts'
import { shopifyConfig } from './shopify.config'
import { FilterPanel } from './components/Filters/FilterPanel'
import './assets/main.css'

interface AppProps {
  collectionId: string
}

const App: React.FC<AppProps> = ({ collectionId }) => {
  const collectionIdFormatted = `gid://shopify/Collection/${collectionId}`
  const [sortOption, setSortOption] = useState('price-asc')

  const sortKey = 'PRICE'
  const reverse = sortOption === 'price-desc'

  const { products, loading, error, filters, setActiveFilters } = useProducts(
    collectionIdFormatted,
    shopifyConfig.apiToken,
    shopifyConfig.storeUrl,
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
        {/* A button or intersection observer would call loadMore */}
      </main>
    </div>
  )
}

export default App
