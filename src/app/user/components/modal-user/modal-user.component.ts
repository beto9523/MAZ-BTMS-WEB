import { Component, EventEmitter, Input, Output, QueryList, TemplateRef, ViewChild, ViewChildren, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserInputModel } from '@InputModels/user/UserInputModel';
import { CatalogViewModel } from '@ViewModels/shared/CatalogViewModel';
import { UserViewModel } from '@ViewModels/users/UserViewModel';
import { UserService } from '@Services/user/user.service';
import { NotificationService } from '@Services/notifications/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrl: './modal-user.component.css'
})
export class ModalUserComponent {
  @ViewChild('content') content: any; modalReference: any;
  @Input() isEdit = false;
  @Output() reloadTable: EventEmitter<void> = new EventEmitter<void>();
  model: UserInputModel = new UserInputModel();
  title: string = ""
  namePattern: any = /^[^0-9]+$/;
  currentUser: string = '';
  userForm!: FormGroup;
  isSubmitting: boolean = false;
  permissionList: CatalogViewModel[] = [];

  constructor(private modalService: NgbModal, private userService: UserService, private not: NotificationService,private fb: FormBuilder) {


    this.userService.getPermissions().subscribe(
      (response) =>{
        this.permissionList = response.dataResponse;
      }
    )
  }


  setFormValues(){
    this.userForm = this.fb.group({
      userCode: [this.model.userCode],
      userName: [{ value: this.model.userName, disabled: true },  [Validators.required]],
      name: [this.model.name,  [Validators.required, Validators.pattern('[^0-9]*'), Validators.minLength(3)]],
      middleName: [this.model.middleName],
      lastName: [this.model.lastName,  [Validators.required, Validators.pattern('[^0-9]*'), Validators.minLength(3)]],
      email:  [this.model.email,  [Validators.required, Validators.email]],
      idPermission:  [this.model.idPermission,  [Validators.required]],
      userAct:  [this.model.userAct,  [Validators.required]],
    });
    this.currentUser = '';
  }

  valueChanged() {
    if (this.userForm.get('name')?.value.length >0){
      let userName = `RMES${this.userForm.get('name')?.value.charAt(0).toUpperCase()}${this.userForm.get('middleName')?.value?.length > 0 ? this.userForm.get('middleName')?.value.charAt(0).toUpperCase() : 'X'}${this.userForm.get('lastName')?.value?.length > 0 ? this.userForm.get('lastName')?.value.charAt(0).toUpperCase() : 'X'}`;

      if(this.currentUser === userName)
      return;

      this.currentUser = userName;

      this.userService.getNewUserName(userName, this.model.userCode).subscribe(
        (response) =>  {
          this.userForm.patchValue({ userName:  response.dataResponse });
        },
      );
    }
    else
    {
      this.userForm.patchValue({ userName: "" });
      this.currentUser = '';
    }


  }

  checkRequired(str: string){
    return this.userForm.get(str)?.hasValidator(Validators.required);
  }

  onFormSubmit(){
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      this.not.showFormError();
      return;
    }
    this.isSubmitting = true;
    this.model = this.userForm.getRawValue() as UserInputModel;

    if(this.isEdit){
      this.userService.editUser(this.model).subscribe(
        {
          next: (r) => {
            this.not.showSuccess('Updated successfully','User');
            this.modalService.dismissAll();
            this.reloadTable.emit();
          },
          complete: () => this.isSubmitting = false
        }
      );
    }
    else{
      this.userService.addUser(this.model).subscribe(
        {
          next: (r) => {
            this.not.showSuccess('Created successfully','User');
            this.modalService.dismissAll();
            this.reloadTable.emit();
          },
          complete: () => this.isSubmitting = false
        }
      );
    }

  }

  open(user?: UserViewModel | null) {
    this.title = this.isEdit ? "Edit User" : "Add User";



    if(this.isEdit && user != null)
      this.model = new UserInputModel(user);
    else
      this.model = new UserInputModel();

    this.setFormValues();
    this.userForm.markAsUntouched();
    
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
