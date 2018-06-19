import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/service/auth.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {StockService} from '../../core/service/stock.service';
import {TypeaheadMatch} from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loginStatus: boolean;
  typeaheadLoading;
  searchedStockNames: Observable<any>;
  searchStr;
  selectedStock;

  constructor(
    private authService: AuthService,
    private router: Router,
    private stockService: StockService,
  ) {
    this.searchedStockNames = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.searchStr);
    }).mergeMap((token: string) => this.searchStockByName(token));
  }

  watchLoginStatus(): void {
    this.authService.isLoggedIn$.subscribe( loginStatus => {
      this.loginStatus = new Boolean(loginStatus).valueOf();
    });
  }

  goto(url) {
    this.router.navigate([url]);
  }

  searchStockByName(name) {
    console.log(name);
    return this.stockService.getStockByName(name)
      .map((response) => {
        return response.body;
      });
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('Selected value: ', e);
    this.selectedStock = e.item;
  }

  searchSelectedCompany() {
    if (this.selectedStock){
      const url = `/${this.selectedStock.url}`;
      console.log(url);
      this.router.navigate([url]);
    }

  }

  logout(): void {
    this.authService.logout()
      .subscribe((res) => {
        // if(res.status == 200) {
          this.authService.removeToken();
          this.authService.setLoginStatus(false);
          this.router.navigate(['/home']);
        // }
      });
  }

  ngOnInit() {
    this.loginStatus = this.authService.getLoginStatus();
    this.watchLoginStatus();
  }

}
