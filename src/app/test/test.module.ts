import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { TestRoutingModule } from './test-routing.module';
import { DashboardtestContainer } from './containers/dashboardtest/dashboardtest.container';
import { FiltrostestComponent } from './components/filtrostest/filtrostest.component';
import { PrimeNGModule } from '@Libraries/prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TotalestestComponent } from './components/totalestest/totalestest.component';
import { TabletestComponent } from './components/tabletest/tabletest.component';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { CatalogServiceService } from '../core/services/testCatalogs/catalog-service.service';
import { TestTypeService } from '@Services/testCatalogs/TestType/test-type.service';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CoreModule } from '../core/core.module';
import { TestMethodService } from '@Services/testCatalogs/TestMethod/test-method.service';
import { TestGeometryService } from '@Services/testCatalogs/TestGeometry/test-geometry.service';
import { ModalViewcertComponent } from './components/modal-viewcert/modal-viewcert.component';
import { ManagementtestContainer } from './containers/managementtest/managementtest/managementtest.container';
import { BreadcrumbHeaderComponent } from '../shared/components/breadcrumb-header/breadcrumb-header.component';
import { TabletestmanagmentComponent } from './components/tabletestmanagement/tabletestmanagement/tabletestmanagement.component';
import { ModalTestmanagmentComponent } from './components/modal-testmanagment/modal-testmanagment.component';
import { WorkorderDetailComponent } from './components/workorder-detail/workorder-detail.component';
import { LoginComponent } from '../shared/containers/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { SharedComponentsModule } from '../sharedcomponents/sharedcomponents.module';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  //providers: [{ provide: baseClass, useClass: DerivedClass }],
  providers: [
    { provide: CatalogServiceService, useClass: TestMethodService },  
    NgbModal
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

  declarations: [
    WorkorderDetailComponent,
     DashboardtestContainer,
    FiltrostestComponent,
    TotalestestComponent,
    TabletestComponent,
    CapitalizePipe,
    ModalViewcertComponent,
    ManagementtestContainer,
    TabletestmanagmentComponent,
    ModalTestmanagmentComponent
    

  ],
  imports: [
    CoreModule,
    CommonModule,
    TestRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModule,
    AsyncPipe,
    DecimalPipe,
    SweetAlert2Module.forRoot(),
    SharedComponentsModule,
     SharedModule
  ],
  
})
export class TestModule {}
