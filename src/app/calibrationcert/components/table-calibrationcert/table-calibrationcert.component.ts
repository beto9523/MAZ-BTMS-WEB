import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgbdSortableHeader } from '@Services/table/sortable.directive';
import { calibrationCertViewModel } from '@ViewModels/calibrationCert/calibrationCertViewModel';
import { Observable } from 'rxjs';
import { ModalOrdersComponent } from '../../../work-order/components/modal-orders/modal-orders.component';
import { DataTableService } from '@Services/table/table.service';
import { ModalCalibrationcertComponent } from '../modal-calibrationcert/modal-calibrationcert.component';
import { CalibrationCertService } from '@Services/calibrationcert/calibrationcert.service';
import { FechaFormatPipe } from '../../../shared/pipes/dateFormt.pipe';
import { NotificationService } from '../../../core/services/notifications/notification.service';

@Component({
  selector: 'app-table-calibrationcert',
  templateUrl: './table-calibrationcert.component.html',
  styleUrl: './table-calibrationcert.component.css'
})
export class TableCalibrationcertComponent {
  data$: Observable<calibrationCertViewModel[]>;
	total$: Observable<number>;
	pagL$: Observable<number>;
	pagR$: Observable<number>;

  certificates: calibrationCertViewModel[] =  [ ];

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
	@ViewChild(ModalCalibrationcertComponent) modalCalib!: ModalCalibrationcertComponent;
  selectedFile?: File;
  constructor(
    public service: DataTableService<calibrationCertViewModel>,
    private calibrationCertService: CalibrationCertService
    , private fechaPipe: FechaFormatPipe
    , private not: NotificationService 

  ) {
    this.data$ = this.service.data$;
    this.total$ = this.service.total$;
    this.pagL$ = this.service.pagL$;
    this.pagR$ = this.service.pagR$;

	}

  ngOnInit() {
    this.service.sortDirection = 'asc';
    this.service.sortColumn = 'id_cal_cer';
    this.service.url = 'CalibrationCertificate/GetCalibrationCertificatesPagination';
  }

  reloadTable() {
    this.service.reload();
  }
  editWO(certificate: calibrationCertViewModel) {
    //this.modalCalib.open(certificate);
  }
  openEdit(id:string){
    this.modalCalib.open(id);
  }
  editCertFile(id:string){
    const inputFile = document.getElementById('file-'+id) as HTMLInputElement;
    inputFile.click();
  }
  ConverToDateFormat( ctrlValue:string ){
    let ff=ctrlValue;
let mdate=new Date(ff);
let strDate= this.fechaPipe.transform(mdate,7);
return strDate!;
  }


  onSelectFile(fileInput: any, id:string) {
    if(fileInput.target.files.length>0){
    this.selectedFile = <File>fileInput.target.files[0];
    this.idcert=id;
    this.uploadEditedFile();
    }
  }
  idcert:string="";
  getFormValuesAsFormData(){
    let formdata: FormData;
    formdata= new FormData();
    
    
    formdata.append("workNumber","1"  );
    formdata.append("locationId","1" );

    formdata.append("testMachineId","1" );

    formdata.append("uploadBy","1" );

    formdata.append("certificateDate", this.ConverToDateFormat(new Date().toString())  );
    formdata.append("validFrom",this.ConverToDateFormat(new Date().toString())   );
    formdata.append("validTo",this.ConverToDateFormat(new Date().toString())  );


    formdata.append("locationUsed","1" );
    formdata.append("notes","na" );
    formdata.append("authorizedBy","1" ); 
    formdata.append("pathcert","");
    formdata.append("woId","1"   );


    formdata.append("id", this.idcert );
    formdata.append("myfile", this.selectedFile!);
    formdata.append("action","2");

    return formdata;
  }
  
  uploadEditedFile(){
    let modelform= this.getFormValuesAsFormData();

        this.calibrationCertService.AddCalibratioCert(modelform).subscribe({
          next:(e)=>{
           this.not.showInfo("File Updated!");
          }
        })
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
