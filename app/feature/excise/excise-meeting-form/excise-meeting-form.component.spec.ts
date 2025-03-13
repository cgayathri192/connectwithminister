import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExciseMeetingFormComponent } from './excise-meeting-form.component';

describe('ExciseMeetingFormComponent', () => {
  let component: ExciseMeetingFormComponent;
  let fixture: ComponentFixture<ExciseMeetingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExciseMeetingFormComponent]
    });
    fixture = TestBed.createComponent(ExciseMeetingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
