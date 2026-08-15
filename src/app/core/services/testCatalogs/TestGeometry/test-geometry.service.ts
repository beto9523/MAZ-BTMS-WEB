import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@Environments/environment.development';
import { JanusResponse } from '@Responses/JanusResponse';
import { CatalogViewModel } from '@ViewModels/shared/CatalogViewModel';
import { CatalogServiceService } from '../catalog-service.service';

@Injectable({
  providedIn: 'root'
})
export class TestGeometryService  {


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
    GetAll(){

      return this.http.get<JanusResponse<CatalogViewModel[]>>
    (`${environment.apiBaseUrl}Test/GetTestGeometry`,this.httpOptions)
    
    }
    
}
