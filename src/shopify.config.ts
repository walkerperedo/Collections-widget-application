export class ShopifyConfig {
  storeUrl: string;
  collectionId: string;
  apiToken: string;

  constructor(storeUrl: string, collectionId: string, apiToken: string) {
    this.storeUrl = storeUrl;
    this.collectionId = collectionId;
    this.apiToken = apiToken;
  }
}