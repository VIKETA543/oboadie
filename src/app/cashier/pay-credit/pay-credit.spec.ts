import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayCredit } from './pay-credit';

describe('PayCredit', () => {
  let component: PayCredit;
  let fixture: ComponentFixture<PayCredit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayCredit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayCredit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
