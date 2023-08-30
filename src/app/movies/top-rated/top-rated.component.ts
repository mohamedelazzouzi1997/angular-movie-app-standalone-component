import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { ListingComponent } from 'src/app/components/listing/listing.component';

@Component({
  selector: 'app-top-rated',
  standalone: true,
  imports: [CommonModule, ListingComponent],
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss'],
})
export class TopRatedComponent {
  data: any = [];

  page: number = 1;

  paginationLength: any;


  constructor(
    private movieService: MoviesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getTopRated(this.page);
  }

  getTopRated(page: number) {
    this.page = page;

    this.movieService.getTopRated(page).subscribe({
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
    this.getTopRated(page);
  }
  nextList(page: number) {
    this.changeParam(page);
    this.page = page;
    this.getTopRated(page);
  }

  changeParam(page: number) {
    const queryParams: Params = { page: page };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
    });
  }
}
