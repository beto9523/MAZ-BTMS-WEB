import {
  Component,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  EventEmitter,
  AfterViewInit,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';
import { UserViewModel } from '@ViewModels/users/UserViewModel';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ListboxChangeEvent } from 'primeng/listbox';
import { WorkOrderService } from '@Services/WorkOrder/work-order.service';
import { TestTypeService } from '@Services/testCatalogs/TestType/test-type.service';
import { TestStatusService } from '@Services/testCatalogs/TestStatus/test-status.service';
import { TestGeometryService } from '../../../core/services/testCatalogs/TestGeometry/test-geometry.service';
import { CatalogViewModel } from '../../../core/viewModels/shared/CatalogViewModel';
import { ngCtrlDropDownViewModel } from '@ViewModels/TestFilter/ngCtrlDropDownViewModel';
import { TestService } from '@Services/test/test.service';
import { CatalogServiceService } from '@Services/testCatalogs/catalog-service.service';
import { Observable, filter, map } from 'rxjs';
import { CustomerService } from '@Services/customer/customer.service';
import { OnInit,Injectable, Inject } from '@angular/core';
import { FilterTestViewModel } from '@ViewModels/test/FilterTestViewModel';
import { FilterTestTotalViewModel } from '@ViewModels/test/FilterTestTotalViewModel';
import { JanusResponse } from '@Responses/JanusResponse';
import { NotificationService } from '@Services/notifications/notification.service';
import { ngAutoCompleteOptions } from '@Utils/primeng/ngAutoCompleteOptions';




@Component({
  selector: 'app-filtrostest',
  templateUrl: './filtrostest.component.html',
  styleUrl: './filtrostest.component.css',
  encapsulation:ViewEncapsulation.None,

})

@Injectable({
  providedIn: 'root'
})
export class FiltrostestComponent implements OnChanges, OnInit,AfterViewInit {
  onSubmit() {
    this.testform.controls['ctrlStatus'].setValue('ctrl_status');
    let _customer_name = this.testform.get('ctrlCustomer')?.value;
  }
  
  onChange($event: ListboxChangeEvent) {}

  testform: FormGroup;
  @Output() changed = new EventEmitter();
@Input()showExport:boolean=true;
  @Output() showTotales = new EventEmitter<FilterTestViewModel>();

  static strFirstOptionControl='Select All';

  customers: ngCtrlDropDownViewModel[] = [];
  filteredCustomers: string[]=[];
  filteredCustomersAux: string[]=[];

  _customer:string[]=[];
  WO:ngCtrlDropDownViewModel[]=[];
  filteredWO: string[]=[];
  filteredWOOriginal: string[]=[];

  type:ngCtrlDropDownViewModel[]=[];
  method?:ngCtrlDropDownViewModel[];
  geometry?:ngCtrlDropDownViewModel[];
  status?:ngCtrlDropDownViewModel[];
  filteredresults: ngAutoCompleteOptions[] = [];
  dataset: ngAutoCompleteOptions[] = [
    { label: 'rohit', id: 1 },
    { label: 'koli', id: 2 },
  ];

  constructor(
    private fb: FormBuilder
    , private workOrderService: WorkOrderService
    ,private testTypeService:TestTypeService
    , private testStatusService:TestStatusService
    , private testMethodService:CatalogServiceService 
    , private  testGeometryService:TestGeometryService
    , private testCustomerService: CustomerService
    , private testService: TestService
    , private not: NotificationService
    ) {

    this.testform = this.fb.group({
      anyForm: ['', Validators.required],

      ctrlStatus: ['', Validators.required],
      ctrlCustomer: ['', Validators.required],
      ctrlWO: ['', Validators.required],
      ctrlType: ['', Validators.required],
      ctrlMethod: ['', Validators.required],
      ctrlGeometry: ['', Validators.required],
      ctrlDate: ['', Validators.required],

    });

    this.fill_Catalogs();
    
    this.filteredCustomers=this._customer;
    this.getWorkOrder();

  }
  searchFromList(event:any) {
    this.filteredresults = this.dataset.filter(
      (data) =>
        data.label
          .toString()
          .toLowerCase()
          .indexOf(event.query.toString().toLowerCase()) !== -1
    );
  }

  showDropdown() {
    this.filteredresults;
  }
  onShowTotales() {
    let m: ngAutoCompleteOptions= this.testform.get("anyForm")?.value;
    console.log(m.id);
    let f=this.get_test_filter();
    this.showTotales.emit(f);
  }
  
  savething(mbase64:any){


    const url = window.URL.createObjectURL(mbase64);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', Date.now().toString()+'.csv');
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    
  }

