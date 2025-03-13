import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUiComponent } from './header-ui.component';

describe('HeaderUiComponent', () => {
  let component: HeaderUiComponent;
  let fixture: ComponentFixture<HeaderUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderUiComponent]
    });
    fixture = TestBed.createComponent(HeaderUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
