import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ShopifyConfig } from './shopify.config.ts'

const rootElement = document.getElementById('react-filter-app')!
const { collectionId, storeUrl, apiToken } = rootElement.dataset
export const newConfig = new ShopifyConfig(storeUrl!, collectionId!, apiToken!);


if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
