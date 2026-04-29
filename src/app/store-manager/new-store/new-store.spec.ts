import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStore } from './new-store';

describe('NewStore', () => {
  let component: NewStore;
  let fixture: ComponentFixture<NewStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewStore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewStore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
