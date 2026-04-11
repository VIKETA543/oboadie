import { TestBed } from '@angular/core/testing';

import { Wearehouse } from './wearehouse';

describe('Wearehouse', () => {
  let service: Wearehouse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Wearehouse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
