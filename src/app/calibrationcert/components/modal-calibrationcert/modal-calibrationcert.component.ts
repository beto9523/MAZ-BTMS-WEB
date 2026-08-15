import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { calibrationCertInputModel } from '@InputModels/calibrationCert/CalibrationCertInputModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalibrationCertService } from '../../../core/services/calibrationcert/calibrationcert.service';
import { FechaFormatPipe } from '../../../shared/pipes/dateFormt.pipe';
import { Console } from 'console';
import { calibrationCertViewModel } from '@ViewModels/calibrationCert/calibrationCertViewModel';
import { WorkOrderService } from '@Services/WorkOrder/work-order.service';
import { FiltrostestComponent } from '../../../test/components/filtrostest/filtrostest.component';


import { ListboxChangeEvent } from 'primeng/listbox';
import { TestTypeService } from '@Services/testCatalogs/TestType/test-type.service';
import { TestStatusService } from '@Services/testCatalogs/TestStatus/test-status.service';
import { TestGeometryService } from '../../../core/services/testCatalogs/TestGeometry/test-geometry.service';
import { CatalogViewModel } from '../../../core/viewModels/shared/CatalogViewModel';
import { ngCtrlDropDownViewModel } from '@ViewModels/TestFilter/ngCtrlDropDownViewModel';
import { TestService } from '@Services/test/test.service';
import { CatalogServiceService } from '@Services/testCatalogs/catalog-service.service';
import { Observable, Subscription, filter, map } from 'rxjs';
import { CustomerService } from '@Services/customer/customer.service';
import { OnInit,Injectable, Inject } from '@angular/core';
import { FilterTestViewModel } from '@ViewModels/test/FilterTestViewModel';
import { FilterTestTotalViewModel } from '@ViewModels/test/FilterTestTotalViewModel';
import { JanusResponse } from '@Responses/JanusResponse';
import { NotificationService } from '@Services/notifications/notification.service';
import { UserModel } from '@InternalModels/user/UserModel';
import { UserService } from '../../../core/services/user/user.service';



@Component({
  selector: 'app-modal-calibrationcert',
  templateUrl: './modal-calibrationcert.component.html',
  styleUrl: './modal-calibrationcert.component.css'
})

export class ModalCalibrationcertComponent {
  @ViewChild('content') content: any; modalReference: any;
  @Input() isEdit = false;
  @Output() reloadTable: EventEmitter<void> = new EventEmitter<void>();
  //model: calibrationCertInputModel;
  title: string = "";
  form!: FormGroup;
  currentOrder: string = '';
  isSubmitting: boolean = false;
  customerallvalues: string[] = [];
  customerallvaluesTemp: string[] = [];
  model?: calibrationCertInputModel ;
  selectedFile:File|undefined;
  loged: UserModel |null;

  
  Customer = {
    CustomerName: ''
  };

  constructor(
    private modalService: NgbModal,
    //private workOrderService: WorkOrderService,
    private not: NotificationService,
    private fb: FormBuilder,
    private calibrationCertService: CalibrationCertService
    , private fechaPipe: FechaFormatPipe
  //  private userService: UserService
  , private workOrderService: WorkOrderService
, private userService:UserService 
  )
    
    {
    //this.setFormValuesNew();
    this.loged= this.userService.getUserModel();
    
    }

  changeCustomer(event: Event) {
    const input = event.target as HTMLInputElement;
    this.Customer.CustomerName = input.value;
  }
  
  setDropDownWithFirstOption(xcatalog: ngCtrlDropDownViewModel[]){
    let f: ngCtrlDropDownViewModel={  value: '', label:FiltrostestComponent.strFirstOptionControl };
    xcatalog.unshift(f);
    return xcatalog;
  }
  dataset: labelid[ ] = [{label:"rohit",id:1},{label:"koli",id:2}];

filteredresults: labelid[ ] = [ ];

searchFromList(event:any) {
    this.filteredresults= this.dataset
        .filter(data => data.label.toString()
            .toLowerCase()
            .indexOf(event.query.toString().toLowerCase()) !== -1);
}

showDropdown() {
    this.filteredresults;
}
  
  setAutoCompleteWithFirstOption(ctrlName:string, arrOriginal: ngCtrlDropDownViewModel[], arrAux: string[], value:JanusResponse<CatalogViewModel[]>  ){
    arrOriginal= this.setDropDownWithFirstOption(TestService.ConvertCatToNgDropDown(value.dataResponse));
    this.form.get(ctrlName)?.setValue(arrOriginal[0].value);

    arrOriginal.forEach(element => {
      arrAux.push(element.label);
    });
    
  }


  fill_ctrl_generic2(cat: Observable<JanusResponse<CatalogViewModel[]>> ):Observable<ngCtrlDropDownViewModel[]>{
    return cat
    .pipe(
      map(value => {
      const dropDown = TestService.ConvertCatToNgDropDown(value.dataResponse);
      return dropDown;
    })

    )
     
  }

