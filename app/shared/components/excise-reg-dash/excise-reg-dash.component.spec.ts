import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExciseRegDashComponent } from './excise-reg-dash.component';

describe('ExciseRegDashComponent', () => {
  let component: ExciseRegDashComponent;
  let fixture: ComponentFixture<ExciseRegDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExciseRegDashComponent]
    });
    fixture = TestBed.createComponent(ExciseRegDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
