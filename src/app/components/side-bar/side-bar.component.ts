import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment.development';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { filter, map } from 'rxjs';
@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {

  profileURL = 'https://image.tmdb.org/t/p/w45'
  isSessionExist: boolean = false
  session_id: any
  user: any
  userWatchList: any
  userfavoritList: any
  total_watchList: number = 0
  total_favorit: number = 0
  constructor(private auth: AuthService, private cookieService: CookieService, private userService: UserService) {

  }


  ngOnInit(): void {
    this.isSessionExist = this.cookieService.check('TMDB-session-id')
    this.session_id = this.cookieService.get('TMDB-session-id')
    this.getUserWatchList()
    this.getUserFavoritList()
    if (this.isSessionExist)
      this.getUserInfo()
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

  getUserWatchList() {
    this.userService.userWatchList$.pipe(
      filter(watchList => watchList !== undefined)
    ).subscribe({
      next: res => {
        this.userWatchList = res
        this.total_watchList = res.total_results
      },
      error: err => {
        console.error
      }
    })
  }

  getUserFavoritList() {
    this.userService.userLike$.pipe(
      filter(favoritList => favoritList !== undefined)
    ).subscribe({
      next: res => {
        this.userfavoritList = res
        this.total_favorit = res.total_results
      },
      error: err => {
        console.error
      }
    })
  }

  getUserInfo() {
    this.userService.userInfoSubject$.pipe(
      filter((userInfo) => userInfo !== undefined),
    ).subscribe({
      next: res => {
        this.user = res
      }
    })
  }
}
