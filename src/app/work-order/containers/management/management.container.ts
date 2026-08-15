import { Component, ViewChild } from '@angular/core';
import { ModalOrdersComponent } from '../../components/modal-orders/modal-orders.component';
import { TableOrdersComponent } from '../../components/table-orders/table-orders.component';
import { WorkOrderService } from '@Services/WorkOrder/work-order.service';
@Component({
  selector: 'app-management',
  templateUrl: './management.container.html',
  styleUrl: './management.container.css'
})
export class ManagementContainer {
  @ViewChild(TableOrdersComponent) tableWO!: TableOrdersComponent; 
  @ViewChild(ModalOrdersComponent) modalWO!: ModalOrdersComponent;

  title: string = 'Work Orders Management'
  pwoallvalues: string[] = [];


 

  constructor(
  ) { 
    

  }

  reloadTable(){
    this.tableWO.reloadTable();
  }

  addWO(){
    this.modalWO.open();
  }

  
}
