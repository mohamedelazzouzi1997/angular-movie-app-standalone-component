import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {

  profileURL = 'https://image.tmdb.org/t/p/w45'
  isSessionExist: boolean = false
  session_id: any
  user: any
  constructor(private auth: AuthService, private cookieService: CookieService) {

  }


  ngOnInit(): void {
    this.isSessionExist = this.cookieService.check('TMDB-session-id')
    this.session_id = this.cookieService.get('TMDB-session-id')
    if (this.isSessionExist)
      this.profile()
  }


  login() {
    const authTokenExists = this.cookieService.check('TMDB-authToken')

    if (!authTokenExists) {

      this.auth.requestToken().subscribe({
        next: res => {
          window.location.href = `https://www.themoviedb.org/authenticate/${res.request_token}?redirect_to=http://localhost:4200/approved`;
        },
        error: err => console.error
      })
    } else if (!this.isSessionExist && authTokenExists) {
      const token = this.cookieService.get('TMDB-authToken')
      this.auth.createSession(token).subscribe({
        next: res => {
          if (res.success) {
            // const futureDate = new Date();
            // futureDate.setFullYear(futureDate.getFullYear() + 100);
            this.cookieService.set('TMDB-session-id', res.session_id)
            this.isSessionExist = true
          }
        },
        error: err => console.error
      })
    }
  }

  profile() {
    this.auth.getUserProfile(this.session_id).subscribe({
      next: res => {
        this.user = res
        console.log('user', res)
      },
      error: err => console.error
    })
  }
}
