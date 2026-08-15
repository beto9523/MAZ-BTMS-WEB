import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { TestRoutingModule } from './test-routing.module';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalscreenComponent } from './components/modal-screen/modalscreen.component';
import { PrimeNGModule } from '@Libraries/prime-ng/prime-ng.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormtestComponent } from '@Screen/components/form-screen/formtest.component';
import { TestComponent } from '@Screen/containers/test/test.container';
import { HighchartsChartModule } from 'highcharts-angular';
import { CoreModule } from '../core/core.module';
import { SharedModule } from 'primeng/api';


@NgModule({
  declarations: [
    ModalscreenComponent,
    FormtestComponent,
    TestComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    TestRoutingModule,
    NgbModule,
    DecimalPipe,
    FormsModule,
    AsyncPipe,
    PrimeNGModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    HighchartsChartModule,
  ],
  providers: [DecimalPipe,NgbModal],
  exports: [

  ]
})
export class TestModule { }
