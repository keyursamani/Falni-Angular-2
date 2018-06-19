import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StockService} from '../../core/service/stock.service';
import {Observable} from 'rxjs/Observable';
import {TypeaheadMatch} from 'ngx-bootstrap/typeahead';
import {PortfolioService} from '../../core/service/portfolio.service';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

  stockForm: FormGroup;
  typeaheadLoading;
  searchedStockNames: Observable<any>;
  selectedStock;


  constructor(
    private formBuilder: FormBuilder,
    private stockService: StockService,
    private portfolioService: PortfolioService,
    public bsModalRef: BsModalRef,
    public modalService: BsModalService,
  ) {
    this.searchedStockNames = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.stockForm.value.stockName);
    }).mergeMap((token: string) => this.searchStockByName(token));
  }

  initStockForm(): void {
    this.stockForm = this.formBuilder.group({
      stockName: ['', Validators.required],
      exchange: ['', Validators.required],
      transaction: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  addStock(stock): void {
    console.log(stock);
    stock.stock = this.selectedStock;
    stock.symbol = this.selectedStock.securityId;

    this.portfolioService.addStock(stock)
      .subscribe((res) => {
        console.log(res);
        this.bsModalRef.hide();
        this.modalService.setDismissReason('success');
      },
        err => {console.log(err);});
    // this.searchStockByName(stock.stockName);
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

  ngOnInit() {
    this.initStockForm();
  }

}
