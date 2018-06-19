import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {CompanyService} from '../../core/service/company.service';
import {WatchlistService} from '../../core/service/watchlist.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
  code;
  companyDetails;
  quarterlyResult;
  quarterlyResultStandalone;
  annualResult;
  annualResultStandalone;
  balancesheetResult;
  balancesheetResultStandalone;
  cashflowResult;
  cashflowResultStandalone;
  loading= false;
  addedToWatchlist: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private watchlistService: WatchlistService
  ) {
    // this.code = this.activatedRoute.snapshot.paramMap.get('code');
    // this.getCompanyDetails();
    this.activatedRoute.params.subscribe( params => {
      this.code = params['code'];
      this.getCompanyDetails();
    });
  }

  addToWatchlist(): void {
    const watchlistObj = {
      stockName: this.companyDetails.companyName,
      symbol: this.companyDetails.securityId,
      companyId: this.companyDetails.id
    }

    this.watchlistService.addToWatchlist(watchlistObj)
      .subscribe(res => {
        this.addedToWatchlist = true;
      });
  }


  checkWatchlist(companyId): void {
    this.watchlistService.checkWatchlist(companyId)
      .subscribe(res => {
        if(res.body && res.body.watched){
          this.addedToWatchlist = res.body.watched;
        }
      });
  }

  getCompanyDetails(): void {
    // this.companyService.getCompanyDetails('VISESHINFO')
    this.loading = true;
    this.companyService.getCompanyDetails(this.code)
      .subscribe((res) => {
        console.log(res);
        this.companyDetails = res.body;
        this.quarterlyResult = this.getQuarterlyResult(this.companyDetails.quarterlyConsolidated);
        this.quarterlyResultStandalone = this.getQuarterlyResult(this.companyDetails.quarterlyStandalone);
        this.annualResult = this.getAnnualResult(this.companyDetails.annualConsolidated);
        this.annualResultStandalone = this.getAnnualResult(this.companyDetails.annualStandalone);
        this.balancesheetResult = this.getBalancesheetResult(this.companyDetails.balancesheetConsolidated);
        this.balancesheetResultStandalone = this.getBalancesheetResult(this.companyDetails.balancesheetStandalone);
        this.cashflowResult = this.getCashflow(this.companyDetails.cashflowConsolidated);
        this.cashflowResultStandalone = this.getCashflow(this.companyDetails.cashflowStandalone);
        this.checkWatchlist(this.companyDetails.id);
        this.loading = false;
      },
      error => {
        this.loading = false;
      });
  }


  getQuarterlyResult(data) {
    let dataToSend = {
      monthYear: [],
      sales: [],
      expenses: [],
      depreciation: [],
      interest: [],
      net: [],
      operatingProfit: [],
      OPM: [],
      otherIncome: [],
      PBT: [],
      tax: []
    };
    data.forEach((obj, key) => {
      dataToSend['monthYear'].push(obj.month_year);
      dataToSend['sales'].push(obj.value.sales);
      dataToSend['expenses'].push(obj.value.expenses);
      dataToSend['depreciation'].push(obj.value.depreciation);
      dataToSend['interest'].push(obj.value.interest);
      dataToSend['net'].push(obj.value.net);
      dataToSend['operatingProfit'].push(obj.value.operatingProfit);
      dataToSend['OPM'].push(obj.value.OPM);
      dataToSend['otherIncome'].push(obj.value.otherIncome);
      dataToSend['PBT'].push(obj.value.PBT);
      dataToSend['tax'].push(obj.value.tax);
    });
    // console.log(dataToSend);
    return dataToSend
  }


  getAnnualResult(data) {
    let dataToSend = {
      monthYear: [],
      sales: [],
      expenses: [],
      depreciation: [],
      interest: [],
      net: [],
      operatingProfit: [],
      OPM: [],
      otherIncome: [],
      PBT: [],
      tax: []
    };
    data.forEach((obj, key) => {
      dataToSend['monthYear'].push(obj.month_year);
      dataToSend['depreciation'].push(obj.value.depreciation);
      dataToSend['expenses'].push(obj.value.expenses);
      dataToSend['interest'].push(obj.value.interest);
      dataToSend['net'].push(obj.value.net);
      dataToSend['operatingProfit'].push(obj.value.operatingProfit);
      dataToSend['OPM'].push(obj.value.OPM);
      dataToSend['otherIncome'].push(obj.value.otherIncome);
      dataToSend['PBT'].push(obj.value.PBT);
      dataToSend['sales'].push(obj.value.sales);
      dataToSend['tax'].push(obj.value.tax);
    });
    // console.log(dataToSend);
    return dataToSend;
  }

  getBalancesheetResult(data) {
    let dataToSend = {
      monthYear: [],
      borrowings: [],
      CWIP: [],
      fixedAssets: [],
      investments: [],
      otherAssets: [],
      otherLiabilities: [],
      reserves: [],
      shareCapital: [],
      totalAssets: [],
      totalLiabilities: [],
    };
    data.forEach((obj, key) => {
      dataToSend['monthYear'].push(obj.month_year);
      dataToSend['borrowings'].push(obj.value.borrowings);
      dataToSend['CWIP'].push(obj.value.CWIP);
      dataToSend['fixedAssets'].push(obj.value.fixedAssets);
      dataToSend['investments'].push(obj.value.investments);
      dataToSend['otherAssets'].push(obj.value.otherAssets);
      dataToSend['otherLiabilities'].push(obj.value.otherLiabilities);
      dataToSend['reserves'].push(obj.value.reserves);
      dataToSend['shareCapital'].push(obj.value.shareCapital);
      dataToSend['totalAssets'].push(obj.value.totalAssets);
      dataToSend['totalLiabilities'].push(obj.value.totalLiabilities);
    });
    // console.log(dataToSend);
    return dataToSend;
  }

  getCashflow(data) {
    let dataToSend = {
      monthYear: [],
      financing: [],
      investment: [],
      netCashflow: [],
      operation: []
    };
    data.forEach((obj, key) => {
      dataToSend['monthYear'].push(obj.month_year);
      dataToSend['financing'].push(obj.value.financing);
      dataToSend['investment'].push(obj.value.investment);
      dataToSend['netCashflow'].push(obj.value.netCashflow);
      dataToSend['operation'].push(obj.value.operation);
    });
    // console.log(dataToSend);
    return dataToSend;
  }

  ngOnInit() {
    // this.code = this.activatedRoute.snapshot.paramMap.get('code');
    // this.getCompanyDetails();
  }

}
