import { WorkOrderInputModel } from '@InputModels/wo/WOViewModel';
import { WorkOrderService } from '@Services/WorkOrder/work-order.service';
import { CustomerService } from '@Services/customer/customer.service';
import { NotificationService } from '@Services/notifications/notification.service';
import { WorkOrderViewModel } from '@ViewModels/wo/WOViewModel';
import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from '@InternalModels/user/UserModel';
import { UserService } from '@Services/user/user.service';
import { Console } from 'console';

@Component({
  selector: 'app-modal-orders',
  templateUrl: './modal-orders.component.html',
  styleUrl: './modal-orders.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ModalOrdersComponent {

  @ViewChild('content') content: any; modalReference: any;
  @Input() isEdit = false;
  @Output() reloadTable: EventEmitter<void> = new EventEmitter<void>();
  model: WorkOrderInputModel = new WorkOrderInputModel();
  title: string = "";
  woForm!: FormGroup;
  currentOrder: string = '';
  isSubmitting: boolean = false;
  customerallvalues: string[] = [];
  customerallvaluesTemp: string[] = [];
  user: UserModel['name'] = '';
  
  Customer = {
    CustomerName: ''
  };

  constructor(
    private modalService: NgbModal,
    private workOrderService: WorkOrderService,
    private customer:CustomerService,
    private not: NotificationService,
    private fb: FormBuilder,
    private userService: UserService,) {
      this.getallCustomer();
      this.user= userService.getUserModel()?.username;
  }

  changeCustomer(event: Event) {
    const input = event.target as HTMLInputElement;
    this.Customer.CustomerName = input.value;
  }

  onSelectCustomer(event: any) {
    this.Customer.CustomerName = event.value;
  }

  getallCustomer() {
    this.customer.GetAll().subscribe({
      next: (value) => {
        {
          for (let i = 0; i < value.dataResponse.length; i++) {
            this.customerallvalues[i] = value.dataResponse[i].value;
          }
          this.customerallvalues = this.customerallvalues.filter(
            (n, i) => this.customerallvalues.indexOf(n) === i
          );
        }
      },
    });
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

  setFormValues(){
    
    
    this.woForm = this.fb.group({
      
      woId :[this.model.woId],
      woNumber: [this.model.woNumber, Validators.required],
      serial: [this.model.serial, Validators.required],
      descriptionItem: [this.model.descriptionItem, Validators.required],
      customerName: [this.model.customerName, Validators.required],
      item: [this.model.item, Validators.required],
      chain: [this.model.chain, Validators.required],
      wll: [this.model.wll, Validators.required],
      legs: [this.model.legs, Validators.required],
      poNumber: [this.model.woNumber, Validators.required],
      user:[this.user]
      
    });
    
    this.currentOrder=''
  }


  checkRequired(str: string){
    return this.woForm.get(str)?.hasValidator(Validators.required);
  }

  onFormSubmit(){
    if (!this.woForm.valid) {
      this.woForm.markAllAsTouched();
      this.not.showFormError();
      return;
    }
    this.isSubmitting = true;
    this.model = this.woForm.getRawValue() as WorkOrderInputModel;

    if(this.isEdit){
      this.workOrderService.CrudWO(this.model).subscribe({
        next: (r) => {
          this.not.showSuccess('Updated successfully','User');
          this.modalService.dismissAll();
          this.reloadTable.emit();
        },
        complete: () => this.isSubmitting = false
      });
    }
    else{
      
      this.workOrderService.CrudWO(this.model).subscribe({
        next: (r) => {
          this.not.showSuccess('Created successfully','WorkOrder');
          this.modalService.dismissAll();
          this.reloadTable.emit();
        },
        complete: () => this.isSubmitting = false
      });
    }
  }


  open(workOrder?: WorkOrderViewModel | null) {
    this.title = this.isEdit ? "Edit Work Order" : "Add Work Order";

    if(this.isEdit && workOrder != null)
      this.model = new WorkOrderInputModel(workOrder);
    else
      this.model = new WorkOrderInputModel();

    this.setFormValues();
    this.woForm.markAsUntouched();
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
