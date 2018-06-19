import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpResponse} from '@angular/common/http';

import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class CompanyService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCompanyDetails(code): Observable<any> {
    // let url = `http://localhost:4040/api/company?code=${code}`;
    const url = `${environment.apiUrl}CompanyDetails/company/${code}`;
    return this.httpClient.get(url, {observe: 'response'})
      .map((res: HttpResponse<any>) => {
        return res;
      },
      error => {
        return error;
      });
  }
}
