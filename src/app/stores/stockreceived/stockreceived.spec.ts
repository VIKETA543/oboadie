import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stockreceived } from './stockreceived';

describe('Stockreceived', () => {
  let component: Stockreceived;
  let fixture: ComponentFixture<Stockreceived>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stockreceived]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stockreceived);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
