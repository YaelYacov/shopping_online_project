import { TestBed } from '@angular/core/testing';

import { PlusMinusIconsService } from './plus-minus-icons.service';

describe('PlusMinusIconsService', () => {
  let service: PlusMinusIconsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlusMinusIconsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
