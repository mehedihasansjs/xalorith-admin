import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { uniqBy } from 'lodash-es';
import { Product } from '../../../inventory/product/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingBagManager {
  private _products: WritableSignal<Product[]> = signal<Product[]>([]);

  get products(): Signal<Product[]> {
    return this._products.asReadonly();
  }

  set products(products: Product[]) {
    this._products.set(products);
  }

  addProduct(product: Product): void {
    this._products.update((products) => [...products, product]);

    const products = this.products();
    localStorage.setItem('shopping-bag', JSON.stringify(products));
  }

  removeProduct(product: Product): void {
    this._products.update((products) => products.filter((p) => p.id !== product.id));
  }

  clear(): void {
    this._products.update(() => []);
  }

  getQuantity(id: string): Signal<number> {
    return computed(() => this.products().filter((p) => p.id === id).length);
  }

  getDistinctProducts(): Signal<Product[]> {
    return computed(() => {
      const products = this.products();
      return uniqBy(products, p => p.id);
    });
  }

  get total() {
    const products = this.getDistinctProducts();
    return computed(() => products().reduce((acc, p) => acc + (p?.price ?? 0) * this.getQuantity(p?.id ?? '')(), 0));
  }

  get discount() {
    const products = this.getDistinctProducts();
    return computed(() => products().reduce((acc, p) => acc + (p?.discount ?? 0) * this.getQuantity(p?.id ?? '')(), 0));
  }
}
