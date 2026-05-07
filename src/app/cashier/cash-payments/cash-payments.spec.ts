import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashPayments } from './cash-payments';

describe('CashPayments', () => {
  let component: CashPayments;
  let fixture: ComponentFixture<CashPayments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashPayments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashPayments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
