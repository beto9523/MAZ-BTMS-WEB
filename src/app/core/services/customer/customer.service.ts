import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JanusResponse } from '@Responses/JanusResponse';
import { CatalogViewModel } from '@ViewModels/shared/CatalogViewModel';
import { environment } from '@Environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };
  constructor(private http:HttpClient) { }
  GetAll(){

    return this.http.get<JanusResponse<CatalogViewModel[]>>
  (`${environment.apiBaseUrl}Customer/GetCustomers`,this.httpOptions)
  
  }

}
