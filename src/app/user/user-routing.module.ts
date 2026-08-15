import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementContainer } from './containers/management/management.container';
import { ChangePasswordContainer } from './containers/change-password/change-password.container';

const routes: Routes = [
  {
    path: 'Management',
    component: ManagementContainer
  },
  { 
    path: 'ChangePassword',
    component: ChangePasswordContainer
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
export class UserRoutingModule { }
