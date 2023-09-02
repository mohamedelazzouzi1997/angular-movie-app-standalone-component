import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/services/movies.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TrailerModalComponent } from './trailer-modal/trailer-modal.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterLink } from '@angular/router';
import { PostersModalComponent } from '../posters-modal/posters-modal.component';
import { ModalVideosComponent } from '../modal-videos/modal-videos.component';
import { ListingComponent } from 'src/app/components/listing/listing.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonToggleModule, RouterLink, PostersModalComponent, ModalVideosComponent, ListingComponent],
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
  videos: any = []
  similarMovies: any = []
  //department array
  currentImageUrl: string = '';




  selectedDetails: string = 'cast'
  constructor(private movieService: MoviesService, private dialog: MatDialog, private router: Router) {

  }
  @Input('id') movieId!: number;

  ngOnInit(): void {
    this.getMovieDetails();
    this.getCredits()
    this.getMovieProviders()
    this.getSimilareMovies()
    console.log('this movieid', this.movieId)
  }

  changeMovieId(id: number) {
    this.movieId = id
    this.ngOnInit();
  }

  getMovieDetails() {
    this.movieService.getMovieDetails(this.movieId).subscribe({
      next: (res) => {
        this.data = res;

      },
      error: (err) => console.error,
    });
  }

  getMovieVideos() {
    this.movieService.getMovieVideos(this.movieId).subscribe({
      next: (res) => {
        this.videos = res.results
        this.dialog.open(ModalVideosComponent, {
          data: this.videos,
        });
      },
      error: (err) => console.error,
    });
  }
  getSimilareMovies() {
    this.movieService.getSimilareMovies(this.movieId).subscribe({
      next: (res) => {
        this.similarMovies = res.results.filter((item: { poster_path: any }) => {
          return item.poster_path;
        }).slice(0, 10)
      },
      error: (err) => console.error,
    });
  }
  getMovieImages(target: string = 'posters') {
    this.movieService.getMovieImages(this.movieId).subscribe({
      next: (res) => {
        // this.imagesPosters = res.posters.map((item: { file_path: any; }) => { return item.file_path });

        this.imagesPosters = res.posters
        this.ImagesBackdrops = res.backdrops

        let data = target == 'posters' ? this.imagesPosters : this.ImagesBackdrops
        this.dialog.open(PostersModalComponent, {
          data: {
            data: data,
            target: target
          },
          width: target == 'posters' ? '300px' : 'auto',
        });
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
