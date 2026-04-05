import { TestBed } from '@angular/core/testing';

import { Productpriceservice } from './productpriceservice';

describe('Productpriceservice', () => {
  let service: Productpriceservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Productpriceservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
