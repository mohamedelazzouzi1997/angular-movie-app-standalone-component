import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListingComponent } from 'src/app/components/listing/listing.component';

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [CommonModule, ListingComponent],
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent {

  @Input({ required: true }) id: any
  @Input({ required: true }) genre: any

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
    this.getMoviesGenraList(this.page);
  }

  getMoviesGenraList(page: number) {
    this.page = page;

    this.movieService.getMoviesGenraList(this.id, page).subscribe({
      next: (res) => {
        this.data = res.results;
        this.paginationLength = res.total_pages;
        this.totalGenraMovie = this.paginationLength * this.data.length
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
    this.getMoviesGenraList(page);
  }
  nextList(page: number) {
    this.changeParam(page);
    this.page = page;
    this.getMoviesGenraList(page);
  }

  changeParam(page: number) {
    const queryParams: Params = { page: page };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
    });
  }
}
