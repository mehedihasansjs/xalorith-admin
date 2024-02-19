export interface IEndpointConfig {
  auth: IAuthEndpointConfig;
  inventory: IInventoryEndpointConfig;
}

interface IAuthEndpointConfig {
  login: string;
}

interface IInventoryEndpointConfig {
  product: {
    getAll: string;
  }
}
