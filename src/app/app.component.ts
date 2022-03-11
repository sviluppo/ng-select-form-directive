import {Component, ViewChild} from '@angular/core';
import {CustomFormComponent} from "./custom-form/custom-form.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild(CustomFormComponent, { static: true })
  formDirective!: CustomFormComponent;

  ngOnInit() {
    this.formDirective.form.patchValue({
      message: 'interesting message',
      movie: {
        id: 1,
        title: 'Lord of the rings'
      }
    })
    console.log(this.formDirective.form.value);
  }
}
