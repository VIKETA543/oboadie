import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockBalances } from './stock-balances';

describe('StockBalances', () => {
  let component: StockBalances;
  let fixture: ComponentFixture<StockBalances>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockBalances]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockBalances);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