  fill_Catalogs(){

    this.fill_ctrl_generic2(this.workOrderService.getWorkOrderCat()).subscribe(ctrlList=>{
     this.WO=ctrlList;
    });
    this.fill_ctrl_generic2(this.calibrationCertService.GetLocations()).subscribe(ctrlList=>{
      this.locations=ctrlList;
     });
     this.fill_ctrl_generic2(
      this.calibrationCertService.GetTestMachines()).subscribe(ctrlList=>{
      this.machines=ctrlList;
     });

  }
  WO:ngCtrlDropDownViewModel[]=[];
  locations:ngCtrlDropDownViewModel[]=[];
  machines:ngCtrlDropDownViewModel[]=[];

  onUploadEvt(event:any) {

         
          if(event.files || event.files[0]){
            this.readFileAsBytes(event.files[0]);
       
          }
         
    }
mbytes?: Uint8Array;
    readFileAsBytes(file: File) {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        this.mbytes = new Uint8Array(arrayBuffer);
        this.form.controls["ctrlFiles"].setValue(this.mbytes);
      };
      reader.readAsArrayBuffer(file);
    }
  onSelectCustomer(event: any) {
    this.Customer.CustomerName = event.value;
  }
  ConverToDateFormat( ctrlValue:string ){
    let ff=ctrlValue;
let mdate=new Date(ff);
let strDate= this.fechaPipe.transform(mdate,7);
return strDate!;
  }

  getFormValuesAsFormData(){
    let formdata: FormData;
    formdata= new FormData();
    let paramUploadBy:string='';
    if (this.isEdit==false){
      paramUploadBy= (this.loged?.userCode!=null)?this.loged.userCode.toString():"";
    }
    else{
      paramUploadBy=  (this.model?.uploadBy!=null)?this.model.uploadBy.toString():""; 
    }


    formdata.append("workNumber", this.form.controls["ctrlWO"].value);

    formdata.append("testMachineId", this.form.controls["ctrlTestMachine"].value);

    formdata.append("uploadBy",paramUploadBy)  ;

    formdata.append("certificateDate",  this.ConverToDateFormat(this.form.controls["ctrlCertDate"].value));
    formdata.append("validFrom",  this.ConverToDateFormat(this.form.controls["ctrlValidFromTo"].value[0]));
    formdata.append("validTo", this.ConverToDateFormat(this.form.controls["ctrlValidFromTo"].value[1]));
    formdata.append("myfile", this.selectedFile!);


    formdata.append("locationUsed", this.form.controls["ctrlLocationUsed"].value);
    formdata.append("notes", this.form.controls["ctrlNotes"].value);
    formdata.append("pathcert", "dd");

    formdata.append("id", (this.model?.id!=null)?this.model?.id!:"" );
    formdata.append("woId", (this.model?.woId!=null)?this.model?.woId!:this.form.controls["ctrlWO"].value  );
    formdata.append("authorizedBy", "1"); 

    formdata.append("action",(this.isEdit)?"4":"1");

    return formdata;

  }

  getFormValues(){
    

    let modelVal: calibrationCertInputModel = {
      calibration_certificate_id : (this.model?.calibration_certificate_id!=null)?this.model?.calibration_certificate_id:null,
    workNumber:  this.form.controls["ctrlWO"].value,
    uploadBy:  this.form.controls["ctrlUploadBy"].value,
    
    certificateDate:  this.form.controls["ctrlCertDate"].value,
    validFrom: this.form.controls["ctrlValidFromTo"].value[0],
    validTo:this.form.controls["ctrlValidFromTo"].value[1],
    locationId:this.form.controls["ctrlLocation"].value,
    testMachineId: this.form.controls["ctrlTestMachine"].value,
    locationUsed:this.form.controls["ctrlLocationUsed"].value,
    notes:this.form.controls["ctrlNotes"].value,

    Myfile:  this.form.controls["ctrlFiles"].value,
    file:undefined,
    formData:undefined,
    fileBase64:''
    }
    return modelVal;
  }
  onClose() {
    this.calibrationServSuscription?.unsubscribe();
    this.modalService.dismissAll();

}
  filterCustomer(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.customerallvalues.length; i++) {
      let _SN = this.customerallvalues[i];
      if (_SN.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(_SN);
      }
    }
    this.customerallvaluesTemp = filtered;
  }
  onSelect(event: any) {
    this.Customer.CustomerName = event.value;
  }
  
  checkRequired(str: string){
    return this.form.get(str)?.hasValidator(Validators.required);
  }
  setFormValuesCommon(){
    this.form = this.fb.group({
      ctrlTestMachine: [this.model?.testMachineId ,Validators.required],
      ctrlLocationUsed: [this.model?.locationUsed ,Validators.required],
      ctrlNotes: [this.model?.notes ,Validators.required],
      anyFormControlName: []
    });
  }

  setFormValuesNew(){

    this.setFormValuesCommon();
    this.form.addControl("ctrlWO",new FormControl(this.model?.workNumber ,[Validators.required]));
    this.form.addControl("ctrlCertDate",new FormControl( "" ,[Validators.required]));
    this.form.addControl("ctrlValidFromTo",new FormControl("" ,[Validators.required]));
    this.form.addControl("files2",new FormControl("" ,[Validators.required]));

  }

  setFormValuesEdit(){
   this.setFormValuesCommon();
    this.form.addControl("ctrlWO",new FormControl(this.model?.woId ,[Validators.required]));
    this.form.addControl("ctrlCertDate",new FormControl( new Date(this.model?.certificateDate!) ,[Validators.required]));
    this.form.addControl("ctrlValidFromTo",new FormControl([new Date(this.model?.validFrom!), new Date(this.model?.validTo!)] ,[Validators.required]));

  }

  onSelectFile(fileInput: any) {
    this.selectedFile = <File>fileInput.target.files[0];
  }
  convertBytesToBase64(mbytes: Uint8Array){
    let fuckingbytes:Uint8Array= mbytes;
    const moreShit = Array.prototype.slice.call(fuckingbytes);

    const chunkSize = 65536; // Tamaño del chunk
const binaryStrings = [];

for (let i = 0; i < moreShit.length; i += chunkSize) {
  const chunk = moreShit.slice(i, i + chunkSize);
  const binaryString = String.fromCharCode.apply(null, chunk);
  binaryStrings.push(binaryString);
}

// Unir las cadenas binarias en una sola
const base64Str = binaryStrings.join('');
return base64Str;
  }
  calibrationServSuscription?: Subscription ;

  
  onFormSubmit(){
    
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.not.showFormError();
      return;
    }
  

    this.isSubmitting = true;
    const myformdata = this.getFormValuesAsFormData();
