import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatOption } from '@angular/material/autocomplete';
import { map, tap } from 'rxjs';
import { TextInputComponent } from '../../../shared/components/text-input/text-input.component';
import { Product } from '../../inventory/product/models/product';
import { ProductService } from '../../inventory/product/services/product.service';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [
    TextInputComponent,
    MatAutocomplete,
    MatOption,
    CurrencyPipe,
    NgOptimizedImage,
  ],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss'
})
export class TerminalComponent implements OnInit {
  customerMobileNo: FormControl<string | null> = new FormControl<string | null>('');
  productControl: FormControl<string | null> = new FormControl<string | null>('');
  products: Product[] = [];

  constructor(
    private _productService: ProductService
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
}
