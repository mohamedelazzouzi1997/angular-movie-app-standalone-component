import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { ListingComponent } from 'src/app/components/listing/listing.component';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, ListingComponent],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent {
  data: any = [];
  totalWatchList: number = 0
  page: number = 1;
  user: any
  paginationLength: any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    const user: any = localStorage.getItem('TMDB-user-info')
    this.user = JSON.parse(user)
    if (this.user.id)
      this.watcheList(this.page);
  }

  watcheList(page: any) {

    this.userService.getUserWatchList(this.user.id, page).subscribe({
      next: res => {
        this.data = res.results;
        this.paginationLength = res.total_pages;
        this.totalWatchList = res.total_results
      },
      error: err => console.error
    })
  }

  previousList(page: number) {
    this.page = page;
    this.watcheList(page);
  }
  nextList(page: number) {
    this.page = page;
    this.watcheList(page);
  }

}
