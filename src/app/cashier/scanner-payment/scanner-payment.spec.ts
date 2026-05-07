import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerPayment } from './scanner-payment';

describe('ScannerPayment', () => {
  let component: ScannerPayment;
  let fixture: ComponentFixture<ScannerPayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScannerPayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScannerPayment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
