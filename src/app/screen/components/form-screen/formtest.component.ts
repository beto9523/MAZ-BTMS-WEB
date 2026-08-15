import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation,} from '@angular/core';
import { UserViewModel } from '@ViewModels/users/UserViewModel';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ModalscreenComponent } from '@Screen/components/modal-screen/modalscreen.component';
import { WorkOrderService } from '@Services/WorkOrder/work-order.service';
import { UserModel } from '@InternalModels/user/UserModel';
import { UserService } from '@Services/user/user.service';
import { TestService } from '@Services/test/test.service';
import { TestInputModel } from '@InputModels/testReport/TestInputModel';
import { NotificationService } from '@Services/notifications/notification.service';
import { TestComponent } from '@Screen/containers/test/test.container';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-formtest',
  templateUrl: './formtest.component.html',
  styleUrls: ['./formtest.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FormtestComponent implements OnChanges {
  @Output() sendflag: EventEmitter<any> = new EventEmitter<any>(); //1
  model: TestInputModel = new TestInputModel();
  title: string = 'Users Management';
  @ViewChild(ModalscreenComponent) modalTest!: ModalscreenComponent;

  selectedValue: any;
  @Input() user: UserViewModel | null = null;
  testForm!: FormGroup;
  loged: UserModel['name'] = '';
  PWO = {
  pwoname: '',
  serialNumber: '',
  };
  id: number = 0;
  serialnumbers: string[] = [];
  pwoallvalues: string[] = [];
  pwoallvaluesTemp: string[] = [];
  isEmptyOrNot = true
  flag = true;
  public idTest=10
  temporal = true;
  UserService: any;
  isSubmitting: boolean = true;
  SignatureOnBase64DB = '';

  ngOnInit() {
    this.selectedCategory = this.categories[1];
  }

  getModal() {
    this.modalTest.openTestSetup();
  }

  recieveBase64(B64: any){
    this.SignatureOnBase64DB = B64;
  }

  constructor(
    
    private workOrderService: WorkOrderService,
    private fb: FormBuilder,
    private userService: UserService,
    private testservice: TestService,
    private not: NotificationService,
    private global: TestComponent
  ) {
    this.setFormValues();
    this.getallPWO();

    this.loged = userService.getUserModel()?.name;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getallPWO();
  }


  onFormSubmit(){
    this.testForm.get('testype')?.setValue(this.testsetup.nametestype)
    this.testForm.get('method')?.setValue(this.testsetup.namemethod)
    this.testForm.get('geometry')?.setValue(this.testsetup.namegeometry)
    if (!this.testForm.valid) {
      this.isSubmitting=false;
      this.not.showFormError();
      return;
    }
    else{
      this.isSubmitting=true
      this.sendflagvalue()
    }
  
  };
    
  

  selectedCategory: any = null;
  categories: any[] = [
    {
      name: 'Manual',
      key: 'A',
      selected: true,
    },
    {
      name: 'Abandon',
      key: 'M',
      selected: false,
    },
    {
      name: 'Re - Test',
      key: 'P',
      selected: false,
    },
  ];

  setFormValues() {
    
    this.testForm = this.fb.group({
      userCode: [this.user?.userCode],
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
      testype: ['',  [Validators.required]],
      method: ['',  [Validators.required]],
      geometry: ['',  [Validators.required]],
      notes: '',
      notesoff: '',
      name_customer:''
    });
    this.testsetup.nametestype=''
    this.testsetup.namemethod=''
    this.testsetup.namegeometry=''
    this.serialnumbers=[]
    this.global.flagforTest = false;
    this.global.flagforChart = false;
    this.disabled = false
    this.disabled2 = false
    this.global.disabled = false
    this.global.categories[0].selected=false

  }
  

  changePWO(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.PWO.pwoname = newValue;
    if(this.PWO.pwoname === ''){
      this.setFormValues()
    }
  }
  changeSerial(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.PWO.serialNumber = newValue;
    this.getValuesFromPWO(this.PWO.serialNumber);

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
        }
      },
    });
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


  getValuesFromPWO(workOrderNumber: string) {
    if (this.PWO.serialNumber === '') {
      this.setFormValues();
    }
    if (this.PWO.pwoname !== '') {
      this.workOrderService.getWorkOrderNumber(workOrderNumber,null).subscribe({
        
        next: (value) => {
          {
            this.testForm = this.fb.group({
              userCode: [this.user?.userCode],
          
              pwo:[[value.dataResponse[0].woNumber], [Validators.required]],
              work_order_id: value.dataResponse[0].id_pwo,
              item: value.dataResponse[0].item,
              custpo: value.dataResponse[0].poNumber,
              Description: value.dataResponse[0].descriptionItem,
              Operator: this.loged,
              chain: value.dataResponse[0].chain,
              wll: value.dataResponse[0].wll,
              target: ['', [Validators.required, Validators.min(0)]],
              name_customer: value.dataResponse[0].customerName,
              legs: value.dataResponse[0].legs,
              testype: ['',  [Validators.required]],
              method: ['',  [Validators.required]],
              geometry: ['',  [Validators.required]],
              ctrl_WO: '',
              notes: '',
              notesoff: '',
            });
            this.getCombo(this.PWO.pwoname);
            this.testForm.controls['ctrl_WO'].setValue(
              value.dataResponse[0].serial
            );
          }
        },
      });
    }
  }

  modelForinsertTest() {
    this.model.action = 1;
    this.model.testId = 13;
    this.model.workOrderId = this.testForm.value.work_order_id;
    this.model.locationId = 1;
    this.model.testMachineId = 1;
    this.model.testTypeId = this.testsetup.idtestype;
    this.model.operatorId = 1;
    this.model.kindTestId = 1;
    this.model.testMethodId = this.testsetup.idmethod;
    this.model.geometryId = this.testsetup.idgeometry;
    this.model.targetTest = this.testForm.value.target;
    this.model.hold = new Date();
    this.model.uomId = 1;
    this.model.temperature = '200';
    this.model.humidity = 'HIGH';
    this.model.testStatusId = 1;
    this.model.notes = this.testForm.value.notes;
    this.model.notesOff = this.testForm.value.notesoff;
    this.model.guardFlag = 1;
    this.model.loadRateTarget = 1;
    this.model.lengthTest = 1;
    this.model.enabledTest = 1;
    this.model.user = this.loged!;
    this.model.signature = this.SignatureOnBase64DB.substring(22);
  }

  InsertOnDataBase() {
    this.testservice.addTest(this.model).subscribe({
      next: (r) => {
        this.idTest=r.dataResponse
        this.sendflag.emit(this.idTest);
        
        this.not.showSuccess('test generated correctly');
      },
    });
  }

  verifyflag() {
    this.flag = !this.flag;
  }
  onSelectPWO(event: any) {
    this.modalTest.CleaningRadios()
    this.PWO.pwoname = event.value;
    this.getValuesFromPWO(this.PWO.pwoname)
    this.serialnumbers=[]
  }

  onSelectSerial(event: any) {
    this.PWO.serialNumber = event.value;
    this.GetValuesBySerialNumber(event.value);

  }
  
  GetValuesBySerialNumber(workOrderNumber: string) {
    this.workOrderService.getWorkOrderNumber(null,workOrderNumber).subscribe({
      next: (value) => {
        {
          this.testForm = this.fb.group({
              userCode: [this.user?.userCode],
          
              pwo:[[value.dataResponse[0].woNumber], [Validators.required]],
              work_order_id: value.dataResponse[0].id_pwo,
              item: value.dataResponse[0].item,
              custpo: value.dataResponse[0].poNumber,
              Description: value.dataResponse[0].descriptionItem,
              Operator: this.loged,
              chain: value.dataResponse[0].chain,
              wll: value.dataResponse[0].wll,
              target: ['', [Validators.required, Validators.min(0)]],
              name_customer: value.dataResponse[0].customerName,
              legs: value.dataResponse[0].legs,
              testype: ['',  [Validators.required]],
              method: ['',  [Validators.required]],
              geometry: ['',  [Validators.required]],
              notes: '',
              notesoff: '',
            ctrl_WO: value.dataResponse[0].serial,
          });

        }

      },
    });
  }
  testsetup = {
    idtestype: 0,
    nametestype: '',
    idmethod: 0,
    namemethod: '',
    idgeometry: 0,
    namegeometry: '',
  };

  Tflag: boolean = false;
  sendTflag(e: boolean) {
    this.Tflag = e;
  }
  
  sendCheckBoxForTestType(e: any) {
    this.testsetup.idtestype = e.id;
    this.testsetup.nametestype = e.value;
  }
  sendCheckBoxForMethod(e: any) {
    this.testsetup.idmethod = e.id;
    this.testsetup.namemethod = e.value;
  }
  sendCheckBoxForGeometry(e: any) {
    this.testsetup.idgeometry = e.id;
    this.testsetup.namegeometry = e.value;
  }

  sendflagvalue() {
    this.sendflag.emit(this.idTest);
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
  onSelect(event: any) {
    this.PWO.pwoname = event.value;
  }

  onRadioButtonChange(value: any) {
    value.selected = !value.selected;
    if (value.selected == false) {
      this.selectedValue = null;
    }
  }



  checkRequired(str: string){
    return this.testForm.get(str)?.hasValidator(Validators.required);
  }
  disabled = false
  disabled2 = false

  disable(){
    this.disabled=true
    this.disabled2=true
  }
}