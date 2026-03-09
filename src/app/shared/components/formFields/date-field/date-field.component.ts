import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateFieldComponent),
      multi: true
    }
  ]
})
export class DateFieldComponent implements ControlValueAccessor {
  @Input() label: string = 'Fecha';
  @Input() placeholder: string = 'Seleccionar fecha';
  @Input() error: string = '';
  @Input() disabled: boolean = false;
  @Input() displayFormat: string = 'DD/MM/YYYY';
  @Input() pickerFormat: string = 'DD/MM/YYYY';

  @Output() onChange = new EventEmitter<Date>();

  value: string = '';
  isDisabled: boolean = false;

  private onChangeCallback: (value: any) => void = () => {};
  private onTouchedCallback: () => void = () => {};

  onDateChange(event: any) {
    const selectedDate = event.detail.value;
    this.value = selectedDate;
    this.onChangeCallback(selectedDate);
    this.onChange.emit(new Date(selectedDate));
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
