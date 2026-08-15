import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@Environments/environment.development';
import { JanusResponse } from '@Responses/JanusResponse';
import { CatalogViewModel } from '@ViewModels/shared/CatalogViewModel';

@Injectable({
  providedIn: 'root'
})
export class TestStatusService {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };
  
  constructor(
    private http: HttpClient
    
    ) { 

    }
    GetAll(){ //DELETE AND CHANGE 4 GetTestStatus
      return this.http.get<JanusResponse<CatalogViewModel[]>>
    (`${environment.apiBaseUrl}Test/GetTestStatus`,this.httpOptions)
    }

    GetTestStatus(){
      return this.http.get<JanusResponse<CatalogViewModel[]>>
    (`${environment.apiBaseUrl}Test/GetTestStatus`,this.httpOptions)
    }

    GetTestType(){
      return this.http.get<JanusResponse<CatalogViewModel[]>>
    (`${environment.apiBaseUrl}Test/GetTestType`,this.httpOptions)
    
    }

    GetTestMethods(){

      return this.http.get<JanusResponse<CatalogViewModel[]>>
    (`${environment.apiBaseUrl}TesT/GetTestMethods`,this.httpOptions)
    
    }

    GetTestGeometry(){
      return this.http.get<JanusResponse<CatalogViewModel[]>>
    (`${environment.apiBaseUrl}Test/GetTestGeometry`,this.httpOptions)
    
    }
    
}
