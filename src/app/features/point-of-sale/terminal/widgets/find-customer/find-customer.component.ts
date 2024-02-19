import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TextInputComponent } from '../../../../../shared/components/text-input/text-input.component';

@Component({
  selector: 'app-find-customer',
  standalone: true,
    imports: [
        TextInputComponent,
    ],
  templateUrl: './find-customer.component.html',
  styleUrl: './find-customer.component.scss'
})
export class FindCustomerComponent {
  customerMobileNo: FormControl<string | null> = new FormControl<string | null>('');
}
