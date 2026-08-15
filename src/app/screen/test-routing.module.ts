import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from '@Screen/containers/test/test.container';

const routes: Routes = [
  {
    path: 'test',
    component: TestComponent
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
export class TestRoutingModule { }
