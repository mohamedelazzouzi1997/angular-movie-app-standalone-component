import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListingComponent } from 'src/app/components/listing/listing.component';

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

  constructor(
    private movieService: MoviesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getPopular(this.page);
  }

  getPopular(page: number) {
    this.page = page;

    this.movieService.getPopular(page).subscribe({
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
