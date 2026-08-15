import { QueryParam } from '@InputModels/shared/QueryParam';
import { NotificationService } from '@Services/notifications/notification.service';
import { NgbdSortableHeader } from '@Services/table/sortable.directive';
import { DataTableService } from '@Services/table/table.service';
import { TestService } from '@Services/test/test.service';
import { FilterTestViewModel } from '@ViewModels/test/FilterTestViewModel';
import { testViewModel } from '@ViewModels/test/testViewModel';
import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, EventEmitter, Output } from '@angular/core';
import { filter, Observable } from 'rxjs';

import { ApipdfService } from '@Services/Report/apipdf.service';
import { ModalViewcertComponent } from '../../modal-viewcert/modal-viewcert.component';
import { UserService } from '@Services/user/user.service';
import Swal from 'sweetalert2';
import { ModalTestmanagmentComponent } from '../../modal-testmanagment/modal-testmanagment.component';

@Component({
  selector: 'app-tabletestmanagement',
  templateUrl: './tabletestmanagement.component.html',
  styleUrl: './tabletestmanagement.component.css'
})
export class TabletestmanagmentComponent implements OnInit {
  data$: Observable<testViewModel[]>;
  total$: Observable<number>;
  pagL$: Observable<number>;
  pagR$: Observable<number>;
  testFilter?: FilterTestViewModel;
  userId?: number;
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
  @ViewChild(ModalTestmanagmentComponent) modal!: ModalTestmanagmentComponent;
  constructor(
    public service: DataTableService<testViewModel>,
    private  pdf: ApipdfService,
    private not: NotificationService,
    private user: UserService,
    private testService: TestService
    
  ) {
    this.data$ = this.service.data$;
    this.total$ = this.service.total$;
    this.pagL$ = this.service.pagL$;
    this.pagR$ = this.service.pagR$;

  }
  

  ngOnInit() {
    this.userId= this.user.getUserModel()?.userCode;
    this.service.sortDirection = 'desc';
    this.service.sortColumn = 'testid';
    this.service.url = 'Test/GetTest';
    
  }
  setStatusBadge(id:string){
    id= id.trim();
    id= id.toLowerCase();
    if(id=="passed"){
      return "badge badge-pill badge-success";
    }
    else if (id=="canceled"){
      return "badge badge-pill badge-warning";
    }
    else if (id=="fail"){
      return "badge badge-pill badge-danger";
    }
    else{
      return "";
    }
  }
  deleteTest(idTest:string){
    console.log(this.userId);
    let numberIdTest= Number(idTest);
    if(this.userId!=undefined)
    this.testService.deleteTest(numberIdTest, this.userId)
  .subscribe(
    {
      next:(e)=>{
        console.log(e);
        this.not.showSuccess("Test Deleted Sucefully!");
        this.service.reload();
      }
    }
  );
  }
  openModal(idTest:string){
    this.modal.open(Number(idTest));
  }
  reloadTableProcess(){
    this.service.reload();

  }
  setTestFilter(filterTestObj:FilterTestViewModel){

   this.service.setQueryParams(filterTestObj);
   this.service.reload();
  }
  /**
   * Table Services method
   *
   */
  

  onSort({ column, direction }: any) {

    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}