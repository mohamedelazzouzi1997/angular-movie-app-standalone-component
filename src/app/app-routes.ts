
import { Routes } from '@angular/router';
import { ApprovedComponent } from './components/approved/approved.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const AppRoutes: Routes = [
  {
    path: 'movies',
    loadChildren: () => import('./routes/movies.routes').then(r => r.MOVIES_ROUTES)
  },
  {
    path: 'approved', component: ApprovedComponent
  },
  {
    path: 'not-found', component: NotFoundComponent
  },
  { path: '**', redirectTo: 'movies/list', pathMatch: 'full' },
];


