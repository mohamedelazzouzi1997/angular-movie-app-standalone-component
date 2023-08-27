import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/services/movies.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TrailerModalComponent } from './trailer-modal/trailer-modal.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  imageUrlPoster = 'https://image.tmdb.org/t/p/w185';
  imageUrlBg = 'https://image.tmdb.org/t/p/w780';
  data: any = [];
  trailerData: any = [];
  constructor(private movieService: MoviesService, private dialog: MatDialog) {}

  @Input('id') movieId!: number;

  ngOnInit(): void {
    this.getMovieDetails();
  }
  getMovieDetails() {
    this.movieService.getMovieDetails(this.movieId).subscribe({
      next: (res) => {
        this.data = res;
        console.log('res', res);
      },
      error: (err) => console.error,
    });
  }

  openTrailer() {
    this.movieService.getTrailer(this.movieId).subscribe({
      next: (res) => {
        console.log('trailer', res);
        this.trailerData = res.results.filter(
          (item: any) => item.type == 'Trailer'
        );
        console.log('this.', this.trailerData);
        this.dialog.open(TrailerModalComponent, {
          data: this.trailerData,
        });
      },
      error: (err) => console.error,
    });
  }

  get getYear() {
    const date = new Date(this.data.release_date);
    const year = date.getFullYear();
    return year;
  }
}
