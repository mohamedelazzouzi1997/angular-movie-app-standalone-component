import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiKey = 'b77fafd8a5792126db36ead00b5ce42f';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getMovieLists(page: number): Observable<any> {
    const url = `${this.baseUrl}/movie/now_playing`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey).set('page', page),
    };
    return this.http.get(url, options);
  }
  getMovieUpComing(page: number): Observable<any> {
    const url = `${this.baseUrl}/movie/upcoming`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey).set('page', page),
    };
    return this.http.get(url, options);
  }
  getTopRated(page: number): Observable<any> {
    const url = `${this.baseUrl}/movie/top_rated`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey).set('page', page),
    };
    return this.http.get(url, options);
  }
  getPopular(page: number): Observable<any> {
    const url = `${this.baseUrl}/movie/popular`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey).set('page', page),
    };
    return this.http.get(url, options);
  }

  getMovieDetails(id: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${id}`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey),
    };
    return this.http.get(url, options);
  }

  getTrailer(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}/videos`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey),
    };
    return this.http.get(url, options);
  }
}
