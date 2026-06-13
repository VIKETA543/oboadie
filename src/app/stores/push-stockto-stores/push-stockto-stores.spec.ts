import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushStocktoStores } from './push-stockto-stores';

describe('PushStocktoStores', () => {
  let component: PushStocktoStores;
  let fixture: ComponentFixture<PushStocktoStores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PushStocktoStores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PushStocktoStores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
