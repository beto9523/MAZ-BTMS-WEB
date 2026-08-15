import { NgModule } from '@angular/core';
import {  BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';
import { ErrorHandlingInterceptor } from './interceptor/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import {RadioButtonModule} from 'primeng/radiobutton';
import test from 'node:test';
import { BreadcumpAgainComponent } from './sharedcomponents/breadcump-again/breadcump-again.component';
import { SharedComponentsModule } from './sharedcomponents/sharedcomponents.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RadioButtonModule,
    FormsModule,
  BrowserAnimationsModule,
  BrowserModule,
    AppRoutingModule,
    SharedModule,
     ToastrModule.forRoot({
      preventDuplicates: true
    }),

  ],
  exports:[
 
  ],
  providers: [
//    {provide:CatalogServiceService,useClass:TestTypeService},
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
     provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true, },

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
