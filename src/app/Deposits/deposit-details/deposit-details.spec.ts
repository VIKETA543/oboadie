import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositDetails } from './deposit-details';

describe('DepositDetails', () => {
  let component: DepositDetails;
  let fixture: ComponentFixture<DepositDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
