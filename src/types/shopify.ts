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
