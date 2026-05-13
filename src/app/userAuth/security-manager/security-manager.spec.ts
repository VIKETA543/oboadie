import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityManager } from './security-manager';

describe('SecurityManager', () => {
  let component: SecurityManager;
  let fixture: ComponentFixture<SecurityManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
