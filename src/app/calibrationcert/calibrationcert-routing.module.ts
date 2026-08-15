import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalibrationcertContainer } from './containers/calibrationcert/calibrationcert.container';

const routes: Routes = [
  {
    path: 'Managment',
    component: CalibrationcertContainer
  },
  {
    path: '',
    redirectTo: 'Loginn',
    pathMatch: 'full',
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalibrationcertRoutingModule { }
