import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
    import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from '@Libraries/prime-ng/prime-ng.module';
import { WorkorderDetailComponent } from '../test/components/workorder-detail/workorder-detail.component';
import { CoreModule } from '../core/core.module';
import { BreadcumpAgainComponent } from './breadcump-again/breadcump-again.component';


@NgModule({
  declarations: [

   BreadcumpAgainComponent
    
    
  ],
  imports: [
    CommonModule,
    RouterModule,
     FormsModule,
    PrimeNGModule,
    ReactiveFormsModule
  ],
  exports: [
    BreadcumpAgainComponent,
  
  ]
})
export class SharedComponentsModule { }
