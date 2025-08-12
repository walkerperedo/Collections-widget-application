export interface Product {
	id: string
	title: string
	handle: string
	price: {
		amount: string
		currencyCode: string
	}
	image: {
		url: string
		altText: string | null
	}
	vendor: string
	productType: string
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
	brand: string[]
	productType: string[]
}
