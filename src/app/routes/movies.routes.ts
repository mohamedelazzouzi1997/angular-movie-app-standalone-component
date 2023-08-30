import { Routes } from '@angular/router';

export const MOVIES_ROUTES: Routes = [
  {
    path: 'list',
    loadComponent: () =>
      import('../movies/movies-list/movies-list.component').then(
        (c) => c.MoviesListComponent
      ),
  },
  {
    path: 'top-rated',
    loadComponent: () =>
      import('../movies/top-rated/top-rated.component').then(
        (c) => c.TopRatedComponent
      ),
  },
  {
    path: 'up-coming',
    loadComponent: () =>
      import('../movies/up-coming/up-coming.component').then(
        (c) => c.UpComingComponent
      ),
  },
  {
    path: 'popular',
    loadComponent: () =>
      import('../movies/popular/popular.component').then(
        (c) => c.PopularComponent
      ),
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('../movies/detail/detail.component').then(
        (c) => c.DetailComponent
      ),
  },
  {
    path: 'genre/:genre/:id',
    loadComponent: () =>
      import('../movies/genre/genre.component').then(
        (c) => c.GenreComponent
      ),
  },
  {
    path: 'cast/:castName/:castId',
    loadComponent: () =>
      import('../movies/by-cast/by-cast.component').then(
        (c) => c.ByCastComponent
      ),
  },
];
