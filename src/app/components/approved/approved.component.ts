import { AuthService } from './../../services/auth.service';
import { CookieService } from 'ngx-cookie-service'
import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';

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

  constructor(
    private _route: ActivatedRoute,
    private cookieService: CookieService,
    private AuthService: AuthService,
    private _toastr: ToastrService) {

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
    if (this.approved) {
      const token = this.requestToken
      const expirationTime = new Date()
      expirationTime.setMinutes(expirationTime.getMinutes() + 60)
      this.cookieService.set('TMDB-authToken', token, expirationTime)
      this.AuthService.createSession(token).subscribe({
        next: res => {
          if (res.success) {
            this.cookieService.set('TMDB-session-id', res.session_id)
            this._toastr.success('session created successfully')
            window.location.href = `${environment.domain}movies/list`;
          }
        },
        error: err => console.error
      })
    } else {
      window.location.href = `${environment.domain}movies/list`;
    }
  }
}
