import { useState } from 'react'
import { ProductGrid } from './components/ProductGrid/ProductGrid'
import { SortDropdown } from './components/Sort/SortDropdown'
import { useProducts } from './hooks/useProducts'
import { shopifyConfig } from './shopify.config'
import { FilterPanel } from './components/Filters/FilterPanel'
import './assets/main.css'

interface AppProps {
  storefrontApiToken: string
  storeUrl: string
  collectionHandle: string
}

const App: React.FC<AppProps> = () => {
  const [sortOption, setSortOption] = useState('price-asc')

  const sortKey = 'PRICE'
  const reverse = sortOption === 'price-desc'

  const { products, loading, error, filters, setActiveFilters } = useProducts(
    shopifyConfig.collectionId,
    shopifyConfig.apiToken,
    shopifyConfig.storeUrl,
    sortKey,
    reverse
  )

  return (
    <div className="product-collection-widget">
      <FilterPanel filters={filters} setActiveFilters={setActiveFilters} />
      <main className="product-list-container">
        <SortDropdown value={sortOption} onChange={setSortOption} />
        {error && <p className="error-message">{error}</p>}
        <ProductGrid products={products} loading={loading} />
        {/* A button or intersection observer would call loadMore */}
      </main>
    </div>
  )
}

export default App
