import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class AuthService {

  apiUrl = `${environment.apiUrl}Users/`;
  private loginStatus = false;
  private isLoggedIn = new Subject();

  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  login(cred): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}login`, cred, {observe: 'response'})
      .map((res: HttpResponse<any>) => {
        return res;
      },
      (error) => {
        return error;
      });
  }

  logout(): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}logout`, {observe: 'response'})
      .map((res: HttpResponse<any>) => {
          return res;
        },
        (error) => {
          return error;
        });
  }

  register(user): Observable<any> {
    return this.httpClient.post(this.apiUrl, user, {observe: 'response'})
      .map((res: HttpResponse<any>) => { return res; },
        (error) => { return error; });
  }

  setToken(token): void {
    window.localStorage.setItem('token', JSON.stringify(token));
  }

  getToken(): string {
    let token = null;
    if (JSON.parse(window.localStorage.getItem('token')) && JSON.parse(window.localStorage.getItem('token')).id){
      token = JSON.parse(window.localStorage.getItem('token')).id;
    }
    return token;
  }

  removeToken(): void {
    window.localStorage.removeItem('token');
  }

  getUserId(): string {
    let id = null;

    if (JSON.parse(window.localStorage.getItem('token')) && JSON.parse(window.localStorage.getItem('token')).userId){
      id = JSON.parse(window.localStorage.getItem('token')).userId;
    }
    return id;
  }

  setLoginStatus(status: boolean): void {
    this.loginStatus = status;
    this.isLoggedIn.next(this.loginStatus);
  }

  getLoginStatus(): boolean {
    return this.loginStatus;
  }


  validateUserToken(): boolean {
    const token = JSON.parse(window.localStorage.getItem('token'));
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  /*validateUserToken(): Observable<boolean> {
    const token = JSON.parse(window.localStorage.getItem('token'));
    if (token) {
      // return this.httpClient.get(this.apiUrl+ token.userId+ '/accessTokens', {observe: 'response'})
      return this.httpClient.get(`${this.apiUrl}${token.userId}/accessTokens`, {observe: 'response'})
        .map((response: HttpResponse<any>) => {
            this.setToken(response.body[0]);
            return true;
          },
          error => {
            this.removeToken();
            return false;
          });
    } else {
      return Observable.create(observer => {
        observer.next(false);
      });
    }
  }*/
}
