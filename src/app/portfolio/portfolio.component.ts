import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import {AddStockComponent} from './add-stock/add-stock.component';
import {PortfolioService} from '../core/service/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  bsModalRef: BsModalRef;
  portfolioData;
  constructor(
    private bsModalService: BsModalService,
    private portfolioService: PortfolioService
  ) { }

  addStock(): void {
    this.bsModalRef = this.bsModalService.show(AddStockComponent, {});
    this.bsModalService.onHidden.subscribe((reason) => {
      if (reason === 'success') {
        this.getPortfolio();
      }
    });
  }

  getPortfolio(): void {
    this.portfolioService.getPortfolio()
      .subscribe((res) => {
        console.log(res);
        this.portfolioData = res.body;
      },
      err => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.getPortfolio();
  }

}
