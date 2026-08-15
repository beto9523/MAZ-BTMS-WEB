import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbdSortableHeader } from '@Services/table/sortable.directive';
import { FechaFormatPipe } from '../shared/pipes/dateFormt.pipe';
import { TooltipDirective } from './directive/tooltip.directive';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkorderDetailComponent } from '../test/components/workorder-detail/workorder-detail.component';
import { SharedModule } from '../shared/shared.module';
 

@NgModule({
  declarations: [
    NgbdSortableHeader,
    FechaFormatPipe,
    TooltipDirective,
        
  ],
  imports: [
    CommonModule,
    NgbModule

  ],
  exports:[
    NgbdSortableHeader,
    FechaFormatPipe,
    TooltipDirective

  ]
})
export class CoreModule { }
