import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@Environments/environment.development';
import { JanusResponse, JanusResponseNoData } from '@Responses/JanusResponse';
import { Observable } from 'rxjs';
import { WorkOrderViewModel } from '@ViewModels/WorkOrder/WorkOrderViewModel';
import { WorkOrderInputModel } from '@InputModels/wo/WOViewModel';
import { CatalogViewModel } from '@ViewModels/shared/CatalogViewModel';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };


  constructor(private http: HttpClient) { }

  queryWorkOrder(customerName?:string){
    let final_url=`${environment.apiBaseUrl}WorkOrder/GetWorkOrders`;
    if(customerName!=null || customerName!=undefined){
      final_url+='?customerName='+customerName;
    }
    return this.http.get<JanusResponse<WorkOrderViewModel[]>>
    (final_url,this.httpOptions)

  }
  getWorkOrderCat(){
    let final_url=`${environment.apiBaseUrl}WorkOrder/GetWorkOrdersCat`;
   
    return this.http.get<JanusResponse<CatalogViewModel[]>>
    (final_url,this.httpOptions)

  }
 
   getWorkOrderNumber(pwo_number: string | null, serial: string | null): Observable<JanusResponse<WorkOrderViewModel[]>> {
      let params: string = ""
      if(pwo_number !=null) {params += `workOrderNumber=${pwo_number}`};
      if(serial !=null) {params += `serial=${serial}`;}
      return this.http.get<JanusResponse<WorkOrderViewModel[]>>(`${environment.apiBaseUrl}WorkOrder/GetWorkOrders?${params}`,this.httpOptions);
    }
    
    //NO DELETE PLZ
  // GetWorkOrderNumber(pwo_number: string): Observable<JanusResponse<WorkOrderViewModel[]>> {
  //   return this.http.get<JanusResponse<WorkOrderViewModel[]>>(`${environment.apiBaseUrl}WorkOrder/GetWorkORders/?workOrderNumber=${pwo_number}`,this.httpOptions);
  // }
  // GetSerial(pwo_number: string): Observable<JanusResponse<WorkOrderViewModel[]>> {
  //   return this.http.get<JanusResponse<WorkOrderViewModel[]>>(`${environment.apiBaseUrl}WorkOrder/GetWorkOrders/?serial=${pwo_number}`,this.httpOptions);
  // }

  CrudWO(model:WorkOrderInputModel):Observable<JanusResponseNoData>{
    return this.http.post<JanusResponseNoData>(`${environment.apiBaseUrl}WorkOrder/CrudWorkOrder`,model,this.httpOptions);
  }


}
