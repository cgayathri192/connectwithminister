import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-ui',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-ui.component.html',
  styleUrls: ['./header-ui.component.scss'],
})
export class HeaderUiComponent {}
