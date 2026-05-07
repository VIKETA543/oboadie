import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashManager } from './cash-manager';

describe('CashManager', () => {
  let component: CashManager;
  let fixture: ComponentFixture<CashManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
