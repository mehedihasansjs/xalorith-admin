import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, tap } from 'rxjs';
import { TextInputComponent } from '../../../../../shared/components/text-input/text-input.component';
import { Product } from '../../../../inventory/product/models/product';
import { ProductService } from '../../../../inventory/product/services/product.service';
import { ShoppingBagManager } from '../../managers/shopping-bag.manager';

@Component({
  selector: 'app-scan-or-search',
  standalone: true,
  imports: [
    TextInputComponent,
    CurrencyPipe,
    NgOptimizedImage,
  ],
  templateUrl: './scan-or-search.component.html',
  styleUrl: './scan-or-search.component.scss'
})
export class ScanOrSearchComponent implements OnInit {
  productControl: FormControl<string | null> = new FormControl<string | null>('');
  products: Product[] = [];

  constructor(
    private _productService: ProductService,
    private _shoppingBadManager: ShoppingBagManager
  ) {
  }

  ngOnInit() {
    this._productService
    .getAll()
    .pipe(
      map((products) => products.filter(product => product.isSingle || product.parentId)),
      tap((products) => {
        this.products = products;
      })
    )
    .subscribe();
  }

  onProductSelection(id: string) {
    const product = this.products.find(p => p.id === id);

    if ( !product ) {
      throw new Error('Product not found');
    }

    this._shoppingBadManager.addProduct(product);
  }
}
