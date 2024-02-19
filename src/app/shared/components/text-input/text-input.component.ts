import { CurrencyPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    CurrencyPipe,
    MatAutocomplete,
    MatOption,
    NgTemplateOutlet,
    MatAutocompleteTrigger,
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  @Input({ required: true }) control!: FormControl<string | null>;
  @Input({ required: true }) label?: string;
  @Input() icon?: string;
  @Input() placeholder?: string;
  @Input() classes: string = '';
  @Input() autoComplete?: string;
  @Input() bordered: boolean = false;
  @Input() readonly: boolean = false;
  @Input() focusKeyBinding: string = 'F3';
  @Input() keyBindWithMeta: boolean = false;
  @Input() showSuggestion: boolean = false;
  @Input() items: any[] = [];
  @Input() autoCompleteTemplate!: TemplateRef<any>;

  @Output() itemSelected: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  @HostListener('window:keydown', ['$event'])
  keyTrigger(event: KeyboardEvent): void {
    if (event.key === this.focusKeyBinding) {
      if ( this.keyBindWithMeta ) {
        if ((event.ctrlKey && !event.metaKey) || (!event.ctrlKey && event.metaKey)) {
          this.focus(event);
        }
      } else {
        this.focus(event);
      }
    }
  }

  private focus(event: KeyboardEvent) {
    event.preventDefault();
    this.input.nativeElement.focus();
  }
}
