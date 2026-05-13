import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentHook } from './department-hook';

describe('DepartmentHook', () => {
  let component: DepartmentHook;
  let fixture: ComponentFixture<DepartmentHook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentHook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentHook);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
