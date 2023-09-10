import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from 'src/app/services/movies.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TrailerModalComponent } from './trailer-modal/trailer-modal.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router, RouterLink } from '@angular/router';
import { PostersModalComponent } from '../posters-modal/posters-modal.component';
import { ModalVideosComponent } from '../modal-videos/modal-videos.component';
import { ListingComponent } from 'src/app/components/listing/listing.component';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';


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
  rateCount: number = 0
  arrayStars = Array.from({ length: 10 }, (_, i) => i + 1)
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
  notFound: boolean = false
  //department array
  currentImageUrl: string = '';
  userInfo: any
  selectedDetails: string = 'cast'
  isSessionExist: any
  movieStatus: any
  movieIds: any = []
  private subscription: Subscription;
  constructor(
    private movieService: MoviesService,
    private AuthService: AuthService,
    private dialog: MatDialog,
    private userService: UserService,
    private _toastr: ToastrService,
    private cookieService: CookieService) {
    this.subscription = this.userService.triggerFunction.subscribe((movieId: any) => {
      this.movieId = movieId
      this.ngOnInit();
    });
  }
  @Input('id') movieId!: number;

  ngOnInit(): void {
    this.userInfo = this.userService.getUserInfo();
    this.isSessionExist = this.cookieService.check('TMDB-session-id')

    this.getMovieDetails();
    this.getCredits()
    this.getMovieProviders()
    this.getSimilareMovies()

    if (this.isAuthenticated) {
      this.movieAccountStatus()
    }

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  removeRating() {
    this.movieService.removeRateMovie(this.movieId).subscribe({
      next: (res) => {
        this._toastr.success('Movie rated removed successfully')
        this.rateCount = 0
      },
      error: (err) => console.error
    })

  }

  rating(rate: number) {

    if (rate != this.movieStatus.rated?.value) {
      this.movieStatus.rated = { "value": rate }
      this.movieService.rateMovie(this.movieId, this.movieStatus.rated.value).subscribe({
        next: res => {
          this.rateCount = rate
          this._toastr.success('Movie rated successfully')
        },
        error: err => console.error
      })
    }
  }

  addToWatch() {
    const movieIds: any[] = this.getIdsFromLocalStorage()
    if (!movieIds.includes(this.movieId)) {
      localStorage.setItem('movieIds', JSON.stringify([...movieIds, this.movieId]));
      this._toastr.success(`‘${this.data.original_title}’ was added to your seen movies list.`)
      this.isWatched
    }
  }

  removeFromWatch() {
    let watchedmovieIds: any[] = this.getIdsFromLocalStorage()
    if (watchedmovieIds.includes(this.movieId)) {
      watchedmovieIds = watchedmovieIds.filter(item => item != this.movieId)
      localStorage.setItem('movieIds', JSON.stringify([...watchedmovieIds]));
      this._toastr.info(`‘${this.data.original_title}’  was removed from your seen movies list.`)

      this.isWatched
    }
  }

  addToFavourit() {
    const favouritmovieIds: any[] = this.getFavouritMovieIds()
    if (!favouritmovieIds.includes(this.movieId)) {
      localStorage.setItem('favoutiteMovieIds', JSON.stringify([...favouritmovieIds, this.movieId]));
    }
  }

  removeFromFavourit() {
    let favouritmovieIds: any[] = this.getFavouritMovieIds()
    if (favouritmovieIds.includes(this.movieId)) {
      favouritmovieIds = favouritmovieIds.filter(item => item != this.movieId)
      localStorage.setItem('favoutiteMovieIds', JSON.stringify([...favouritmovieIds]));
    }
  }

  addToFavouritList() {
    if (!this.userInfo) //get user if undefined
      this.userInfo = this.userService.getUserInfo()
    if (!this.movieStatus.favorite) {
      this.movieService.addToFavouritList(this.movieId, this.userInfo.id).subscribe({
        next: (res) => {
          this.movieAccountStatus()
          this.addToFavourit()
          this._toastr.success(`‘${this.data.original_title}’ was added to your favorite List.`)

        },
        error: (err) => console.error,
      });
    } else {
      this.movieService.removeFromFavouritList(this.movieId, this.userInfo.id).subscribe({
        next: (res) => {
          this.movieAccountStatus()
          this.removeFromFavourit()
          this._toastr.info(`‘${this.data.original_title}’ was removed from your favorite List.`)
        },
        error: (err) => console.error,
      });
    }

  }

  addToWatchList() {
    if (!this.userInfo) //get user if undefined
      this.userInfo = this.userService.getUserInfo()
    if (!this.movieStatus.watchlist) {
      this.movieService.addToWatchList(this.movieId, this.userInfo.id).subscribe({
        next: (res) => {
          this._toastr.success(`‘${this.data.original_title}’ was added to your watchlist.`)
          this.movieAccountStatus()
        },
        error: (err) => console.error,
      });
    } else {
      this.movieService.removeFromWatchList(this.movieId, this.userInfo.id).subscribe({
        next: (res) => {
          this._toastr.info(`‘${this.data.original_title}’ was removed from your watchlist.`)
          this.movieAccountStatus()
        },
        error: (err) => console.error,
      });
    }
  }

  movieAccountStatus() {
    this.movieService.movieAccountStatus(this.movieId).subscribe({
      next: (res) => {
        this.movieStatus = res
        if (this.movieStatus.rated)
          this.rateCount = this.movieStatus.rated.value
        else
          this.rateCount = 0
      },
      error: (err) => console.error,
    });
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
      error: (err) => {
        this.notFound = true

        // this.router.navigate(['not-found'])
      },
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
          return item.poster_path != null;
        }).slice(0, 14)
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

  get isAuthenticated(): boolean {
    return this.AuthService.isAuthenticated()
  }

  get isWatched(): boolean {
    const movieIds: any[] = this.getIdsFromLocalStorage()
    return movieIds.includes(this.movieId)
  }

  getIdsFromLocalStorage(): any {
    const storedIds: any = localStorage.getItem('movieIds');
    return storedIds ? JSON.parse(storedIds) : []
  }

  getFavouritMovieIds(): any {
    const storedIds: any = localStorage.getItem('favoutiteMovieIds');
    return storedIds ? JSON.parse(storedIds) : []
  }
}
