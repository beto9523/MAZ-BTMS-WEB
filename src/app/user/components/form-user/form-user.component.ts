import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserViewModel } from '@ViewModels/users/UserViewModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@Services/notifications/notification.service';
import { validateStringEmpty } from '@Utils/string';
import { UserService } from '@Services/user/user.service';
import { PasswordInputModel } from '@InputModels/user/PasswordInputModel';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent implements OnChanges {
  @Input() user: UserViewModel | null = null;
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private not: NotificationService, private userService: UserService){
    this.setFormValues();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.user != null){
      this.setFormValues();
    }
  }

  setFormValues(){
    this.userForm = this.fb.group({
      userCode: [this.user?.userCode],
      userName: [{ value: this.user?.userName, disabled: true }],
      email: [{ value: this.user?.email, disabled: true }],
      modifiedDate: [{ value:  this.user?.modifiedDate != null ? new Date(this.user?.modifiedDate): '', disabled: true }],
      name: [{ value: this.user?.name, disabled: true }],
      middleName: [{ value: this.user?.middleName, disabled: true }],
      lastName: [{ value: this.user?.lastName, disabled: true }],
      password:  ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      newPasswordConfirm: ['', [Validators.required]]
    });
  }

  onFormSubmit(){
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      this.not.showFormError();
      return;
    }
    if(!this.passwordMatchValidator()){
      this.not.showFormError();
      return;
    }
    let model: PasswordInputModel = new PasswordInputModel();
    model.userCode = this.user?.userCode;
    model.userName = this.user?.userName;
    model.password = this.userForm.get('password')?.value;
    model.newPassword = this.userForm.get('newPassword')?.value;

    this.userService.changePassword(model).subscribe(
      {
        next: (r) => {

          this.not.showSuccess('Password successfully changed','Change password');
          this.reloadInputs();
        }
      }
    );
  }

  reloadInputs(){
    this.userForm.markAsUntouched();
    this.setFormValues();
  }

  passwordMatchValidator() {
    if(this.userForm != null){
      const password = this.userForm.get('newPassword')?.value;
      const confirmPassword = this.userForm.get('newPasswordConfirm')?.value;
      if(!validateStringEmpty(password) || !validateStringEmpty(confirmPassword)) return true;
      return password === confirmPassword ? true : false;
    }
     return true;
  }
}
