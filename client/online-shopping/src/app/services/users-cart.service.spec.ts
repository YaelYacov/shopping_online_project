import { TestBed } from '@angular/core/testing';

import { UsersCartService } from './users-cart.service';

describe('UsersCartService', () => {
  let service: UsersCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
