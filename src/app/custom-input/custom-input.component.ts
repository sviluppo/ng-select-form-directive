import {Component, Input, OnInit} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: CustomInputComponent
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor{
  private onTouched!: Function;
  private onChanged!: Function;
  @Input() label: string = '';
  @Input() value: string = '';

  onInput(event: any){
    this.onChanged(event.target.value);
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
