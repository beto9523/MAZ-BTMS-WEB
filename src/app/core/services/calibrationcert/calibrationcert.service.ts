import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CatalogViewModel } from '@ViewModels/shared/CatalogViewModel';
import { WorkOrderViewModel } from '@ViewModels/WorkOrder/WorkOderViewModel';
import { JanusResponse, JanusResponseNoData } from '@Responses/JanusResponse';
import { testViewModel } from '@ViewModels/test/testViewModel';
import { environment } from '@Environments/environment.development';
import { totalTestViewModel } from '@ViewModels/test/totalTestViewModel';
import { FilterTestViewModel } from '@ViewModels/test/FilterTestViewModel';
import { QueryParam } from '@InputModels/shared/QueryParam';
import { WorkOrderInputModel } from '@InputModels/wo/WOViewModel';
import { filter, Observable } from 'rxjs';
import { TestInputModel } from '@InputModels/testReport/TestInputModel';
import { calibrationCertInputModel } from '@InputModels/calibrationCert/CalibrationCertInputModel';
import { calibrationCertViewModel } from '@ViewModels/calibrationCert/calibrationCertViewModel';

@Injectable({
  providedIn: 'root',
})
export class CalibrationCertService {
  
  constructor(private http: HttpClient) {}
  //this method should be inside the CatalogViewModel class att:hugo
  //but the catalogViewModel is an interface it doesnt accept methods... atte:hugo

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    }),
  };
  GetCalibratioCert(id:String) {
    let final_url = `${environment.apiBaseUrl}` + 'CalibrationCertificate/GetCalibrationCertificateById'+ "?id="+id ;
    

    return this.http.get<calibrationCertViewModel>(
      final_url
    );

  } 
  GetLocations(){
    let final_url = `${environment.apiBaseUrl}` + 'CalibrationCertificate/getLocations';
    

    return this.http.get<JanusResponse<CatalogViewModel[]>>(
      final_url
    );
  }
  GetTestMachines(){
    let final_url = `${environment.apiBaseUrl}` + 'CalibrationCertificate/getTestMachines';
    

    return this.http.get<JanusResponse< CatalogViewModel[]>>(
      final_url
    );
  }
  AddCalibratioCert(model:FormData) {
    let final_url = 'CalibrationCertificate/CrudCalibrationCert' ;
    
  return this.http.post<JanusResponse<JanusResponseNoData>>(
      `${environment.apiBaseUrl}` + final_url,
      model
    
    );
  }
 
}