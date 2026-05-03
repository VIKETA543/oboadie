import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmManager } from './crm-manager';

describe('CrmManager', () => {
  let component: CrmManager;
  let fixture: ComponentFixture<CrmManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
