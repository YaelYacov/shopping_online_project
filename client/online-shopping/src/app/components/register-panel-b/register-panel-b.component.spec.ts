import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPanelBComponent } from './register-panel-b.component';

describe('RegisterPanelBComponent', () => {
  let component: RegisterPanelBComponent;
  let fixture: ComponentFixture<RegisterPanelBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPanelBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPanelBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
