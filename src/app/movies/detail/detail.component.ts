import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/services/movies.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TrailerModalComponent } from './trailer-modal/trailer-modal.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonToggleModule, RouterLink],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  imageUrlPoster = 'https://image.tmdb.org/t/p/w185';
  imageUrlBg = 'https://image.tmdb.org/t/p/w780';
  Director: string = ''
  data: any = [];
  casts: any = []
  crews: any = []
  trailerData: any = [];
  //department array
  camera: any = [];
  production: any = [];
  writer: any = [];
  makeUp: any = [];
  sound: any = [];
  directing: any = []
  //department array


  selectedDetails: string = 'cast'
  constructor(private movieService: MoviesService, private dialog: MatDialog) { }


  @Input('id') movieId!: number;
  ngOnInit(): void {
    this.getMovieDetails();
    this.getCredits()
  }
  getMovieDetails() {
    this.movieService.getMovieDetails(this.movieId).subscribe({
      next: (res) => {
        this.data = res;
      },
      error: (err) => console.error,
    });
  }



  showDetails(target: string) {
    this.selectedDetails = target

  }



  getCredits() {
    this.movieService.getCredits(this.movieId).subscribe({
      next: (res) => {
        this.casts = res.cast;

        this.crews = res.crew
        this.crews.forEach((element: { department: string; }) => {
          if (element.department == 'Camera')
            this.camera.push(element)

          if (element.department == 'Production')
            this.production.push(element)

          if (element.department == 'Writing')
            this.writer.push(element)

          if (element.department == 'Costume & Make-Up')
            this.makeUp.push(element)

          if (element.department == 'Sound')
            this.sound.push(element)

          if (element.department == 'Directing')
            this.directing.push(element)
        });;
        this.Director = this.directing[0].original_name
      },
      error: (err) => console.error,
    });
  }

  castNameSlug(name: string) {
    return name
      .toLowerCase()           // Convert to lowercase
      .replace(/\s+/g, '-')    // Replace spaces with hyphens
      .replace(/[^\w-]+/g, '') // Remove non-word characters except hyphens
      .replace(/--+/g, '-')    // Replace multiple hyphens with a single hyphen
      .replace(/^-+|-+$/g, ''); // Remove hyphens from the beginning and end
  }

  openTrailer() {
    this.movieService.getTrailer(this.movieId).subscribe({
      next: (res) => {

        this.trailerData = res.results.filter(
          (item: any) => item.type == 'Trailer'
        );
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
