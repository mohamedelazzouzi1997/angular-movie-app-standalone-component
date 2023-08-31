import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/services/movies.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TrailerModalComponent } from './trailer-modal/trailer-modal.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterLink } from '@angular/router';
import { PostersModalComponent } from '../posters-modal/posters-modal.component';


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonToggleModule, RouterLink, PostersModalComponent],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  imageUrlPoster = 'https://image.tmdb.org/t/p/w780';
  imageUrlBg = 'https://image.tmdb.org/t/p/w1280';
  imgProviderUrl = 'https://image.tmdb.org/t/p/w92';
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
  providers: any = []
  imagesPosters: any = []
  ImagesBackdrops: any = []
  //department array
  currentImageUrl: string = '';




  selectedDetails: string = 'cast'
  constructor(private movieService: MoviesService, private dialog: MatDialog) { }


  @Input('id') movieId!: number;
  ngOnInit(): void {
    this.getMovieDetails();
    this.getCredits()
    this.getMovieProviders()


  }


  getMovieDetails() {
    this.movieService.getMovieDetails(this.movieId).subscribe({
      next: (res) => {
        this.data = res;
      },
      error: (err) => console.error,
    });
  }

  getMovieImages() {
    this.movieService.getMovieImages(this.movieId).subscribe({
      next: (res) => {
        // this.imagesPosters = res.posters.map((item: { file_path: any; }) => { return item.file_path });
        this.imagesPosters = res.posters;
        this.dialog.open(PostersModalComponent, {
          data: this.imagesPosters,
          width: '300px'
        });
        this.ImagesBackdrops = res.backdrops.map((item: { file_path: any; }) => { return item.file_path });
      },
      error: (err) => console.error,
    });
  }

  getMovieProviders() {
    this.movieService.getMovieProviders(this.movieId).subscribe({
      next: (res) => {
        if (Object.keys(res.results).length) {
          if (res.results.US)
            this.providers = res.results.US;
          else if (res.results.CA)
            this.providers = res.results.CA;
          else {
            this.providers = Object.values(res.results)[0];
          }
        }
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

}
