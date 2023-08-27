import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListingComponent } from 'src/app/components/listing/listing.component';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule, ListingComponent],
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent {
  data: any = [];

  page: number = 1;
  repeatedArray = Array.from({ length: 9 }, (_, index) => index + 1);
  paginationLength: any;
  newArray: any = [];

  constructor(
    private movieService: MoviesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getMovieList(this.page);
  }

  getMovieList(page: number) {
    this.page = page;

    this.movieService.getMovieLists(page).subscribe({
      next: (res) => {
        console.log('res', res);
        this.data = res.results;
        this.paginationLength = res.total_pages;
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
    this.getMovieList(page);
  }
  nextList(page: number) {
    this.changeParam(page);
    this.page = page;
    this.getMovieList(page);
  }

  changeParam(page: number) {
    const queryParams: Params = { page: page };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
    });
  }
}
