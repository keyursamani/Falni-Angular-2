import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class StockService {
  apiUrl = `${environment.apiUrl}StockMasters`;
  constructor(
    private httpClient: HttpClient
  ) { }

  getStockByName(name): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}?filter[where][name][regexp]=${name.toUpperCase()}`, {observe: 'response'})
      .map((res: HttpResponse<any>) => {
        return res;
      },
      error => {
        return error;
      });
  }
}
