import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingComponent } from 'src/app/components/listing/listing.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favourit',
  standalone: true,
  imports: [CommonModule, ListingComponent],
  templateUrl: './favourit.component.html',
  styleUrls: ['./favourit.component.scss']
})
export class FavouritComponent {
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
      this.favoritList(this.page);
  }

  favoritList(page: any) {

    this.userService.getUserfavoriteList(this.user.id, page).subscribe({
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
    this.favoritList(page);
  }
  nextList(page: number) {

    this.page = page;
    this.favoritList(page);
  }

}
