import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardtestContainer } from './containers/dashboardtest/dashboardtest.container';
import { ManagementtestContainer } from './containers/managementtest/managementtest/managementtest.container';



const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardtestContainer 
  },
  {
    path: 'management',
    component: ManagementtestContainer 
  },
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full',
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) 
export class TestRoutingModule { }
