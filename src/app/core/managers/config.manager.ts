import { Injectable } from '@angular/core';
import { IConfig, IEndpointConfig } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ConfigManager {
  private _baseUrl: string = '';
  private _endpoint: IEndpointConfig = {} as IEndpointConfig;
  private _config: IConfig = {} as IConfig;

  set baseUrl(value: string) {
    this._baseUrl = value;
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

  set endpoint(value: IEndpointConfig) {
    this._endpoint = value;
  }

  get endpoint(): IEndpointConfig {
    return this._endpoint;
  }

  set config(value: IConfig) {
    this._config = value;
  }

  get config(): IConfig {
    return this._config;
  }
}
