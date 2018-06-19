import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from '../common/header/header.component';
import {CoreModule} from '../core/core.module';
import { AddStockComponent } from './add-stock/add-stock.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';

const routes: Routes = [
  { path: '', component: PortfolioComponent }
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  declarations: [
    PortfolioComponent,
    AddStockComponent
  ],
  bootstrap: [PortfolioComponent],
  entryComponents: [
    AddStockComponent
  ]
})
export class PortfolioModule { }
