import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInPlaceComponent } from './order-in-place.component';

describe('OrderInPlaceComponent', () => {
  let component: OrderInPlaceComponent;
  let fixture: ComponentFixture<OrderInPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderInPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
