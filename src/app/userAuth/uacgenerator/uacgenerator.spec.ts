import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UACGenerator } from './uacgenerator';

describe('UACGenerator', () => {
  let component: UACGenerator;
  let fixture: ComponentFixture<UACGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UACGenerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UACGenerator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
