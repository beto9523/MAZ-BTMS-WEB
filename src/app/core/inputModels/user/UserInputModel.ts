import { UserViewModel } from "../../viewModels/users/UserViewModel";

/**
 * Use this class when you send o get data
 */
export class UserInputModel{
 userCode?: number | null;
 userName: string;
 name: string;
 middleName: string;
 lastName: string;
 email: string;
 idPermission: number | null;
 userAct: string;


 constructor(data?: UserViewModel) {
   this.userCode = data? data.userCode: null;
   this.userName = data ? data.userName: "";
   this.name = data ? data.name: "";
   this.middleName = data ? data.middleName: "";
   this.lastName = data ? data.lastName: "";
   this.email = data ? data.email: "";
   this.idPermission = data ? data.idPermission: null;
   this.userAct = data ? data.userAct: "";

 }
}
