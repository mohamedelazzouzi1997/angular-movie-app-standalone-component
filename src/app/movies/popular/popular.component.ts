import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListingComponent } from 'src/app/components/listing/listing.component';
import * as _ from 'lodash'

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [CommonModule, ListingComponent],
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
})
export class PopularComponent {
  data: any = [];
  page: number = 1;
  paginationLength: any;
  order: boolean = false

  constructor(
    private movieService: MoviesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getPopular(this.page);
  }
  sort(buttonClicked: boolean = false) {
    if (buttonClicked)
      this.order = !this.order
    this.data = _.orderBy(this.data, ['vote_average'], this.order ? ['asc'] : ['desc'])
  }
  getPopular(page: number) {
    this.page = page;

    this.movieService.getPopular(page).subscribe({
      next: (res) => {
        this.data = res.results;
        this.paginationLength = res.total_pages;
        this.sort()

      },
      error: (err) => {
      },
      complete: () => {
      },
    });
  }

  previousList(page: number) {
    this.changeParam(page);
    this.page = page;
    this.getPopular(page);
  }
  nextList(page: number) {
    this.changeParam(page);
    this.page = page;
    this.getPopular(page);
  }

  changeParam(page: number) {
    const queryParams: Params = { page: page };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
    });
  }
}
