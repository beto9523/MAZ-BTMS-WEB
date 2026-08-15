import { Component } from '@angular/core';
import { UserModel } from '@InternalModels/user/UserModel';
import { UserService } from '@Services/user/user.service';

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html',
})
export class TopnavbarComponent {
  loggedIn: boolean = false;
  user: UserModel['name'] = '';
  constructor(private userService: UserService) {
    this.loggedIn = userService.isAuthenticated();
    this.user = userService.getUserModel()?.name;
  }

  toggleNavigation(): void {
    const body = document.body;
    body.classList.toggle('mini-navbar');
  }

  logOut() {
    this.userService.logOut();
  }
}
