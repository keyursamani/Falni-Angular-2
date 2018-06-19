import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistComponent } from './watchlist.component';
import {RouterModule, Routes} from '@angular/router';
import {CoreModule} from '../core/core.module';

const routes: Routes = [
  { path: '', component: WatchlistComponent}
]

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WatchlistComponent],
  bootstrap: [WatchlistComponent]
})
export class WatchlistModule { }
