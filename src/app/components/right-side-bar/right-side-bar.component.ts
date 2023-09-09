import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/services/movies.service';
import * as _ from "lodash";
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-right-side-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.scss']
})
export class RightSideBarComponent {
  result: any
  newestResult: any
  popularData: any[] = []
  newestData: any[] = []
  movieGenra: any = []
  imageUrlPoster = 'https://image.tmdb.org/t/p/w780';
  genraList = [
    { 28: 'Action' },
    { 12: 'Adventure' },
    { 16: 'Animation' },
    { 35: 'Comedy' },
    { 80: 'Crime' },
    { 99: 'Documentary' },
    { 18: 'Drama' },
    { 10751: 'Family' },
    { 14: 'Fantasy' },
    { 36: 'History' },
    { 27: 'Horror' },
    { 10402: 'Music' },
    { 9648: 'Mystery' },
    { 10749: 'Romance' },
    { 878: 'Science Fiction' },
    { 10770: 'TV Movie' },
    { 53: 'Thriller' },
    { 10752: 'War' },
    { 37: 'Western' },
  ]
  constructor(
    private movieService: MoviesService,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit() {
    this.getPopular();
    this.getNewest()
    setInterval(() => {
      this.popularData = _.sampleSize(this.result, 4)
      this.newestData = _.sampleSize(this.newestResult, 4)
    }, 5000);
  }

  getNewest() {

    this.movieService.getMovieLists().subscribe({
      next: (res) => {
        this.newestResult = res.results
        this.newestData = _.sampleSize(res.results, 4)

      },
      error: (err) => {
        console.log('err', err);
      },

    });
  }

  getPopular() {

    this.movieService.getPopular().subscribe({
      next: (res) => {
        this.result = res.results
        this.popularData = _.sampleSize(res.results, 4)

      },
      error: (err) => {
        console.log('err', err);
      },

    });
  }

  genraNames(genraIds: any = []) {
    const genreIdsToSelect = genraIds; // Replace this with your array of genre IDs to select
    const selectedGenres = _.filter(this.genraList, (genre) => {
      const genreId = Number(_.keys(genre)[0]);
      return _.includes(genreIdsToSelect, genreId);
    }).map((genre) => _.values(genre)[0]);
    return _.sampleSize(selectedGenres, 3)
  }
}
