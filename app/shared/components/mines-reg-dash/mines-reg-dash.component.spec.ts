import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesRegDashComponent } from './mines-reg-dash.component';

describe('MinesRegDashComponent', () => {
  let component: MinesRegDashComponent;
  let fixture: ComponentFixture<MinesRegDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MinesRegDashComponent]
    });
    fixture = TestBed.createComponent(MinesRegDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
