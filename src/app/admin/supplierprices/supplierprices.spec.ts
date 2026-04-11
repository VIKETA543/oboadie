import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Supplierprices } from './supplierprices';

describe('Supplierprices', () => {
  let component: Supplierprices;
  let fixture: ComponentFixture<Supplierprices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Supplierprices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Supplierprices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
