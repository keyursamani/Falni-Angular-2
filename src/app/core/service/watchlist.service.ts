import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {observable} from 'rxjs/symbol/observable';

@Injectable()
export class WatchlistService {

  apiUrl = `${environment.apiUrl}watchlists`;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }


  addToWatchlist(watchlist): Observable<any> {
    watchlist.userId = this.authService.getUserId();
    return this.httpClient.post(this.apiUrl, watchlist, {observe: 'response'})
      .map((res: HttpResponse<any>) => {
        return res;
      },
      error => {
        return error;
      });
  }

  checkWatchlist(companyId): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/check/${companyId}`, {observe: 'response'})
      .map((res: HttpResponse<any>) => {
        return res;
      },
      error => {
        return error;
      });
  }


  getWatchlist(): Observable<any> {
    const userId = this.authService.getUserId();

    return this.httpClient.get(`${this.apiUrl}/user/${userId}`, {observe: 'response'})
      .map((res: HttpResponse<any>) => {
        return res;
      },
      error => {
        return error;
      });
  }

  removeFromWatchlist(id): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`, {observe: 'response'})
      .map((res: HttpResponse<any>) => {
        return res;
      },
      error => {
        return error;
      });
  }
}
