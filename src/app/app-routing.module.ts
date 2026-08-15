import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { BasicContainer } from './shared/containers/template/basic.component';
import { LoginComponent } from './shared/containers/login/login.component';
import { TestModule } from './test/test.module';

const routes: Routes = [
  {
    path: "test",
    component:BasicContainer ,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () => import('./test/test.module').then(m => m.TestModule)
      }
    ]
  },

  {
    path: "Users",
    component:BasicContainer ,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      }
    ]
  },
  {
    path: "Reports",
    component:BasicContainer ,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
      }
    ]
  },
  {
    path: "Screen",
    component:BasicContainer ,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () => import('./screen/test.module').then(m => m.TestModule)
      }
    ]
  },
  {
    path: "WorkOrder",
    component:BasicContainer ,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () => import('./work-order/work-order.module').then(m => m.WorkOrderModule)
      }
    ]
  },
  {
    path: "calibrationcert",
    component:BasicContainer ,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () => import('./calibrationcert/calibrationcert.module').then(m => m.CalibrationcertModule)
      }
    ]
  },
  {
    path: "Login",
    component:LoginComponent,
  },

  {
    path: '',
    redirectTo: '/Screen/test',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'Login',
    pathMatch: 'full',
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
