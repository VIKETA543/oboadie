import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceEntry } from './price-entry';

describe('PriceEntry', () => {
  let component: PriceEntry;
  let fixture: ComponentFixture<PriceEntry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceEntry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceEntry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
