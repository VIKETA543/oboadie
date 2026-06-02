import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousePull } from './warehouse-pull';

describe('StoreReceiveStock', () => {
  let component: WarehousePull;
  let fixture: ComponentFixture<WarehousePull>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehousePull]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehousePull);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
