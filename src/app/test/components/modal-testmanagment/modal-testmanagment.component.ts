import { Component, SimpleChanges, ViewChild, EventEmitter, Output, NgZone } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TestService } from '../../../core/services/test/test.service';
import { ngDropDown } from '@Utils/primeng/ngDropDown';
import { TestTypeService } from '@Services/testCatalogs/TestType/test-type.service';
import { TestMethodService } from '@Services/testCatalogs/TestMethod/test-method.service';
import { TestGeometryService } from '../../../core/services/testCatalogs/TestGeometry/test-geometry.service';
import { ngCtrlDropDownViewModel } from '../../../core/viewModels/TestFilter/ngCtrlDropDownViewModel';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@Services/user/user.service';
import { WorkOrderService } from '@Services/WorkOrder/work-order.service';
import { TestInputModel } from '@InputModels/testReport/TestInputModel';
import { map, pluck, take } from 'rxjs/operators';
import { JanusResponse } from '@Responses/JanusResponse';
import { testViewModel } from '@ViewModels/test/testViewModel';
import { PaginationViewModel } from '@ViewModels/shared/PaginationViewModel';
import { ngAutoCompleteOptions } from '@Utils/primeng/ngAutoCompleteOptions';
import { ngAutoComplete } from '@Utils/primeng/ngAutoComplete';
import Swal from 'sweetalert2';
import { NotificationService } from '../../../core/services/notifications/notification.service';
import { Observable } from 'rxjs';
import { CatalogViewModel } from '@ViewModels/shared/CatalogViewModel';

@Component({
  selector: 'app-modal-testmanagment',
  templateUrl: './modal-testmanagment.component.html',
  styleUrl: './modal-testmanagment.component.css'
})
export class ModalTestmanagmentComponent {
  @ViewChild('content') content: any;
idTest?:number;
Type:ngCtrlDropDownViewModel[]=[] ;
Method:ngCtrlDropDownViewModel[]=[] ;

pwoOptions: ngAutoCompleteOptions[]=[];
pwoOptionsAll: ngAutoCompleteOptions[]=[];

Geometry:ngCtrlDropDownViewModel[]=[] ;
form!:FormGroup;
@Output() reloadTable = new EventEmitter<void>();

constructor(private modal:NgbModal
 
  , private testService: TestService,
  private typeService: TestTypeService,
  private methodService : TestMethodService,
  private geometryService:TestGeometryService
  ,private fb: FormBuilder
  
, private workOrderService:WorkOrderService
, private userService: UserService 
, private Not:NotificationService
,private zone: NgZone
)
{
  
 this.fillCatalogs();

this.userCode= userService.getUserModel()?.userCode;
this.setFormValues();
this.getAllPWO();
}

 

model: TestInputModel= new TestInputModel();
userCode:number|undefined;
PWO = {
  pwoname: '',
  serialNumber: '',
};

serialNumbers: string[] = [];
   checkRequired(str: string){
    return this.form.get(str)?.hasValidator(Validators.required);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getAllPWO();
  }

  getAllPWO() {  
    this.workOrderService.getWorkOrderNumber('',null).subscribe({
      next: (value) => {
        {
          for (let i = 0; i < value.dataResponse.length; i++) {
            let f:ngAutoCompleteOptions= {
              label:value.dataResponse[i].woNumber,
              id: value.dataResponse[i].id_pwo
           }
           this.pwoOptionsAll.push(f);
    
          }
         
          this.pwoOptions=this.pwoOptionsAll;

        }
      },
    });
  } 
  setFormValues() {
    this.form = this.fb.group({
      pwo:  ['',  [Validators.required]],
      item: '',
      custpo: '',
      Description: '',
      Operator: '',
      chain: '',
      wll: '',
      target: ['', [Validators.required]],
      ctrl_customer: '',
      ctrl_WO: '',
      legs: '',
      ctrlType: ['',  [Validators.required]],
      ctrlMethod: ['',  [Validators.required]],
      ctrlGeometry: ['',  [Validators.required]],
      notes: '',
      notesoff: '',
      name_customer:''
    });

    this.serialNumbers=[]

  }
  
