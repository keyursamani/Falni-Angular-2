import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { CompanyDetailComponent } from './main/company-detail/company-detail.component';
import { CompanyService } from './core/service/company.service';
import { MainComponent } from './main/main.component';
import { CoreModule } from './core/core.module';
import { routes } from './routes';
import { HomeComponent } from './main/home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    CompanyDetailComponent,
    MainComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    RouterModule.forRoot(routes),
    CoreModule.forRoot(),
  ],
  providers: [
    CompanyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
