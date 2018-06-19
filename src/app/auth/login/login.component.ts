import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: String;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }


  initLoginform(): void {
    this.loginForm = this.formBuilder.group({
      email:['', Validators.compose([Validators.required,Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')])],
      password: ['', Validators.required]
    });
  }

  login(cred): void {
    this.authService.login(cred)
      .subscribe((response) => {
        this.authService.setToken(response.body);
        this.authService.setLoginStatus(true);
        // window.localStorage.setItem('token', JSON.stringify(response.body));
        this.router.navigate(['/portfolio']);
      },
      (error) => {
        this.loginError = 'Invalid Username OR Password';
      });
  }

  ngOnInit() {
    this.initLoginform();
  }

}
