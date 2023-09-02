
import { Routes } from '@angular/router';
import { ApprovedComponent } from './components/approved/approved.component';

export const AppRoutes: Routes = [
  {
    path: 'movies',
    loadChildren: () => import('./routes/movies.routes').then(r => r.MOVIES_ROUTES)
  },
  {
    path: 'approved', component: ApprovedComponent
  },
  { path: '**', redirectTo: 'movies/list', pathMatch: 'full' },
];


