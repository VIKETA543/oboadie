import { TestBed } from '@angular/core/testing';

import { AppNav } from './app-nav';

describe('AppNav', () => {
  let service: AppNav;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppNav);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
