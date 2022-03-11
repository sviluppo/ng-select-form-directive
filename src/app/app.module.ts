import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {CustomFormComponent} from "./custom-form/custom-form.component";
import {CustomNgSelectComponent} from "./custom-ng-select/custom-ng-select.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {CustomInputComponent} from "./custom-input/custom-input.component";

@NgModule({
  declarations: [
    AppComponent,
    CustomFormComponent,
    CustomNgSelectComponent,
    CustomInputComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
