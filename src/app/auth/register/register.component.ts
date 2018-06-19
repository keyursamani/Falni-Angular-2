import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  initRegistrationForm(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}') ] ) ],
      password: ['', Validators.required],
      cPassword: ['', Validators.required]
    }, {validator: this.matchPassword});
  }

  matchPassword(c: AbstractControl): { mismatchedPassword: boolean } {
    if (c.get('password').value !== c.get('cPassword').value) {
      return {mismatchedPassword: true};
    }
  }

  register(user): void {
    let usr = Object.assign({}, user);
    delete usr.cPassword;
    this.authService.register(usr)
      .subscribe(data => {
        this.authService.login(usr)
          .subscribe(response => {
            // window.localStorage.setItem('token', JSON.stringify(response.body));
            this.authService.setToken(response.body);
            this.authService.setLoginStatus(true);
            this.router.navigate(['/portfolio']);
          });
      });
  }

  ngOnInit() {
    this.initRegistrationForm();
  }

}
