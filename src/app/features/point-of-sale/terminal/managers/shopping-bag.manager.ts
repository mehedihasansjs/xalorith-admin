import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { uniqBy } from 'lodash-es';
import { Product } from '../../../inventory/product/models/product';
import { DiscountType } from '../enums/discount-type';

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

  removeByOne(product: Product): void {
    const products = this.products();
    const index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      products.splice(index, 1);
      this._products.set(products);
      localStorage.setItem('shopping-bag', JSON.stringify(products));
    }
  }

  applyDiscount(productId: string, discount: number, type: DiscountType = DiscountType.Percentage): void {
    const products = this.products().filter((p) => p.id === productId);
    if (products.length === 0) {
      return;
    }

    products.forEach((p) => {
      p.discount = discount;
      p.discountType = type;

      p.discountInAmount = 0;
      if (type === DiscountType.Amount) {
        p.discountInAmount = discount;
      } else {
        p.discountInAmount = (p.price ?? 0) * (discount / 100);
      }
    });
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
