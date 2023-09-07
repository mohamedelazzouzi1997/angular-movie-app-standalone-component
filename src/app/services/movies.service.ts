import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiKey = environment.apiKey;
  private baseUrl = environment.baseUrl;

  session_id: any
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.session_id = this.cookieService.get('TMDB-session-id')
  }


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
  getPopular(page: number = 1): Observable<any> {
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

  getCredits(id: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${id}/credits`;
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

  getMoviesGenraList(id: number, page: number): Observable<any> {
    const url = `${this.baseUrl}/discover/movie`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey).set('with_genres', id).set('page', page),
    };
    return this.http.get(url, options);
  }
  getMoviesByCastId(id: number): Observable<any> {
    const url = `${this.baseUrl}/person/${id}/movie_credits`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey),
    };
    return this.http.get(url, options);
  }

  getCastDetailsById(id: number): Observable<any> {
    const url = `${this.baseUrl}/person/${id}`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey),
    };
    return this.http.get(url, options);
  }

  getMovieProviders(id: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${id}/watch/providers`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey),
    };
    return this.http.get(url, options);
  }

  getMovieImages(id: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${id}/images`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey),
    };
    return this.http.get(url, options);
  }

  getMovieVideos(id: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${id}/videos`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey),
    };
    return this.http.get(url, options);
  }


  getSimilareMovies(id: number, page: any = 1): Observable<any> {
    const url = `${this.baseUrl}/movie/${id}/similar`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey).set('page', page),
    };
    return this.http.get(url, options);
  }

  addToWatchList(movie_id: number, account_id: number): Observable<any> {
    const url = `${this.baseUrl}/account/${account_id}/watchlist`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey).set('session_id', this.session_id),
    };
    return this.http.post(url, {
      "media_type": "movie",
      "media_id": movie_id,
      "watchlist": true
    }, options);
  }

  removeFromWatchList(movie_id: number, account_id: number): Observable<any> {
    const url = `${this.baseUrl}/account/${account_id}/watchlist`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey).set('session_id', this.session_id),
    };
    return this.http.post(url, {
      "media_type": "movie",
      "media_id": movie_id,
      "watchlist": false
    }, options);
  }

  movieAccountStatus(movie_id: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movie_id}/account_states`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey).set('session_id', this.session_id),
    };
    return this.http.get(url, options);
  }

  addToFavouritList(movie_id: number, account_id: number): Observable<any> {
    const url = `${this.baseUrl}/account/${account_id}/favorite`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey).set('session_id', this.session_id),
    };
    return this.http.post(url, {
      "media_type": "movie",
      "media_id": movie_id,
      "favorite": true
    }, options);
  }


  removeFromFavouritList(movie_id: number, account_id: number): Observable<any> {
    const url = `${this.baseUrl}/account/${account_id}/favorite`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey).set('session_id', this.session_id),
    };
    return this.http.post(url, {
      "media_type": "movie",
      "media_id": movie_id,
      "favorite": false
    }, options);
  }


  search(query: string, page: number): Observable<any> {
    const url = `${this.baseUrl}/search/movie`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey).set('query', query).set('page', page),
    };
    return this.http.get(url, options);
  }


  rateMovie(movie_id: number, rate: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movie_id}/rating`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey).set('session_id', this.session_id),
    };
    return this.http.post(url, {
      "value": rate
    }, options);
  }

  removeRateMovie(movie_id: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movie_id}/rating`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey).set('session_id', this.session_id),
    };
    return this.http.delete(url, options);
  }

}
