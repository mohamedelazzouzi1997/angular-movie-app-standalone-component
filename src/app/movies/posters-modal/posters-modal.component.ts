import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-posters-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonToggleModule, RouterLink, CarouselModule, GalleriaModule],
  templateUrl: './posters-modal.component.html',
  styleUrls: ['./posters-modal.component.scss']
})
export class PostersModalComponent {

  imagesPosters: any = []
  responsiveOptions: any[] | undefined;
  imageUrlPoster = 'https://image.tmdb.org/t/p/w780';
  imageUrlBackDrop = 'https://image.tmdb.org/t/p/w1280';



  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    this.imagesPosters = this.data.data

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5
      },
      {
        breakpoint: '768px',
        numVisible: 3
      },
      {
        breakpoint: '560px',
        numVisible: 1
      }
    ];
  }

}
