import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/services/movies.service';
import { ListingComponent } from 'src/app/components/listing/listing.component';
import * as _ from 'lodash'

@Component({
  selector: 'app-by-cast',
  standalone: true,
  imports: [CommonModule, ListingComponent],
  templateUrl: './by-cast.component.html',
  styleUrls: ['./by-cast.component.scss']
})
export class ByCastComponent {
  @Input({ required: true }) castId: any
  order: boolean = true

  data: any = [];
  castDetails: any
  casterMoviesCount: number = 0
  imageUrlPoster = 'https://image.tmdb.org/t/p/w342';
  constructor(
    private movieService: MoviesService,

  ) { }

  ngOnInit() {
    this.getMoviesByCastId();
    this.getCastDetailsById()
  }
  sort(buttonClicked: boolean = false) {
    if (buttonClicked)
      this.order = !this.order
    this.data = _.orderBy(this.data, ['vote_average'], this.order ? ['asc'] : ['desc'])
  }
  getCastDetailsById() {
    this.movieService.getCastDetailsById(this.castId).subscribe({
      next: (res) => {
        this.castDetails = res;
        // this.sort()

      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

  getMoviesByCastId() {
    this.movieService.getMoviesByCastId(this.castId).subscribe({
      next: (res) => {
        this.data = [...res.cast];
        this.casterMoviesCount = this.data.length
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

}