  getCombo(id: string) {
    this.workOrderService.getWorkOrderNumber(id,null).subscribe({
      next: (value) => {
        {
          for (let i = 0; i < value.dataResponse.length; i++) {
            this.serialNumbers[i] = value.dataResponse[i].serial;
          }
        }
      },
    });
  }
  
  onSelectSerial(event: any) {
    this.PWO.serialNumber = event.value;
    //this.GetValuesFromSerial(event.value);

  }
  
  filterSerialNumbers(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.serialNumbers.length; i++) {
      let _SN = this.serialNumbers[i];
      if (_SN.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(_SN);
      }
    }
    this.serialNumbers = filtered;
  }
  
  GetValuesFromSerial(workOrderNumber: string) {
    this.workOrderService.getWorkOrderNumber(null,workOrderNumber).subscribe({
      next: (value) => {
        {
          this.form = this.fb.group({
            pwo: value.dataResponse[0].woNumber,
            work_order_id: value.dataResponse[0].id_pwo,
            item: value.dataResponse[0].item,
            custpo: value.dataResponse[0].poNumber,
            Description: value.dataResponse[0].descriptionItem,
            Operator: this.userCode,
            chain: value.dataResponse[0].chain,
            wll: value.dataResponse[0].wll,
            target: '',
            name_customer: value.dataResponse[0].customerName,
            legs: value.dataResponse[0].legs,
            notes: '',
            notesoff: '',
            ctrlType: ['',  [Validators.required]],
            ctrlMethod: ['',  [Validators.required]],
            ctrlGeometry: ['',  [Validators.required]],

            ctrl_WO: value.dataResponse[0].serial,
          });

        }

      },
    });
  }
  changeSerial(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.PWO.serialNumber = newValue;
    this.getvalues(this.PWO.serialNumber);

  }
  
  filterOptions(event: any , catalog :  ngAutoCompleteOptions[]=[], catalogAll: ngAutoCompleteOptions[]) {
     /*we need to assign the global variable from withing the scope of this function
     otherwise angular engine wont detect its value has changed and the ng prime control ll keep
     loading FOREVER. ng zone DOESNT WORK!  */    
     this.pwoOptions= ngAutoComplete.Filter(event,catalog,catalogAll);
     
     
   }

  filterPWOOptions(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.pwoOptionsAll.length; i++) {
      let _SN = this.pwoOptionsAll[i];
      if (_SN.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(_SN);
      }
    }
    this.pwoOptions = filtered;
 
  }
   
  setInputModel(idtest:number) {
    
    this.model.action = 5;
    this.model.testId = idtest;
    this.model.testTypeId = this.form.get('ctrlType')?.value,
    this.model.testMethodId =  this.form.get('ctrlMethod')?.value,
    this.model.geometryId = this.form.get('ctrlGeometry')?.value,

    this.model.targetTest = this.form.get('target')?.value,

    this.model.workOrderId =this.form.get('pwo')?.value.id;
    this.model.workOrderNumber= this.form.get('pwo')?.value.label;
    this.model.locationId = 1;
    this.model.testMachineId = 1;
    this.model.operatorId = 1;
    this.model.kindTestId = 1;
    
    this.model.hold = new Date();
    this.model.uomId = 1;
    this.model.temperature = '200';
    this.model.humidity = 'HIGH';
    this.model.testStatusId = 1;
    this.model.notes = ''
    this.model.notesOff = ''
    this.model.guardFlag = 1;
    this.model.loadRateTarget = 1;
    this.model.lengthTest = 1;
    this.model.enabledTest = 1;
    this.model.user = this.userCode?.toString()!;
    this.model.signature = '';
    return this.model;
  }
  EditTest(){

    this.setInputModel(this.model.testId!);
     this.testService.editTest(this.model).subscribe({
      next:(e)=>{
        this.Not.showSuccess('Test Edited Succefully!');
        this.reloadTable.emit();
        this.modal.dismissAll();
      }
    });
  }
   
  clearWorkOrderForm( ){
  
    
       this.form.get("item")?.setValue(  ""  );
      this.form.get("custpo")?.setValue("" );
      this.form.get("Description")?.setValue("" );
      this.form.get("Operator")?.setValue("" );
      this.form.get("chain")?.setValue( "" );
      this.form.get("wll")?.setValue( "" );
       this.form.get("name_customer")?.setValue(""   ) ;
      this.form.get("legs")?.setValue(  "" );
   
    //this.getCombo(this.PWO.pwoname);
    this.form.controls['ctrl_WO'].setValue(
      ""

    );
 
  }
  fillWorkOrderForm(value:any){
    let autocompleteWO:ngAutoCompleteOptions ={
       label:value.dataResponse[0].woNumber,
       id:value.dataResponse[0].id_pwo  
    }; 
    
      this.form.get("pwo")?.setValue(autocompleteWO);
      this.form.get("item")?.setValue(value.dataResponse[0].item);
      this.form.get("custpo")?.setValue(value.dataResponse[0].poNumber);
      this.form.get("Description")?.setValue(value.dataResponse[0].descriptionItem);
      this.form.get("Operator")?.setValue( this.userCode);
      this.form.get("chain")?.setValue( value.dataResponse[0].chain);
      this.form.get("wll")?.setValue( value.dataResponse[0].wll );
       this.form.get("name_customer")?.setValue( value.dataResponse[0].customerName ) ;
      this.form.get("legs")?.setValue( value.dataResponse[0].legs  );
  
     this.form.controls['ctrl_WO'].setValue(
      value.dataResponse[0].serial

    );
 
  }
  getvalues(workOrderNumber: string) {
    if (workOrderNumber === '') {
this.clearWorkOrderForm();

}
    if (workOrderNumber !== '') {
      this.workOrderService.getWorkOrderNumber(workOrderNumber,null).subscribe({
        
        next: (value) => {
          {
            
          this.fillWorkOrderForm(value)
          }
        },
      });
    }
  }
  onSelectPWO(event: any) {

    this.getvalues(event.value.label)
    this.serialNumbers=[]
  }

  changePWOOption(event: Event) {
    
     const input = event.target as HTMLInputElement;
    if(input.value === ''){
      this.clearWorkOrderForm()
    }
  }

  changePWO(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.PWO.pwoname = newValue;
    if(this.PWO.pwoname === ''){
      this.clearWorkOrderForm();
    }
  } 
  fillCatalogsGeneric(cat:Observable<JanusResponse<CatalogViewModel[]>> )
  {
    let ngdropDown: ngDropDown= new ngDropDown();
  

  ngdropDown.fill_ctrl_generic2(
    cat).subscribe(
      ctrlList=>{
        return ctrlList;
      }
       
    )
  ;
  }
