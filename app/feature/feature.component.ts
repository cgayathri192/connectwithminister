import { Component } from '@angular/core';
import { HeaderUiComponent } from './layout/header-ui/header-ui.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [RouterOutlet, HeaderUiComponent],
  template: `
    <app-header-ui></app-header-ui>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class FeatureComponent {}
