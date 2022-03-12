import {Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";
import {NgSelectComponent} from "@ng-select/ng-select";

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
  @ViewChild('ngSelect', { static: true }) ngSelect!: NgSelectComponent;
  @Input() observable$!: any;
  @Input() observableInput$!: any;
  @Input() loading!: boolean;
  @Input() bindLabel: string = '';
  @Input() bindValue: string = 'id';
  @Input() label: string = '';
  @Output() onSearch = new EventEmitter();
  selected: any;
  ngControl!: NgControl;

  constructor(public injector: Injector) {}

  ngOnInit(){
    this.onSearch.emit();
    this.ngControl = this.injector.get(NgControl, undefined);
  }

  ngAfterViewInit(){
    this.setDefaultValue();
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

  setDefaultValue(){
    const value = this.ngControl?.control?.value[this.bindValue];
    if(value){
      this.ngSelect.writeValue(value);
    }
  }
}
