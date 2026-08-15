import { UserModel } from "@InternalModels/user/UserModel";

export interface LoginViewModel extends UserModel{
  token:string;
  name:string;
  permission: number;
  username: string;
  userCode: number;
}

