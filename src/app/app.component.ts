import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RightSideBarComponent } from './components/right-side-bar/right-side-bar.component';
import { inject } from '@vercel/analytics';
import { UserService } from './services/user.service';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, RightSideBarComponent],
})
export class AppComponent {

  isSessionExist: boolean = false
  session_id: string = ''
  constructor(private userService: UserService, private cookieService: CookieService) {

  }

  ngOnInit(): void {
    inject()
    this.isSessionExist = this.cookieService.check('TMDB-session-id')
    this.session_id = this.cookieService.get('TMDB-session-id')
    if (this.isSessionExist)
      this.profile()

  }

  profile() {
    this.userService.getUserProfile(this.session_id).subscribe({
      next: res => {
        const user: any = res
        this.userService.setUserInfo(user);
        localStorage.setItem('TMDB-user-info', JSON.stringify(user));
      },
      error: err => {
        console.error
      },
    })
  }
}
