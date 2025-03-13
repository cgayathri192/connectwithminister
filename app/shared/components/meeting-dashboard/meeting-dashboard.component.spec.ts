import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingDashboardComponent } from './meeting-dashboard.component';

describe('MeetingDashboardComponent', () => {
  let component: MeetingDashboardComponent;
  let fixture: ComponentFixture<MeetingDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MeetingDashboardComponent]
    });
    fixture = TestBed.createComponent(MeetingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
