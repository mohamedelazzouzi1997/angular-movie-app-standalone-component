import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { YouTubePlayerModule } from '@angular/youtube-player';
let apiLoaded = false;

@Component({
  selector: 'app-trailer-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, YouTubePlayerModule],
  templateUrl: './trailer-modal.component.html',
  styleUrls: ['./trailer-modal.component.scss'],
})
export class TrailerModalComponent {
  key: any = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    this.key = this.data.pop().key;
    if (!apiLoaded) {

      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }
  }
}
