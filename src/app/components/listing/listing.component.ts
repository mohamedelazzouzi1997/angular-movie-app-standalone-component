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
  imageUrlPoster = 'https://image.tmdb.org/t/p/w185';
}
