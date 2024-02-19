import { CurrencyPipe } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { ShoppingBagManager } from '../../managers/shopping-bag.manager';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CurrencyPipe,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  total: Signal<number> = this._shoppingBagManager.total;
  discount: Signal<number> = this._shoppingBagManager.discount;

  constructor(
    private _shoppingBagManager: ShoppingBagManager
  ) {
  }
}
