import { HttpBackend, HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IConfig } from '../interfaces';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(
    private _httpClient: HttpClient,
  ) {}

  getConfig(): Observable<IConfig> {
    return this._httpClient.get<IConfig>('assets/data/config.json');
  }
}
