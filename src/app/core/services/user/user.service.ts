import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JanusResponse, JanusResponseNoData } from '@Responses/JanusResponse';
import { Observable, tap } from 'rxjs';
import { environment } from '@Environments/environment.development';
import { LoginViewModel } from '@ViewModels/users/LoginViewModel';
import { LoginInputModel } from '@InputModels/user/LoginInputModel';
import { UserInputModel } from '@InputModels/user/UserInputModel';
import { CatalogViewModel } from '@ViewModels/shared/CatalogViewModel';
import { UserViewModel } from '@ViewModels/users/UserViewModel';
import { PasswordInputModel } from '@InputModels/user/PasswordInputModel';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
import { UserModel } from '@InternalModels/user/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };
  constructor(private http: HttpClient) { }

  login(model:LoginInputModel): Observable<JanusResponse<LoginViewModel>> {
    return this.http.post<JanusResponse<LoginViewModel>>(`${environment.apiBaseUrl}User/Login`,model,this.httpOptions).pipe(
      tap(data => {
        this.setUserModel(data.dataResponse);
      })
    );
  }

  addUser(model:UserInputModel): Observable<JanusResponseNoData> {
    return this.http.post<JanusResponseNoData>(`${environment.apiBaseUrl}User/AddUser`,model,this.httpOptions);
  }

  editUser(model:UserInputModel): Observable<JanusResponseNoData> {
    return this.http.patch<JanusResponseNoData>(`${environment.apiBaseUrl}User/EditUser`,model,this.httpOptions);
  }
  switchEnabledUser(userCode: number): Observable<JanusResponseNoData> {
    return this.http.patch<JanusResponseNoData>(`${environment.apiBaseUrl}User/SwitchEnabledUser?userCode=${userCode}`,this.httpOptions);
  }
  resetPassword(userCode: number): Observable<JanusResponseNoData> {
    return this.http.get<JanusResponseNoData>(`${environment.apiBaseUrl}User/ResetPassword?userCode=${userCode}`,this.httpOptions);
  }

  getNewUserName(username: string, userId?: number | null): Observable<JanusResponse<string>> {
    let url = `User/GetNewUserName?username=${username}&`;
    if(userId != null) url += `userId=${userId}`
    return this.http.get<JanusResponse<string>>(`${environment.apiBaseUrl}${url}`,this.httpOptions);
  }

  getPermissions(): Observable<JanusResponse<CatalogViewModel[]>> {
    return this.http.get<JanusResponse<CatalogViewModel[]>>(`${environment.apiBaseUrl}User/GetPermissions`,this.httpOptions);
  }
    /**
   * Gets a user by userCode
   * @returns UserViewModel
   */
  getUser(userCode?: number | null): Observable<JanusResponse<UserViewModel>> {
    return this.http.get<JanusResponse<UserViewModel>>(`${environment.apiBaseUrl}User/GetUserById?userCode=${userCode}`,this.httpOptions)
  }
  changePassword(model:PasswordInputModel): Observable<JanusResponseNoData> {
    return this.http.post<JanusResponseNoData>(`${environment.apiBaseUrl}User/ChangePassword`, model, this.httpOptions);
  }

  logOut(){
    removeCookie('token');
    removeCookie('user');
  }

  isAuthenticated():boolean{
    return this.getUserModel() != null;
  }
  /**
   * Gets the current user data
   * @returns UserModel | null
   */
  getUserModel():UserModel | null{
    let data = getCookie('user');
    if(!data) return null;

    return JSON.parse(data) as UserModel;
  }
  setUserModel(userVM:LoginViewModel){
    const usuarioString = JSON.stringify(userVM as UserModel);
    setCookie('user', usuarioString,{ expires: 1, path: '/'});
    setCookie('token', userVM.token,{ expires: 1, path: '/'});
  }

  getUserRole(){
    let permission = this.getUserModel()?.permission;
    if(permission == null) return null;

    return Number(permission);
  }

}
