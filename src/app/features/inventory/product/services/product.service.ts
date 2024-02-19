import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ConfigManager } from '../../../../core';
import { getRidOfPrefix } from '../../../../shared/utils';
import { Product } from '../models/product';
import { ProductResponse } from '../models/product-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _httpClient: HttpClient,
    private _configManager: ConfigManager
  ) { }

  getAll(): Observable<Product[]> {
    const url = `${this._configManager.baseUrl}/${this._configManager.endpoint.inventory.product.getAll}`;
    return this._httpClient.get<ProductResponse[]>(url)
      .pipe(
        map(response => response.map(product => ({
          id: product.id?.toString(),
          name: getRidOfPrefix(product.name),
          code: getRidOfPrefix(product.autoGenCode),
          price: product.price,
          isSingle: product.isSingle,
          parentId: product.parentId?.toString() ?? null,
        })))
      );
  }
}
