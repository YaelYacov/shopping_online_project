import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdInCartCardComponent } from './prod-in-cart-card.component';

describe('ProdInCartCardComponent', () => {
  let component: ProdInCartCardComponent;
  let fixture: ComponentFixture<ProdInCartCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdInCartCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdInCartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
