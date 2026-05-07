import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositManager } from './deposit-manager';

describe('DepositManager', () => {
  let component: DepositManager;
  let fixture: ComponentFixture<DepositManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
