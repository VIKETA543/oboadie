import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCashSales } from './verify-cash-sales';

describe('VerifyCashSales', () => {
  let component: VerifyCashSales;
  let fixture: ComponentFixture<VerifyCashSales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyCashSales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyCashSales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
