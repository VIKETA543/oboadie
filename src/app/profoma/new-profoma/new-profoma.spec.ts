import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProfoma } from './new-profoma';

describe('NewProfoma', () => {
  let component: NewProfoma;
  let fixture: ComponentFixture<NewProfoma>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProfoma]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProfoma);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