fillCatalogs()
{
  let ngdropDown: ngDropDown= new ngDropDown();
  

  ngdropDown.fill_ctrl_generic2(
    
    this.typeService.GetAll())
    .subscribe(
      
      ctrlList=>{
      this.Type=ctrlList;

     });

     ngdropDown.fill_ctrl_generic2(
    
      this.methodService.GetAll()).subscribe(ctrlList=>{
        this.Method=ctrlList;
       });

       ngdropDown.fill_ctrl_generic2(
    
        this.geometryService.GetAll()).subscribe(ctrlList=>{
          this.Geometry=ctrlList;
         });
    
}

getTestId(idTest:number)
{

this.testService.GetById(idTest)
.pipe(
  map((response: JanusResponse<PaginationViewModel<testViewModel>>) => {
    return response.dataResponse;
  })
  ,map((r:PaginationViewModel<testViewModel>)=>{
    return r.data[0];
  })
  
 
)
.subscribe((firstViewModel: testViewModel|null) => {

  
  

  this.workOrderService.getWorkOrderNumber(firstViewModel?.wo!,null).subscribe({
        
    next: (value) => {
      {
         
      this.fillWorkOrderForm(value);
      this.form.get("target")?.setValue(firstViewModel?.targetTest);
      this.form.get("ctrlType")?.setValue(this.Type.find(a=>a.label== firstViewModel?.type)?.value);
      this.form.get("ctrlMethod")?.setValue(this.Method.find(a=>a.label== firstViewModel?.method)?.value);
      this.form.get("ctrlGeometry")?.setValue(this.Geometry.find(a=>a.label== firstViewModel?.geometry)?.value);
 
      
      }
    },
  });
 
});

 
}

open(idTest?:number) {

  if(idTest!=null){  
  this.model.testId=idTest;
    this.getTestId(idTest!);
  }
    let modalRef = this.modal.open(this.content, {
    ariaLabelledBy: 'modal',
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
