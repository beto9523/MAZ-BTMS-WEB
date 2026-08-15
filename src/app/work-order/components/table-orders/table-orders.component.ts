import { DataTableService } from '@Services/table/table.service';
import { WorkOrderViewModel } from '@ViewModels/wo/WOViewModel';
import { Component, ViewChild,OnInit,QueryList,ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalOrdersComponent } from '../modal-orders/modal-orders.component';
import { NgbdSortableHeader } from '@Services/table/sortable.directive';


@Component({
  selector: 'app-table-orders',
  templateUrl: './table-orders.component.html',
  styleUrl: './table-orders.component.css'
})

export class TableOrdersComponent implements OnInit {
  data$: Observable<WorkOrderViewModel[]>;
	total$: Observable<number>;
	pagL$: Observable<number>;
	pagR$: Observable<number>;

  wordOrders: WorkOrderViewModel[] =  [ ];

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
	@ViewChild(ModalOrdersComponent) modalOrder!: ModalOrdersComponent;

  constructor(
    public service: DataTableService<WorkOrderViewModel>,
  ) {
    this.data$ = this.service.data$;
    this.total$ = this.service.total$;
    this.pagL$ = this.service.pagL$;
    this.pagR$ = this.service.pagR$;

    
	}

  ngOnInit() {
    this.service.sortDirection = 'desc';
    this.service.sortColumn = 'woNumber';
    this.service.url = 'WorkOrder/GetWorkOrdersPagination';
  }

  reloadTable() {
    this.service.reload();
  }
  editWO(workOrder: WorkOrderViewModel) {
    this.modalOrder.open(workOrder);
  }
  onSort({ column, direction }: any) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

}
