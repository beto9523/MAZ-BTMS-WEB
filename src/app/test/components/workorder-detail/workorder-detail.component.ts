import { Component, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { WorkOrderService } from '../../../core/services/WorkOrder/work-order.service';
import { UserService } from '@Services/user/user.service';
import { TestService } from '../../../core/services/test/test.service';
import { TestInputModel } from '@InputModels/testReport/TestInputModel';

@Component({
  selector: 'app-workorder-detail',
  templateUrl: './workorder-detail.component.html',
  styleUrl: './workorder-detail.component.css'
})
export class WorkorderDetailComponent {
constructor(
  private fb:FormBuilder

, private workOrderService:WorkOrderService
, private userService: UserService 
, private testService:TestService


){


 this.userCode= userService.getUserModel()?.userCode;
 this.setFormValues();
 this.getallPWO();

}


model: TestInputModel= new TestInputModel();
form!: FormGroup;
userCode:number|undefined;
PWO = {
  pwoname: '',
  serialNumber: '',
};

serialnumbers: string[] = [];
pwoallvalues: string[] = [];
  pwoallvaluesTemp: string[] = [];
  checkRequired(str: string){
    return this.form.get(str)?.hasValidator(Validators.required);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getallPWO();
  }

  getallPWO() {
    this.workOrderService.getWorkOrderNumber('',null).subscribe({
      next: (value) => {
        {
          for (let i = 0; i < value.dataResponse.length; i++) {
            this.pwoallvalues[i] = value.dataResponse[i].woNumber;
          }
          this.pwoallvalues = this.pwoallvalues.filter(
            (n, i) => this.pwoallvalues.indexOf(n) === i
          );
          this.pwoallvaluesTemp=this.pwoallvalues;
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
      target: ['', [Validators.required, Validators.min(0)]],
      ctrl_customer: '',
      ctrl_WO: '',
      legs: '',
      testype: ['',  [Validators.required]],
      method: ['',  [Validators.required]],
      geometry: ['',  [Validators.required]],
      notes: '',
      notesoff: '',
      name_customer:''
    });

    this.serialnumbers=[]

  }
  
  getCombo(id: string) {
    this.workOrderService.getWorkOrderNumber(id,null).subscribe({
      next: (value) => {
        {
          for (let i = 0; i < value.dataResponse.length; i++) {
            this.serialnumbers[i] = value.dataResponse[i].serial;
          }
        }
      },
    });
  }
  
  onSelectSerial(event: any) {
    this.PWO.serialNumber = event.value;
    this.GetValuesFromSerial(event.value);

  }
  
  filterSerialNumbers(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.serialnumbers.length; i++) {
      let _SN = this.serialnumbers[i];
      if (_SN.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(_SN);
      }
    }
    this.serialnumbers = filtered;
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
  filterPWO(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.pwoallvalues.length; i++) {
      let _SN = this.pwoallvalues[i];
      if (_SN.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(_SN);
      }
    }
    this.pwoallvaluesTemp = filtered;
  }
  setInputModel() {
    
    this.model.action = 5;
    this.model.testId = 13;
    this.model.testTypeId = this.form.get('ctrlType')?.value,
    this.model.testMethodId =  this.form.get('ctrlMethod')?.value,
    this.model.geometryId = this.form.get('ctrlGeometry')?.value,

    this.model.targetTest = this.form.get('target')?.value,

    this.model.workOrderId = this.form.get('pwo')?.value;

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
  }
  EditTest(){
    this.setInputModel();
    this.testService.editTest(this.model).subscribe({
      next:(e)=>{
        console.log(e);
      }
    });
  }
  getvalues(workOrderNumber: string) {
    if (this.PWO.serialNumber === '') {
      this.setFormValues();
    }
    if (this.PWO.pwoname !== '') {
      this.workOrderService.getWorkOrderNumber(workOrderNumber,null).subscribe({
        
        next: (value) => {
          {
            this.form = this.fb.group({
              pwo:     [[value.dataResponse[0].woNumber], [Validators.required]],
              work_order_id: value.dataResponse[0].id_pwo,
              item: value.dataResponse[0].item,
              custpo: value.dataResponse[0].poNumber,
              Description: value.dataResponse[0].descriptionItem,
              Operator: this.userCode,
              chain: value.dataResponse[0].chain,
              wll: value.dataResponse[0].wll,
              target: ['', [Validators.required, Validators.min(0)]],
              name_customer: value.dataResponse[0].customerName,
              legs: value.dataResponse[0].legs,
              ctrl_WO: '',
              notes: '',
              notesoff: '',

            });
            this.getCombo(this.PWO.pwoname);
            this.form.controls['ctrl_WO'].setValue(
              value.dataResponse[0].serial
            );
          }
        },
      });
    }
  }
  onSelectPWO(event: any) {
    this.PWO.pwoname = event.value;
    this.getvalues(this.PWO.pwoname)
    this.serialnumbers=[]
  }
  

  changePWO(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.PWO.pwoname = newValue;
    if(this.PWO.pwoname === ''){
      this.setFormValues()
    }
  }

}
