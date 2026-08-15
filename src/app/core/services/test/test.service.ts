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
import { PaginationInputModel } from '../../inputModels/shared/PaginationInputModel';
import { PaginationViewModel } from '../../viewModels/shared/PaginationViewModel';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  
  constructor(private http: HttpClient) {}
  //this method should be inside the CatalogViewModel class att:hugo
  //but the catalogViewModel is an interface it doesnt accept methods... atte:hugo

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    }),
  };
  GetTotals(filterParams: string) {
    let final_url = 'Test/GetTotalTest' + filterParams;
    return this.http.get<JanusResponse<totalTestViewModel>>(
      `${environment.apiBaseUrl}` + final_url,
      this.httpOptions
    );
  }
  GetById(id:number): Observable<JanusResponse<PaginationViewModel<testViewModel>>> {
    const model: PaginationInputModel={
       page:1,
       pageSize:10,
       searchTerm:"",
       sortDirection:"",
       sortColumn:""

    };
    let final_url=  `${environment.apiBaseUrl}Test/GetTest`+'?testId='+id.toString();
    return this.http.post<JanusResponse<PaginationViewModel<testViewModel>>>(
      final_url,
      model,
      this.httpOptions
    );
  }
  GetAll() {
    return this.http.get<JanusResponse<testViewModel[]>>(
      `${environment.apiBaseUrl}Test/GetTest`,
      this.httpOptions
    );
  }
  
  GetCSV(filterParams: string): Observable<HttpResponse <Blob>> {
    try {
      
      let final_url = environment.apiBaseUrl+'Test/GetTestCsv'+filterParams ;

      return this.http.get<Blob>(
        final_url
      ,{
              responseType: 'blob' as 'json', // Establecer el tipo de respuesta como blob

          observe: 'response',
          headers: new HttpHeaders({
            'Content-Type': 'text/csv',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
             ,'Accept':'text/csv'
          } ,
          
          )
        });

    } catch (error) {
      console.log(error);
      throw error;      
    }
  }


  public static ConvertCatToNgDropDown(xcatalog: CatalogViewModel[]) {
    const arr_type = xcatalog.map((x) => ({
      label: x.value,
      value: x.id,
    }));
    return arr_type;
  }
  
  public static setQueryParams(model: any) {
    let url_fin: string = '';
    let params: QueryParam[] = [];

    const keys = Object.keys(model);
    const values = Object.values(model);

    for (let index = 0; index < keys.length; index++) {
      params.push({
        paramName: keys[index],
        paramValue: values[index] as string,
      });
    }

    if (params.length >= 1) {
      url_fin = '?';
      params.forEach((element) => {
        url_fin += element.paramName + '=' + element.paramValue + '&';
      });
      url_fin = url_fin.substring(0, url_fin.length - 1);
    }
    return url_fin;
  }

  public static ConvertWOToNgDropDown(xwo: WorkOrderViewModel[]) {
    const arr_type = xwo.map((x) => ({
      label: x.woNumber,
      value: 1,
    }));
    return arr_type;
  }

  addTest(model:TestInputModel):Observable<JanusResponse<number>>{
    return this.http.post <JanusResponse<number>>(`${environment.apiBaseUrl}Test/AddTest`,model,this.httpOptions);
    
  }
  editTest(model:TestInputModel):Observable<JanusResponse<number>>{
    return this.http.post <JanusResponse<number>>(`${environment.apiBaseUrl}Test/EditTest`,model,this.httpOptions);
    
  }
  deleteTest( idtest: number,  iduser:number)
  : Observable<JanusResponse<number>>
  {
    let final_url= `${environment.apiBaseUrl}Test/DeleteTest`+ "?"+ "idtest="+idtest+ "&"+ "iduser="+iduser;
    return this.http.delete <JanusResponse<number>>
    (final_url,this.httpOptions);
  }

  getCoordinates(test_id: number):Observable<JanusResponse<testViewModel[]>> {
    return this.http.get<JanusResponse<testViewModel[]>>(`${environment.apiBaseUrl}Test/GetCoordinates/?testId=${test_id}`,this.httpOptions);
  }

  getDuration(test_id: number):Observable<JanusResponse<number>> {
    return this.http.get<JanusResponse<number>>(`${environment.apiBaseUrl}Test/GetDuration/?testId=${test_id}`,this.httpOptions);
  }
}
