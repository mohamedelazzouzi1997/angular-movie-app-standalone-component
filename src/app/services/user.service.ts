import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiKey = environment.apiKey;
  private baseUrl = environment.baseUrl;
  private userInfo: any
  session_id: any
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.session_id = this.cookieService.get('TMDB-session-id')
  }


  setUserInfo(user: any) {
    this.userInfo = user
  }

  getUserInfo() {
    return this.userInfo
  }

  getUserProfile(session_id: any): Observable<any> {
    const url = `${this.baseUrl}/account`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey).set('session_id', session_id),
    };
    return this.http.get(url, options);
  }

  getUserWatchList(account_id: number, page: any): Observable<any> {
    const url = `${this.baseUrl}/account/${account_id}/watchlist/movies`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey).set('session_id', this.session_id).set('page', page),
    };
    return this.http.get(url, options);
  }

  getUserfavoriteList(account_id: number, page: any): Observable<any> {
    const url = `${this.baseUrl}/account/${account_id}/favorite/movies`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey).set('session_id', this.session_id).set('page', page),
    };
    return this.http.get(url, options);
  }
}
