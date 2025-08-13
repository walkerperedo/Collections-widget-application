import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

const rootElement = document.getElementById('react-filter-app')!

if (rootElement) {
  const { collectionId } = rootElement.dataset
  createRoot(rootElement).render(
    <StrictMode>
      <App collectionId={collectionId!} />
    </StrictMode>
  )
}
