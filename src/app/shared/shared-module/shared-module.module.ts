import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderSpinnerComponent } from 'app/loader-spinner/loader-spinner.component';



@NgModule({
  declarations: [LoaderSpinnerComponent],
  imports: [
    CommonModule
  ],
  exports:[LoaderSpinnerComponent]
})
export class SharedModuleModule { }
