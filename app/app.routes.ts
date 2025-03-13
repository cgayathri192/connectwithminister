import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./ui/ui.routes'),
  // },
  {
    path: 'auth',
    loadChildren: () => import('./feature/auth.routes'),
  },
  {
    path: '',
    loadChildren: () => import('./feature/feature.routes'),
  },
  {
    path: 'app',
    loadChildren: () => import('./feature/content-feature.routes'),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
