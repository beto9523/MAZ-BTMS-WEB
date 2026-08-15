export class LoginInputModel {
  username: string;
  password: string;
  constructor() {
    (this.username = ''), (this.password = '');
  }
}
