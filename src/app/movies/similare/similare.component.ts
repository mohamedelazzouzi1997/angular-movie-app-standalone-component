import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { ListingComponent } from 'src/app/components/listing/listing.component';
import * as _ from 'lodash'

@Component({
  selector: 'app-similare',
  standalone: true,
  imports: [CommonModule, ListingComponent],
  templateUrl: './similare.component.html',
  styleUrls: ['./similare.component.scss']
})
export class SimilareComponent {
  @Input({ required: true }) id: any
  @Input({ required: true }) movie: any
  order: boolean = true

  data: any = [];
  totalGenraMovie: number = 0

  page: number = 1;
  paginationLength: any;


  constructor(
    private movieService: MoviesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getSimilareMovies(this.page);
  }
  sort(buttonClicked: boolean = false) {
    if (buttonClicked)
      this.order = !this.order
    this.data = _.orderBy(this.data, ['vote_average'], this.order ? ['asc'] : ['desc'])
  }
  getSimilareMovies(page: number) {
    this.page = page;

    this.movieService.getSimilareMovies(this.id, page).subscribe({
      next: (res) => {
        this.data = res.results;
        this.paginationLength = res.total_pages;
        this.totalGenraMovie = this.paginationLength * this.data.length
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
    this.getSimilareMovies(page);
  }
  nextList(page: number) {
    this.changeParam(page);
    this.page = page;
    this.getSimilareMovies(page);
  }

  changeParam(page: number) {
    const queryParams: Params = { page: page };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
    });
  }
}
