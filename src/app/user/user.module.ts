import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ManagementContainer } from './containers/management/management.container';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalUserComponent } from './components/modal-user/modal-user.component';
import { PrimeNGModule } from '@Libraries/prime-ng/prime-ng.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ChangePasswordContainer } from './containers/change-password/change-password.container';
import { FormUserComponent } from './components/form-user/form-user.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CoreModule } from '../core/core.module';

 
@NgModule({
  declarations: [
    ManagementContainer,
    TableUsersComponent,
    ModalUserComponent,
    ChangePasswordContainer,
    FormUserComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgbModule,
    DecimalPipe,
    FormsModule,
    AsyncPipe,
    PrimeNGModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    HighchartsChartModule,
    SweetAlert2Module.forRoot(),

  ],
  providers: [DecimalPipe,NgbModal],
  exports: [

  ]
})
export class UserModule { }
