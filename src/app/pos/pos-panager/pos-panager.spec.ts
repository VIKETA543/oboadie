import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosPanager } from './pos-panager';

describe('PosPanager', () => {
  let component: PosPanager;
  let fixture: ComponentFixture<PosPanager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosPanager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosPanager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
