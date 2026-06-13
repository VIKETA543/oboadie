import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierHome } from './cashier-home';

describe('CashierHome', () => {
  let component: CashierHome;
  let fixture: ComponentFixture<CashierHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashierHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashierHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
