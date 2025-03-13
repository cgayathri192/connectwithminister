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
      import('./content-feature.component').then(
        (c) => c.ContentFeatureComponent
      ),
    children: [
      {
        path: 'mines',
        loadChildren: () => import('./mines/mines.routes'),
      },
      {
        path: 'constituency',
        loadChildren: () => import('./constituency/constituency.routes'),
      },
      {
        path: 'excise',
        loadChildren: () => import('./excise/excise.routes'),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../shared').then((c) => c.MeetingDashboardComponent),
      },
      {
        path: 'excise-reg-dashboard',
        loadComponent: () =>
          import(
            '../shared/components/excise-reg-dash/excise-reg-dash.component'
          ).then((c) => c.ExciseRegDashComponent),
      },
      {
        path: 'mines-reg-dashboard',
        loadComponent: () =>
          import(
            '../shared/components/mines-reg-dash/mines-reg-dash.component'
          ).then((c) => c.MinesRegDashComponent),
      },
      {
        path: 'const-reg-dashboard',
        loadComponent: () =>
          import(
            '../shared/components/const-reg-dash/const-reg-dash.component'
          ).then((c) => c.ConstRegDashComponent),
      },
      {
        path: 'dashboard-services',
        loadComponent: () =>
          import(
            '../shared/components/dashboard-cards/dashboard-cards.component'
          ).then((c) => c.DashboardCardsComponent),
      },
    ],
  },
] as Route[];
