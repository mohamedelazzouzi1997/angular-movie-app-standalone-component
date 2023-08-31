import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { GalleriaModule } from 'primeng/galleria';

let apiLoaded = false;


@Component({
  selector: 'app-modal-videos',
  standalone: true,
  imports: [CommonModule, MatDialogModule, YouTubePlayerModule, GalleriaModule],
  templateUrl: './modal-videos.component.html',
  styleUrls: ['./modal-videos.component.scss']
})
export class ModalVideosComponent {
  videos: any[] | undefined;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  responsiveOptions: any[] = [
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


  ngOnInit() {
    console.log('dataaaaaaaaaaa', this.data)
    this.videos = this.data
    if (!apiLoaded) {

      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }
  }
}
