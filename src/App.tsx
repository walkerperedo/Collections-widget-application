import "./assets/main.css"
import { ProductGrid } from './components/ProductGrid/ProductGrid';
import { useProducts } from './hooks/useProducts';

interface AppProps {
  storefrontApiToken: string;
  storeUrl: string;
  collectionHandle: string;
}

const App: React.FC<AppProps> = () => {
  const storeUrl = "deliverydatetesttech.myshopify.com"
  const collectionId = "gid://shopify/Collection/276014923913";
  const storefrontApiToken = "13ba02d226b474421f69933ac5bbe93e";
  const { products, loading, error} = useProducts(collectionId, storefrontApiToken, storeUrl);

  return (
    <div className="product-collection-widget">
      {/* <aside className="filter-sidebar">
        <FilterPanel
          activeFilters={activeFilters}
          onFilterChange={setActiveFilters}
        />
      </aside> */}
      <main className="product-list-container">
        {/* We would also add a SortDropdown component here */}
        {error && <p className="error-message">{error}</p>}
        <ProductGrid products={products} loading={loading} />
        {/* A button or intersection observer would call loadMore */}
      </main>
    </div>
  )
}

export default App
