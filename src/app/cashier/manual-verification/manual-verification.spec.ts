import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualVerification } from './manual-verification';

describe('ManualVerification', () => {
  let component: ManualVerification;
  let fixture: ComponentFixture<ManualVerification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualVerification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualVerification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
