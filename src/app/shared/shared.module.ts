import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicContainer } from './containers/template/basic.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TopnavbarComponent } from './components/topnavbar/topnavbar.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './containers/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from '@Libraries/prime-ng/prime-ng.module';
import { WorkorderDetailComponent } from '../test/components/workorder-detail/workorder-detail.component';
import { CoreModule } from '../core/core.module';
import { BreadcrumbHeaderComponent } from './components/breadcrumb-header/breadcrumb-header.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [

    BasicContainer,
    FooterComponent,
    NavigationComponent,
    TopnavbarComponent,
    LoginComponent,
    BreadcrumbHeaderComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule,
      
    FormsModule,
    PrimeNGModule,
    ReactiveFormsModule
  ],
  exports: [
    BasicContainer,
    BreadcrumbHeaderComponent
  
  ]
})
export class SharedModule { }
