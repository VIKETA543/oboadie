import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifySales } from './verify-sales';

describe('VerifySales', () => {
  let component: VerifySales;
  let fixture: ComponentFixture<VerifySales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifySales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifySales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
