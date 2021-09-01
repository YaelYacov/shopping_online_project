import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLogInComponent } from './main-log-in.component';

describe('MainLogInComponent', () => {
  let component: MainLogInComponent;
  let fixture: ComponentFixture<MainLogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainLogInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
