import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesMeetingFormComponent } from './mines-meeting-form.component';

describe('MinesMeetingFormComponent', () => {
  let component: MinesMeetingFormComponent;
  let fixture: ComponentFixture<MinesMeetingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MinesMeetingFormComponent]
    });
    fixture = TestBed.createComponent(MinesMeetingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
