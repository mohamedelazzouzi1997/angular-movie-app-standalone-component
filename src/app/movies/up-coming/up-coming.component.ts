import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListingComponent } from 'src/app/components/listing/listing.component';
import { MoviesService } from 'src/app/services/movies.service';
import * as _ from 'lodash'

@Component({
  selector: 'app-up-coming',
  standalone: true,
  imports: [CommonModule, ListingComponent],
  templateUrl: './up-coming.component.html',
  styleUrls: ['./up-coming.component.scss'],
})
export class UpComingComponent {
  data: any = [];

  page: number = 1;
  order: boolean = true

  paginationLength: any;


  constructor(
    private movieService: MoviesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  sort(buttonClicked: boolean = false) {
    if (buttonClicked)
      this.order = !this.order
    this.data = _.orderBy(this.data, ['vote_average'], this.order ? ['asc'] : ['desc'])
  }
  ngOnInit() {
    this.getMovieUpComing(this.page);
  }

  getMovieUpComing(page: number) {
    this.page = page;

    this.movieService.getMovieUpComing(page).subscribe({
      next: (res) => {
        this.data = res.results;
        this.paginationLength = res.total_pages;
        // this.sort()

      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {
        this.changeParam(this.page);
      },
    });
  }

  previousList(page: number) {
    this.changeParam(page);
    this.page = page;
    this.getMovieUpComing(page);
  }
  nextList(page: number) {
    this.changeParam(page);
    this.page = page;
    this.getMovieUpComing(page);
  }

  changeParam(page: number) {
    const queryParams: Params = { page: page };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
    });
  }
}
