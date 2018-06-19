import {Component, OnInit} from '@angular/core';
import {AuthService} from './core/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit{
  title = 'app';

  constructor(
    private authService: AuthService
  ) {}

  validateUserToken(): void {
    this.authService.setLoginStatus(this.authService.validateUserToken());
    /*this.authService.validateUserToken()
      .subscribe((response) => {
        this.authService.setLoginStatus(response);
      },
      error => {
        console.log(error);
        this.authService.setLoginStatus(false);
      });*/
}

  ngOnInit() {
    this.validateUserToken();
  }

}
