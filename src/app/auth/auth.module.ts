import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../core/service/auth.service';

const routes: Routes = [
  { path: '',
    component: AuthComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' }
    ]
  },
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
  declarations: [LoginComponent, RegisterComponent, AuthComponent],
  bootstrap: [AuthComponent]
})
export class AuthModule { }
