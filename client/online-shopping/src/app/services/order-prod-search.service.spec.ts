import { TestBed } from '@angular/core/testing';

import { OrderProdSearchService } from './order-prod-search.service';

describe('OrderProdSearchService', () => {
  let service: OrderProdSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderProdSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
