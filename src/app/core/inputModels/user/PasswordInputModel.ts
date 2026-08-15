export class PasswordInputModel{
  userName: string |undefined;
  userCode: number | undefined;
  newPassword: string | undefined;
  password: string | undefined

  constructor(){
    this.userName = '';
    this.userCode = 0;
    this.newPassword = '';
    this.password = '';
  }
}
