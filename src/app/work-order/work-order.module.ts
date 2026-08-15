import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { WorkOrderRoutingModule } from './work-order-routing.module';
import { ManagementContainer } from './containers/management/management.container';
import { TableOrdersComponent } from './components/table-orders/table-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from '@Libraries/prime-ng/prime-ng.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalOrdersComponent } from './components/modal-orders/modal-orders.component';



@NgModule({
  declarations: [
    ManagementContainer,
    TableOrdersComponent,
    ModalOrdersComponent
  ],
  imports: [
    
    CoreModule,
    CommonModule,
    FormsModule,
    NgbModule,
    PrimeNGModule,
    ReactiveFormsModule,
    WorkOrderRoutingModule,
    
  ]
})
export class WorkOrderModule { }
