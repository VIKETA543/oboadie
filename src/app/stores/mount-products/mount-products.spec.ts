import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MountProducts } from './mount-products';

describe('MountProducts', () => {
  let component: MountProducts;
  let fixture: ComponentFixture<MountProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MountProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MountProducts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
