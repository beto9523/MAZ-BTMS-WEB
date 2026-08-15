import { UserService } from '@Services/user/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@Services/notifications/notification.service';
import { LoginInputModel } from '@InputModels/user/LoginInputModel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  title: string = 'Login';
  loginForm: FormGroup;
  loggedIn: boolean = false;
  model: LoginInputModel = new LoginInputModel();
  constructor(private fb: FormBuilder, private not: NotificationService, private userService:UserService, private router:Router) {
    //Validator
    this.loginForm = this.fb.group({
      username: [this.model.username, Validators.required],
      password: [this.model.password, Validators.required],
    });

    //Validate if the user has a current session
    this.loggedIn = userService.isAuthenticated();

    //Hide navbar
    const body = document.body;
    body.classList.toggle('mini-navbar');
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      this.not.showFormError();
      return;
    }
    this.model = this.loginForm.value as LoginInputModel;
    this.userService.login(this.model).subscribe(
      (response) =>  {
        //Login Success
        this.not.showSuccess('Redirecting...', 'Login success', true)
        setTimeout(() => {
          this.router.navigateByUrl('/Screen/test');
          //Show navbar
          const body = document.body;
          body.classList.toggle('mini-navbar');
        }, 1000);
      },
    );
  }

}
