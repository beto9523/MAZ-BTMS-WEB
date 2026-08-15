import { Component, OnInit } from '@angular/core';
import { UserModel } from '@InternalModels/user/UserModel';
import { UserService } from '@Services/user/user.service';
import { UserViewModel } from '@ViewModels/users/UserViewModel';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.container.html',
  styleUrl: './change-password.container.css'
})
export class ChangePasswordContainer implements OnInit {
  title: string ="Change password"
  userCode: UserModel['userCode'];
  user: UserViewModel | null = null;

  constructor(private userService: UserService){

  }
  ngOnInit(): void {
    let userCode = this.userService.getUserModel()?.userCode;

    if(userCode != null)
    this.userCode = Number(userCode);

    this.userService.getUser(this.userCode).subscribe(
      {
        next: (r) => this.user = r.dataResponse
      }
    )
  }


}
