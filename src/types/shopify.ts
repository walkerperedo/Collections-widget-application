export interface Product {
  id: string
  title: string
  handle: string
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  media: {
    nodes: {
      previewImage: {
        url: string
        id: string
      }
    }[]
  }
  vendor: string
  productType: string
}

export interface ProductFilter {
  label: string
  id: string
  values: FilterOptionValue[]
}

export interface FilterOptionValue {
  id: string
  label: string
  input: string
}

export interface ShopifyProductResponse {
  collection: {
    products: {
      pageInfo: {
        hasNextPage: boolean
        endCursor: string | null
      }
      nodes: Product[]
    }
  }
}

export interface ActiveFilters {
  productVendor?: string
  productType?: string
  available?: boolean
}
