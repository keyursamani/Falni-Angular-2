import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';

import 'rxjs/add/operator/do';

@Injectable()
export class InterceptorService implements HttpInterceptor{

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const authToken = this.authService.getToken();
    let authReq;
    if (authToken !== null) {
      authReq = request.clone({
        headers: request.headers.set('Authorization', authToken)
      });
    } else {
      authReq = request.clone({});
    }

    return next.handle(authReq).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {}
    },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 ) {
            this.authService.setLoginStatus(false);
            this.router.navigate(['/auth/login']);
          }
        }
      });
  }
}
