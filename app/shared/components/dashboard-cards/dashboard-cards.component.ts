import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollComponent } from '../scroll/scroll.component';

@Component({
  selector: 'app-dashboard-cards',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollComponent],
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.scss'],
})
export class DashboardCardsComponent {}
