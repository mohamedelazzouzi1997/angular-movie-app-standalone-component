import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RightSideBarComponent } from './components/right-side-bar/right-side-bar.component';
import { inject } from '@vercel/analytics';
import { UserService } from './services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { initFlowbite } from 'flowbite';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, RightSideBarComponent],
})
export class AppComponent {
  user: any
  isSessionExist: boolean = false
  session_id: string = ''

  constructor(private userService: UserService, private cookieService: CookieService) {

  }

  ngOnInit(): void {
    inject()
    initFlowbite();
    this.themeMode()
    this.isSessionExist = this.cookieService.check('TMDB-session-id')
    this.session_id = this.cookieService.get('TMDB-session-id')
    if (this.isSessionExist)
      this.profile()

  }

  themeMode() {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark')
    }

    var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Change the icons inside the button based on previous settings
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      themeToggleLightIcon?.classList.remove('hidden');
    } else {
      themeToggleDarkIcon?.classList.remove('hidden');
    }

    var themeToggleBtn = document.getElementById('theme-toggle');

    themeToggleBtn?.addEventListener('click', function () {
      // toggle icons inside button
      themeToggleDarkIcon?.classList.toggle('hidden');
      themeToggleLightIcon?.classList.toggle('hidden');

      // if set via local storage previously
      if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        }

        // if NOT set via local storage previously
      } else {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        }
      }

    });

  }

  profile() {
    this.userService.getUserProfile(this.session_id).subscribe({
      next: res => {
        this.user = res
        this.userService.setUserInfo(this.user);
        localStorage.setItem('TMDB-user-info', JSON.stringify(this.user));
      },
      error: err => {
        console.error
      },
      complete: () => {
        this.watcheList()
        this.favoritList()
      }
    })
  }

  watcheList() {
    this.userService.getUserWatchList(this.user.id).subscribe({
      next: res => {
        this.userService.setWatchList(res)
      },
      error: err => console.error
    })
  }

  favoritList() {
    this.userService.getUserfavoriteList(this.user.id).subscribe({
      next: res => {
        this.userService.setfavoriteList(res)
      },
      error: err => console.error
    })
  }
}
