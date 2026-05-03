import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfomaInvoice } from './profoma-invoice';

describe('ProfomaInvoice', () => {
  let component: ProfomaInvoice;
  let fixture: ComponentFixture<ProfomaInvoice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfomaInvoice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfomaInvoice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
