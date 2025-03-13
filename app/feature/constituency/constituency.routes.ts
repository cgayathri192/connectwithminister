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
      import(
        './constituency-meeting-form/constituency-meeting-form.component'
      ).then((c) => c.ConstituencyMeetingFormComponent),
  },
] as Route[];
