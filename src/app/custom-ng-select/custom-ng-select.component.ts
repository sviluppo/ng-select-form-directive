import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'custom-ng-select',
  templateUrl: './custom-ng-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CustomNgSelectComponent
    }
  ]
})
export class CustomNgSelectComponent implements ControlValueAccessor {
  private onTouched!: Function;
  private onChanged!: Function;
  @Input() observable$!: any;
  @Input() observableInput$!: any;
  @Input() loading!: boolean;
  @Input() bindLabel: string = '';
  @Input() bindValue: string = 'id';
  @Input() label: string = '';
  @Output() onSearch = new EventEmitter();
  selected: any;

  ngOnInit(){
    this.onSearch.emit();
  }

  select(value: string) {
    this.onTouched();
    this.selected = value;
    this.onChanged(value);
  }

  writeValue(value: any){
    console.log(value);
    this.selected = value;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
