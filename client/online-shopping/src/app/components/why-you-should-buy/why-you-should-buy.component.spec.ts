import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyYouShouldBuyComponent } from './why-you-should-buy.component';

describe('WhyYouShouldBuyComponent', () => {
  let component: WhyYouShouldBuyComponent;
  let fixture: ComponentFixture<WhyYouShouldBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyYouShouldBuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyYouShouldBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
