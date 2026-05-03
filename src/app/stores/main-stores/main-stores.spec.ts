import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainStores } from './main-stores';

describe('MainStores', () => {
  let component: MainStores;
  let fixture: ComponentFixture<MainStores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainStores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainStores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
