import { TestBed } from '@angular/core/testing';

import { ProdInCartService } from './prod-in-cart.service';

describe('ProdInCartService', () => {
  let service: ProdInCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdInCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
