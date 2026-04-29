import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreReceiveStock } from './store-receive-stock';

describe('StoreReceiveStock', () => {
  let component: StoreReceiveStock;
  let fixture: ComponentFixture<StoreReceiveStock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreReceiveStock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreReceiveStock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
