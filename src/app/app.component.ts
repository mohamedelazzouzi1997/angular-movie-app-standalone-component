import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RightSideBarComponent } from './components/right-side-bar/right-side-bar.component';
import { inject } from '@vercel/analytics';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, RightSideBarComponent],
})
export class AppComponent {

  constructor() {
    inject()
  }

}
