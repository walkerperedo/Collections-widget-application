import { renderHook, act } from '@testing-library/react'
import { useProducts } from '../useProducts'
import { fetchProductsFromShopify } from '../../api/storeFront'
import { beforeEach, describe, it, expect, vi } from 'vitest'

// Mock API
vi.mock('../../api/storeFront', () => ({
  fetchProductsFromShopify: vi.fn(),
}))

const mockProducts = {
  nodes: [{ id: '1', title: 'Test Product' }],
  filters: [
    { id: 'productType', label: 'Type', values: [] },
    { id: 'price-range', label: 'Price', values: [] },
  ],
  endCursor: 'cursor-123',
  hasNextPage: true,
}

describe('useProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.body.innerHTML = `
    <div id="react-filter-app"
         data-collection-id="123"
         data-store-url="https://test.myshopify.com"
         data-api-token="fake-token">
    </div>
  `
  })

  it('should initialize with loading true and empty products', async () => {
    ;(fetchProductsFromShopify as jest.Mock).mockResolvedValueOnce(mockProducts)

    const { result } = renderHook(() => useProducts('TITLE', false))

    expect(result.current.loading).toBe(true)
    expect(result.current.products).toEqual([])

    // wait for hook to resolve
    await act(async () => {})
    expect(result.current.loading).toBe(false)
    expect(result.current.products).toEqual(mockProducts.nodes)
  })

  it('should filter out price filters', async () => {
    ;(fetchProductsFromShopify as jest.Mock).mockResolvedValueOnce(mockProducts)

    const { result } = renderHook(() => useProducts('TITLE', false))

    await act(async () => {})
    expect(result.current.filters).toEqual([
      { id: 'productType', label: 'Type', values: [] },
    ])
  })

  it('should handle API errors', async () => {
    ;(fetchProductsFromShopify as jest.Mock).mockRejectedValueOnce(new Error('API failed'))

    const { result } = renderHook(() => useProducts('TITLE', false))

    await act(async () => {})
    expect(result.current.error).toBe('Failed to load products.')
    expect(result.current.loading).toBe(false)
  })

  it('should append products on loadMore()', async () => {
    ;(fetchProductsFromShopify as jest.Mock)
      .mockResolvedValueOnce(mockProducts) // first load
      .mockResolvedValueOnce({
        ...mockProducts,
        nodes: [{ id: '2', title: 'Second Product' }],
      })

    const { result } = renderHook(() => useProducts('TITLE', false))

    await act(async () => {}) // initial load

    expect(result.current.products).toEqual([{ id: '1', title: 'Test Product' }])

    await act(async () => {
      await result.current.loadMore()
    })

    expect(result.current.products).toEqual([
      { id: '1', title: 'Test Product' },
      { id: '2', title: 'Second Product' },
    ])
  })

  it('should not load more if hasNextPage is false', async () => {
    ;(fetchProductsFromShopify as jest.Mock)
      .mockResolvedValueOnce({ ...mockProducts, hasNextPage: false })

    const { result } = renderHook(() => useProducts('TITLE', false))

    await act(async () => {})
    expect(result.current.hasNextPage).toBe(false)

    await act(async () => {
      await result.current.loadMore()
    })

    expect(fetchProductsFromShopify).toHaveBeenCalledTimes(2)
  })
})
