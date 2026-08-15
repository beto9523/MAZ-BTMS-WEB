/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, QueryList } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import {
  catchError,
  debounceTime,
  delay,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { SortColumn, SortDirection } from './sortable.directive';
import { PaginationInputModel } from '@InputModels/shared/PaginationInputModel';
import { JanusResponse } from '@Responses/JanusResponse';
import { PaginationViewModel } from '@ViewModels/shared/PaginationViewModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@Environments/environment.development';
import { QueryParam } from '@InputModels/shared/QueryParam';

interface SearchResult<T> {
  data: T[];
  total: number;
  pagL: number;
  pagR: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  url: string;
}

export function TableServiceFactory<T>(http: HttpClient) {
  return new DataTableService<T>(http);
}
// @Injectable() for allow two or more instances
@Injectable({ providedIn: 'root' })
export class DataTableService<T> {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _data$ = new BehaviorSubject<T[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _pagL$ = new BehaviorSubject<number>(0);
  private _pagR$ = new BehaviorSubject<number>(0);
  private _params: string = '';

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    url: '',
  };

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    }),
  };

  constructor(private http: HttpClient) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(400),
        switchMap(() => this._search()),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._data$.next(result.data);
        this._total$.next(result.total);
        this._pagL$.next(result.pagL);
        this._pagR$.next(result.pagR);
      });

    this._search$.next();
  }

  get data$() {
    return this._data$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get pagR$() {
    return this._pagR$.asObservable();
  }
  get pagL$() {
    return this._pagL$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }
  set url(url: string) {
    this._set({ url });
  }

  public  setQueryParams(model: any) {
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
    this._params = url_fin;
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    if (patch.sortColumn == null) this._search$.next();
  }

  public reload() {
    this._search$.next();
  }

  private _search(): Observable<SearchResult<T>> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm, url } =
      this._state;

    let req: PaginationInputModel = {
      page: page,
      pageSize: pageSize,
      searchTerm: searchTerm.trim(),
      sortColumn: sortColumn.toString(),
      sortDirection: sortDirection,
    };

    if (url == null || url == '')
      return of({ data: [], total: 0, pagL: 0, pagR: 0 });

    return this.searchData(req, url).pipe(
      map((response) => {
        const total = response.dataResponse.total;
        let data = response.dataResponse.data as T[];
        const pagL: number = (page - 1) * pageSize + 1;
        const pagR: number = Math.min(page * pageSize, total);
        return { data, total, pagL, pagR } as SearchResult<T>;
      }),
      catchError((error) => {
        console.error('Error:', error);
        return of({ data: [], total: 0, pagL: 0, pagR: 0 });
      })
    );
  }

  private searchData(
    model: PaginationInputModel,
    url: string
  ): Observable<JanusResponse<PaginationViewModel<any>>> {
    return this.http.post<JanusResponse<PaginationViewModel<any>>>(
      `${environment.apiBaseUrl}${url}${this._params}`,
      model,
      this.httpOptions
    );
  }
}
