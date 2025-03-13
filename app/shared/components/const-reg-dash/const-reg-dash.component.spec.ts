import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstRegDashComponent } from './const-reg-dash.component';

describe('ConstRegDashComponent', () => {
  let component: ConstRegDashComponent;
  let fixture: ComponentFixture<ConstRegDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConstRegDashComponent]
    });
    fixture = TestBed.createComponent(ConstRegDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
