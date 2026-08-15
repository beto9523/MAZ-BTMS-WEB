import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementContainer } from './containers/management/management.container';

const routes: Routes = [
  {
    path: 'Management',
    component: ManagementContainer
  },
  {
    path: '',
    redirectTo: 'Management',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'Management',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrderRoutingModule { }
