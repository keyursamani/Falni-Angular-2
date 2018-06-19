import { Component, OnInit } from '@angular/core';
import {WatchlistService} from '../core/service/watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  watchlistData;
  constructor(
    private watchlistService: WatchlistService
  ) { }

  getWatchlist(): void {
    this.watchlistService.getWatchlist()
      .subscribe((res) => {
        console.log(res);
        this.watchlistData = res.body;
      },
      error => {
        console.log(error);
      });
  }

  removeFromWatchlist(id) {
    // console.log(id);
    this.watchlistService.removeFromWatchlist(id)
      .subscribe((res) => {
        console.log(res);
        this.getWatchlist();
      });
  }

  ngOnInit() {
    this.getWatchlist();
  }

}
