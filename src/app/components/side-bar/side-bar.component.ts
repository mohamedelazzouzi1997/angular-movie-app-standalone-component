import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment.development';

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

  constructor(private auth: AuthService, private cookieService: CookieService, private userService: UserService) {

  }


  ngOnInit(): void {
    this.isSessionExist = this.cookieService.check('TMDB-session-id')
    this.session_id = this.cookieService.get('TMDB-session-id')
    if (this.isSessionExist) {
      this.profile()
    }
  }


  login() {
    const isSessionExist = this.cookieService.check('TMDB-session-id')
    if (!isSessionExist) {
      this.auth.requestToken().subscribe({
        next: res => {
          window.location.href = `https://www.themoviedb.org/authenticate/${res.request_token}?redirect_to=${environment.domain}approved`;
        },
        error: err => console.error
      })
    }
  }

  profile() {
    this.userService.getUserProfile(this.session_id).subscribe({
      next: res => {
        this.user = res
        this.userService.setUserInfo(this.user);
      },
      error: err => {
        console.error
      },
    })
  }

  // watcheList() {
  //   this.userService.getUserWatchList(this.user.id).subscribe({
  //     next: res => {
  //       console.log('watch list ', res)
  //       this.userService.setUserWatchList(res.results)
  //     },
  //     error: err => console.error
  //   })
  // }
}
