import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreStockBalances } from './store-stock-balances';

describe('StoreStockBalances', () => {
  let component: StoreStockBalances;
  let fixture: ComponentFixture<StoreStockBalances>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreStockBalances]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreStockBalances);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
