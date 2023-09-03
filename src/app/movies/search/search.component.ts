import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingComponent } from 'src/app/components/listing/listing.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ListingComponent, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  data: any = [];
  query: any = ''
  page: number = 1;

  paginationLength: any;


  constructor(
    private movieService: MoviesService,
  ) { }

  ngOnInit() {
  }

  search(page: number = 1) {
    console.log('val', this.query)
    // this.query = event.value
    this.movieService.search(this.query, page).subscribe({
      next: (res) => {
        console.log('res', res);
        this.data = res.results;
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

  previousList(page: number) {
    this.page = page
    this.search(page);
  }
  nextList(page: number) {
    this.page = page
    this.search(page);
  }

}
