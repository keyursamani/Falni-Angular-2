import {Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {CompanyDetailComponent} from './main/company-detail/company-detail.component';
import {AuthGuardService} from './core/service/auth-guard.service';
import {HomeComponent} from './main/home/home.component';

const mainRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: ':code', component: CompanyDetailComponent },
];

export const routes: Routes = [
  {path : '', redirectTo: '/home', pathMatch: 'full' },
  {path : 'auth', loadChildren: 'app/auth/auth.module#AuthModule'},
  {path : 'portfolio', loadChildren: 'app/portfolio/portfolio.module#PortfolioModule', canActivate: [ AuthGuardService ]},
  {path : 'watchlist', loadChildren: 'app/watchlist/watchlist.module#WatchlistModule', canActivate: [ AuthGuardService ]},
  {path : '', component: MainComponent, children: mainRoutes}
];
