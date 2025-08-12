import './App.css'
import { ProductGrid } from './components/ProductGrid/ProductGrid';
import { useProducts } from './hooks/useProducts';

interface AppProps {
  storefrontApiToken: string;
  storeUrl: string;
  collectionHandle: string;
}

const App: React.FC<AppProps> = ({ storefrontApiToken, storeUrl, collectionHandle }) => {
  const { products, loading, error} = useProducts(collectionHandle, storefrontApiToken, storeUrl);

  return (
    <div className="product-collection-widget">

      <main className="product-list-container">
        {error && <p className="error-message">{error}</p>}
        <ProductGrid products={products} loading={loading} />
      </main>
    </div>
  )
}

export default App
