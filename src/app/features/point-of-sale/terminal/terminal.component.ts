import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatAutocomplete, MatOption } from '@angular/material/autocomplete';
import { FindCustomerComponent } from './widgets/find-customer/find-customer.component';
import { NewCustomerComponent } from './widgets/new-customer/new-customer.component';
import { PaymentComponent } from './widgets/payment/payment.component';
import { ScanOrSearchComponent } from './widgets/scan-or-search/scan-or-search.component';
import { ShoppingBagComponent } from './widgets/shopping-bag/shopping-bag.component';
import { ToolbarComponent } from './widgets/toolbar/toolbar.component';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [
    MatAutocomplete,
    MatOption,
    CurrencyPipe,
    NgOptimizedImage,
    PaymentComponent,
    ShoppingBagComponent,
    NewCustomerComponent,
    FindCustomerComponent,
    ScanOrSearchComponent,
    ToolbarComponent,
  ],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss'
})
export class TerminalComponent {}
