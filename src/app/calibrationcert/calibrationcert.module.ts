import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';

import { CalibrationcertRoutingModule } from './calibrationcert-routing.module';
import { CoreModule } from '../core/core.module';
import { NgbdSortableHeader } from '@Services/table/sortable.directive';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FechaFormatPipe } from '../shared/pipes/dateFormt.pipe';
import { TestRoutingModule } from '@Screen/test-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from '@Libraries/prime-ng/prime-ng.module';

import { ModalCalibrationcertComponent } from './components/modal-calibrationcert/modal-calibrationcert.component';
import { TableCalibrationcertComponent } from './components/table-calibrationcert/table-calibrationcert.component';
import { CalibrationcertContainer } from './containers/calibrationcert/calibrationcert.container';


@NgModule({
  declarations: [
    CalibrationcertContainer,
    TableCalibrationcertComponent,
    ModalCalibrationcertComponent
  ],
  providers:[
    FechaFormatPipe
  ],
  imports: [
    CoreModule,
    CommonModule,
    CalibrationcertRoutingModule,
    NgbModule,
    TestRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModule,
    AsyncPipe,
  ]
})
export class CalibrationcertModule { }
