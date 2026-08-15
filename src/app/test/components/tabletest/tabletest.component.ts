import { QueryParam } from '@InputModels/shared/QueryParam';
import { NotificationService } from '@Services/notifications/notification.service';
import { NgbdSortableHeader } from '@Services/table/sortable.directive';
import { DataTableService } from '@Services/table/table.service';
import { TestService } from '@Services/test/test.service';
import { FilterTestViewModel } from '@ViewModels/test/FilterTestViewModel';
import { testViewModel } from '@ViewModels/test/testViewModel';
import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { filter, Observable } from 'rxjs';

import { ApipdfService } from '@Services/Report/apipdf.service';
import { ModalViewcertComponent } from '../modal-viewcert/modal-viewcert.component';

@Component({
  selector: 'app-tabletest',
  templateUrl: './tabletest.component.html',
  styleUrl: './tabletest.component.css'
})
export class TabletestComponent implements OnInit {
  data$: Observable<testViewModel[]>;
  total$: Observable<number>;
  pagL$: Observable<number>;
  pagR$: Observable<number>;
  testFilter?: FilterTestViewModel;
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
  @ViewChild(ModalViewcertComponent) modalViewCert!: ModalViewcertComponent;
  constructor(
    public service: DataTableService<testViewModel>,
    private  pdf: ApipdfService,
    private not: NotificationService
  ) {
    this.data$ = this.service.data$;
    this.total$ = this.service.total$;
    this.pagL$ = this.service.pagL$;
    this.pagR$ = this.service.pagR$;

  }
  

  ngOnInit() {
    
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
  openViewCert(idTest:number){
    this.modalViewCert.open(idTest);
  }
  openViewCertNewWindow(idTest:number){
    this.pdf.Getpdf(idTest)
    .pipe(
 
    )
     .subscribe({
       next:(r)=>{
        const url = window.URL.createObjectURL(r.body!);
        window.open(url,"_blank");
         
       },
   }
   );
  }
  setTestFilter(filterTestObj:FilterTestViewModel){

   this.service.setQueryParams(filterTestObj);
   this.service.reload();
  }
  /**
   * Table Services method
   *
   */
  savething(mbase64:any){


    const url = window.URL.createObjectURL(mbase64);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', Date.now().toString()+'.pdf');
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    
  }

  downloadPDF(idTest:number){

    try {
      this.pdf.Getpdf(idTest)
     .pipe(
  
     )
      .subscribe({
        next:(r)=>{
          this.not.showSuccess('Report generated sucefully!','Sucess Report');
          this.savething(r.body);
          
        },
        error: (error) => {
          this.not.showError('An error occurred while generating the report:', error)
          
        }
      }
  
      );
      }
      catch (error) {
        this.not.showError('An error occurred while generating the report. check the console for more details');
        console.error('An error occurred:', error);
      }
  
    }
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
