
import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
      {
        path:'movies',
        loadChildren:() => import('./routes/movies.routes').then(r => r.MOVIES_ROUTES)
      },
      {path:'**',redirectTo:'movies/list',pathMatch:'full'},
];


