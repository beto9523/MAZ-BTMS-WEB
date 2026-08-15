import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JanusResponse } from '@Responses/JanusResponse';
import { Observable } from 'rxjs';
import { environment } from '@Environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApipdfService {
  
  constructor(private http: HttpClient) { }
 
  defaultIdReport:number=1;

   //Obtener pdf (Reporte)
  Getpdf(idTest:number, idReport?: number): Observable<HttpResponse <Blob>> {
    try {
      idReport= (idReport !=null)? idReport:this.defaultIdReport;
      let _idtest= Number(idTest)      
      let final_url=environment.apiBaseUrl+ 'ReportGenerator/GenerateReport?'+'idReport'+'='+ idReport+'&'+'idTest='+idTest 
      return this.http.get<Blob>(
        final_url
      ,{
              responseType: 'blob' as 'json', // Establecer el tipo de respuesta como blob
          observe: 'response',
          headers: new HttpHeaders({
            'Content-Type': 'application/pdf',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
          } ,
          
          )
       // Permitir acceso a la respuesta completa
        });

    } catch (error) {
      console.log(error);
      throw error;      
    }
  }


}