import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private AuthService: AuthService, private _toastr: ToastrService, private router: Router) { }
  canActivate(): boolean {
    if (this.AuthService.isAuthenticated())
      return true

    this._toastr.warning('You need to login')
    this.router.navigateByUrl('/movies/list')
    return false
  }
}
