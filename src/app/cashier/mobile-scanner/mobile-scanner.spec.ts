import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileScanner } from './mobile-scanner';

describe('MobileScanner', () => {
  let component: MobileScanner;
  let fixture: ComponentFixture<MobileScanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileScanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileScanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
