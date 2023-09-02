import { CookieService } from 'ngx-cookie-service'
import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-approved',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.scss']
})


export class ApprovedComponent {

  requestToken: string = ''
  denied: boolean = false
  approved: boolean = false

  constructor(private _route: ActivatedRoute, private cookieService: CookieService, private router: Router) {

  }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      this.requestToken = params['request_token']
      this.denied = params['denied']
      this.approved = params['approved']
    });

    this.setAuthToken()
  }

  setAuthToken() {

    const authTokenExists = this.cookieService.check('TMDB-session-id')

    if (this.approved && !authTokenExists) {
      const token = this.requestToken
      const expirationTime = new Date()
      expirationTime.setMinutes(expirationTime.getMinutes() + 60)
      this.cookieService.set('TMDB-authToken', token, expirationTime)
      this.router.navigate(['/movies/list'])
    } else {
      this.router.navigate(['/movies/list'])
    }
  }
}
