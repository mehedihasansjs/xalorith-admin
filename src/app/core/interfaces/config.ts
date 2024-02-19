import { IEndpointConfig } from './endpoint-config';

export interface IConfig {
  baseUrl: string;
  endpoint: IEndpointConfig;
  clientId: string;
  clientSecret: string;
}
