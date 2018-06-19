import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';

@Injectable()
export class PortfolioService {

  apiUrl = `${environment.apiUrl}portfolios`; //

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  addStock(stock): Observable<any> {
    stock.userId = this.authService.getUserId();
    return this.httpClient.post(`${this.apiUrl}`, stock, {observe: 'response'})
      .map((res: HttpResponse<any>) => { return res; },
        error => { return error; });
  }

  getPortfolio(): Observable<any> {
    const userId = this.authService.getUserId();

    // return this.httpClient.get(`${this.apiUrl}?filter[where][userId]=${userId}`, {observe: 'response'})
    return this.httpClient.get(`${this.apiUrl}/user/${userId}`, {observe: 'response'})
      .map((res: HttpResponse<any>) => { return res; },
        error => { return error; });
  }
}
