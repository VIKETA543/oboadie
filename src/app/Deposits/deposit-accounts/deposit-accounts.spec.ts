import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositAccounts } from './deposit-accounts';

describe('DepositAccounts', () => {
  let component: DepositAccounts;
  let fixture: ComponentFixture<DepositAccounts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositAccounts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositAccounts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
