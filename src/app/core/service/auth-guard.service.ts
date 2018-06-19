import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate() {
    console.log(this.authService.getLoginStatus());
    if (!this.authService.getLoginStatus()) {
      console.log("canActivate");
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }

}