const observer={
  next: function(){

  }
}
    
    this.calibrationServSuscription = this.calibrationCertService.AddCalibratioCert(myformdata).subscribe(
      
      {
      next:(e)=>{
        this.not.showSuccess(this.msgSucessApi);
        this.modalService.dismissAll();
        this.reloadTable.emit();
        console.log(e.dataResponse);
      }
  });
  
      
  }
convertViewModelToInputModel(mviewModel: calibrationCertViewModel|undefined){
 const _calibrationCertInputModel = new calibrationCertInputModel();
 _calibrationCertInputModel.woId= mviewModel?.woId;
 _calibrationCertInputModel.id= mviewModel?.id;
 _calibrationCertInputModel.locationUsed= mviewModel?.locationUsedCalibrate;
 _calibrationCertInputModel.locationId= mviewModel?.locationId;
 _calibrationCertInputModel.authorizedBy= mviewModel?.authorizedById
 _calibrationCertInputModel.testMachineId= mviewModel?.testMachineId;

 _calibrationCertInputModel.workNumber= mviewModel?.woNumber;
 _calibrationCertInputModel.uploadBy= mviewModel?.uploadById;
 _calibrationCertInputModel.uploadByUserName= mviewModel?.uploadBy;

 _calibrationCertInputModel.certificateDate=mviewModel?.certificateDate;

 _calibrationCertInputModel.validFrom= mviewModel?.validFrom;
 _calibrationCertInputModel.validTo= mviewModel?.validTo;

 _calibrationCertInputModel.notes= mviewModel?.notes;
return _calibrationCertInputModel;

}
openNew(){
  this.title = "Add "+ "Calibration Cert";
  this.msgSucessApi="New Calibration Cert Added";
  this.setFormValuesNew();
  this.isEdit=false;
  
  
}
msgSucessApi="";
openEdit(idcert:string){
  this.isEdit=true;
  this.title = "Edit "+"Calibration Cert";
  this.msgSucessApi="Updated!";

  this.calibrationCertService.GetCalibratioCert(idcert)
  .subscribe(
    {
    
      next:(e)=>{
        
        const _calibrationCertInputModel = new calibrationCertInputModel();
        this.model= this.convertViewModelToInputModel(e);
        this.setFormValuesEdit();
       
       
      }
    }
  )
}
  open(idcert:string) {
    this.fill_Catalogs();

    if(idcert==""){
      this.openNew();
    }
    else{
      this.openEdit(idcert);
    }
    let modalRef = this.modalService.open(this.content, {
      ariaLabelledBy: 'user-modal',
      size: 'lg' ,
      backdrop: 'static',
      keyboard: false }).result.then(
        (result) => {
          return result;
        }
      );
  
      modalRef.then(
        (result) => {
  
        },
        (reason) => {
  
        }
      ).catch((error) => {
  
      });

    
	}
}
export class labelid {
  label: string=''
  id: number=0
  }