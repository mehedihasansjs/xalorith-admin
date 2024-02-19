export interface IEndpointConfig {
  auth: IAuthEndpointConfig;
}

interface IAuthEndpointConfig {
  login: string;
}
