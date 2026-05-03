import { TestBed } from '@angular/core/testing';

import { PosServcie } from './pos-servcie';

describe('PosServcie', () => {
  let service: PosServcie;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosServcie);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
