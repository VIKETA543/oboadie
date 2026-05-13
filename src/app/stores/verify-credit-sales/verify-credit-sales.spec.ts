import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCreditSales } from './verify-credit-sales';

describe('VerifyCreditSales', () => {
  let component: VerifyCreditSales;
  let fixture: ComponentFixture<VerifyCreditSales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyCreditSales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyCreditSales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
