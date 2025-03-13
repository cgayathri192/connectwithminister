import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavUiComponent } from './nav-ui.component';

describe('NavUiComponent', () => {
  let component: NavUiComponent;
  let fixture: ComponentFixture<NavUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavUiComponent]
    });
    fixture = TestBed.createComponent(NavUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
