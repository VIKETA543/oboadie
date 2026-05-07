import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDeposit } from './new-deposit';

describe('NewDeposit', () => {
  let component: NewDeposit;
  let fixture: ComponentFixture<NewDeposit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDeposit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDeposit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
