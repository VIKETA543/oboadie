import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreType } from './store-type';

describe('StoreType', () => {
  let component: StoreType;
  let fixture: ComponentFixture<StoreType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreType);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
