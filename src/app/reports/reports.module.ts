import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { DashboardContainer } from './containers/dashboard/dashboard.container';
import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  declarations: [
    DashboardContainer
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    HighchartsChartModule
  ]
})
export class ReportsModule { }
