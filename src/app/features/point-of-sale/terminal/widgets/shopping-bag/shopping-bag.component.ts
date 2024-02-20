import { CurrencyPipe, JsonPipe } from '@angular/common';
import { Component, effect, Signal } from '@angular/core';
import { remove } from 'lodash-es';
import { Product } from '../../../../inventory/product/models/product';
import { ShoppingBagManager } from '../../managers/shopping-bag.manager';

@Component({
  selector: 'app-shopping-bag',
  standalone: true,
  imports: [
    JsonPipe,
    CurrencyPipe,
  ],
  templateUrl: './shopping-bag.component.html',
  styleUrl: './shopping-bag.component.scss'
})
export class ShoppingBagComponent {
  products: Signal<Product[]> = this._shoppingBagManager.getDistinctProducts();

  constructor(
    private _shoppingBagManager: ShoppingBagManager
  ) {
    effect(() => {
      const productsInStorage = localStorage.getItem('shopping-bag');
      if ( productsInStorage && productsInStorage.length > 0 ) {
        const products = JSON.parse(productsInStorage);
        this._shoppingBagManager.products = products;
      }
    }, {
      allowSignalWrites: true
    });
  }

  getQty(id: string) {
    return this._shoppingBagManager.getQuantity(id);
  }

  getTotal(product: Product) {
    const qty = this.getQty(product?.id ?? '');
    return (product?.price ?? 0) * qty();
  }

  increase(product: Product) {
    this._shoppingBagManager.addProduct(product);
  }

  decrease(product: Product) {
    this._shoppingBagManager.removeByOne(product);
  }

  remove(product: Product) {
    this._shoppingBagManager.removeProduct(product);
  }

  getTotalDiscount(product: Product) {
    const qty = this.getQty(product?.id ?? '');
    return (product?.discount ?? 0) * qty();
  }
}
