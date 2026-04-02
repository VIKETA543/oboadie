import { TestBed } from '@angular/core/testing';
import { Products } from '../admin/products/products';




describe('Products', () => {
  let service: Products;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Products);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
