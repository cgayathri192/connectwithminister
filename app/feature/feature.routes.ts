import { Route } from '@angular/router';

export default [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./feature.component').then((c) => c.FeatureComponent),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./layout/selection-view/selection-view.component').then(
            (c) => c.SelectionViewComponent
          ),
      },
    ],
  },
] as Route[];
