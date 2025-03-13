import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstituencyMeetingFormComponent } from './constituency-meeting-form.component';

describe('ConstituencyMeetingFormComponent', () => {
  let component: ConstituencyMeetingFormComponent;
  let fixture: ComponentFixture<ConstituencyMeetingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConstituencyMeetingFormComponent]
    });
    fixture = TestBed.createComponent(ConstituencyMeetingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
