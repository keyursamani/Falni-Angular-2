import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from './service/auth.service';
import {AuthGuardService} from './service/auth-guard.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {InterceptorService} from './config/interceptor.service';
import {HeaderComponent} from '../common/header/header.component';
import {StockService} from './service/stock.service';
import {PortfolioService} from './service/portfolio.service';
import {FormsModule} from '@angular/forms';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {WatchlistService} from './service/watchlist.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TypeaheadModule.forRoot()
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [
    HeaderComponent
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: InterceptorService,
          multi: true
        },
        AuthService,
        AuthGuardService,
        StockService,
        PortfolioService,
        WatchlistService
      ]
    };
  }
}
