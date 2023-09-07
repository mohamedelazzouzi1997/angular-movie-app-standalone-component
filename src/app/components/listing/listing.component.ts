import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent {
  @Input() item: any;
  @Input() height: any
  imageUrlPoster = 'https://image.tmdb.org/t/p/w780';


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  isWatched(movieId: number): boolean {
    const movieIds: any[] = this.getIdsFromLocalStorage()
    const isWatched = movieIds.includes(movieId.toString())
    return isWatched
  }

  isFavourit(movieId: number): boolean {
    const favouritMovieIds: any[] = this.getFavouritMovieIds()
    const isFavourit = favouritMovieIds.includes(movieId.toString())
    return isFavourit
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
