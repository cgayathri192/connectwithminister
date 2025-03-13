import { Route } from '@angular/router';

export default [
  {
    path: '',
    redirectTo: 'form',
    pathMatch: 'full',
  },
  {
    path: 'form',
    loadComponent: () =>
      import('./registration-form/registration-form.component').then(
        (c) => c.RegistrationFormComponent
      ),
  },
  {
    path: 'meeting-form',
    loadComponent: () =>
      import('./mines-meeting-form/mines-meeting-form.component').then(
        (c) => c.MinesMeetingFormComponent
      ),
  },
] as Route[];
