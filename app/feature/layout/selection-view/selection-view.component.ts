import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-selection-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './selection-view.component.html',
  styleUrls: ['./selection-view.component.scss'],
})
export class SelectionViewComponent {}
