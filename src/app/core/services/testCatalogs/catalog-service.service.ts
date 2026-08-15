import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export abstract class CatalogServiceService {

  public abstract GetAll(): Observable<any>;
}