  exportFilter(){
    let f=this.get_test_filter();
    let m= TestService.setQueryParams(f);

    this.testService.GetCSV(m)
    .subscribe({
      next:(e)=>{
        this.savething(e.body);
        this.not.showSuccess("The filter has been exported sucefully!")
      }
    }
    );
  }
ngOnInit(): void {
}
ngAfterViewInit() {
}

getTestFilterDate(){
  let _testDateEnd:Date = new Date();
  let _testDateStart:Date= new Date() ;
  
  let _testDateEndStr:string ;
  let _testDateStartStr:string ;
  if(this.testform.get('ctrlDate')?.value==''){
    _testDateStartStr='',
    _testDateEndStr=''
  }
  else{
    if(this.testform.get('ctrlDate')?.value[0]!='' && this.testform.get('ctrlDate')?.value[1]==null ){
      _testDateStart= this.testform.get('ctrlDate')?.value[0];
      _testDateEnd.setDate(_testDateStart.getDate()+1);
    }

    else
    {
      _testDateStart= this.testform.get('ctrlDate')?.value[0]
      _testDateEnd=this.testform.get('ctrlDate')?.value[1]
    }
    //change it to a format that acepts the endpoint
    _testDateStartStr= _testDateStart.toISOString().split('T')[0];
    _testDateEndStr= _testDateEnd.toISOString().split('T')[0];;
  }
  return {_testDateStartStr, _testDateEndStr};

}
  get_test_filter(){
   
    let testDate= this.getTestFilterDate();
    let filterTestViewModel: FilterTestViewModel = {   
     geometryId: this.testform.get('ctrlGeometry')?.value,
    testMethodId: this.testform.get('ctrlMethod')?.value,
    testTypeId: this.testform.get('ctrlType')?.value,
    statusId: this.testform.get('ctrlStatus')?.value,
    testDateStart: testDate._testDateStartStr,
    testDateEnd: testDate._testDateEndStr,

    workOrder: (this.testform.get('ctrlWO')?.value)==FiltrostestComponent.strFirstOptionControl?'':this.testform.get('ctrlWO')?.value,
    customerName: (this.testform.get('ctrlCustomer')?.value)==FiltrostestComponent.strFirstOptionControl?'':this.testform.get('ctrlCustomer')?.value,

    }
    return filterTestViewModel;
  
  }



  //#region  Fill da controls
  
  
  fill_ctrl_generic2(cat: Observable<JanusResponse<CatalogViewModel[]>> ):Observable<ngCtrlDropDownViewModel[]>{
    return cat
    .pipe(
      map(value => {
      const dropDown = TestService.ConvertCatToNgDropDown(value.dataResponse);
      return this.setDropDownWithFirstOption(dropDown);
    })

    )
    
  }

  
  setDropDownWithFirstOption(xcatalog: ngCtrlDropDownViewModel[]){
    let f: ngCtrlDropDownViewModel={  value: '', label:FiltrostestComponent.strFirstOptionControl };
    xcatalog.unshift(f);
    return xcatalog;
  }
  
  setAutoCompleteWithFirstOption(ctrlName:string, arrOriginal: ngCtrlDropDownViewModel[], arrAux: string[], value:JanusResponse<CatalogViewModel[]>  ){
    arrOriginal= this.setDropDownWithFirstOption(TestService.ConvertCatToNgDropDown(value.dataResponse));
    this.testform.get(ctrlName)?.setValue(arrOriginal[0].value);

    arrOriginal.forEach(element => {
      arrAux.push(element.label);
    });
    
  }

  fill_ctrl_customer(){
    this.testCustomerService.GetAll().subscribe(
      {
        next:(value)=> {
          this.setAutoCompleteWithFirstOption('ctrlCustomer', this.customers, this.filteredCustomersAux,value );
         
        },
      }
    )
  }
  
  fill_Catalogs(){

     this.fill_ctrl_generic2(this.testTypeService.GetAll()).subscribe(ctrlList=>{
      this.type=ctrlList;
     });

     this.fill_ctrl_generic2(this.testMethodService.GetAll()).subscribe(ctrlList=>{
      this.method=ctrlList;
     });
     this.fill_ctrl_generic2(this.testGeometryService.GetAll()).subscribe(ctrlList=>{
      this.geometry=ctrlList;
     });
     this.fill_ctrl_generic2(this.testStatusService.GetAll()).subscribe(ctrlList=>{
      this.status=ctrlList;
     });
     
     this.fill_ctrl_customer();
  }

  //#endregion

  getWorkOrder(query?:string )
  {
    
    this.workOrderService.queryWorkOrder(query)
.subscribe({
  next:(value)=>{

    this.WO= this.setDropDownWithFirstOption(TestService.ConvertWOToNgDropDown(value.dataResponse));



    this.filteredWOOriginal.length=0;
          this.WO.forEach(element => {
            this.filteredWOOriginal.push(element.label);
          });
  }
});
  }

  //#region  change controls logic
  onSelect(event: any){
    this.testform.controls["ctrlWO"].setValue('');
    let query=event.value;
    if(event.value==FiltrostestComponent.strFirstOptionControl){
      query=null;
    }

    this.getWorkOrder(query);
  }
  filterGeneric(event: any, filtered_array: any, original_array: any[]) {
    let filtered: any[] = [];

    let query = event.query;
    for (let i = 0; i < original_array.length; i++) {
      let customer = original_array[i];
      if (customer.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(customer);
      }
    }
    return filtered;
  }

  filterCustomers(event: any) {
    
    this.filteredCustomers = this.filterGeneric(event, this.filterCustomers, this.filteredCustomersAux);
  }
 
  filterWO(event: any) {
    this.filteredWO = this.filterGeneric(event, this.filteredWO, this.filteredWOOriginal);
  }
//#endregion
  ngOnChanges(changes: SimpleChanges): void {}

}
