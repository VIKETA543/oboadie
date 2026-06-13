import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreManualVerification } from './store-manual-verification';

describe('StoreManualVerification', () => {
  let component: StoreManualVerification;
  let fixture: ComponentFixture<StoreManualVerification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreManualVerification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreManualVerification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
